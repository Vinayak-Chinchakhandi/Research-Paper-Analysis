import os
from dotenv import load_dotenv
import google.generativeai as genai
from app.services.embedding_service import get_embeddings
from app.services.vector_store import search

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-flash-lite-latest")


def filter_top_sources(reranked_chunks, top_n_sources=2):
    source_scores = {}

    for item in reranked_chunks:
        src = item["source"]
        source_scores[src] = source_scores.get(src, 0) + item["score"]

    # sort sources by total score
    sorted_sources = sorted(source_scores.items(), key=lambda x: x[1], reverse=True)

    top_sources = [s[0] for s in sorted_sources[:top_n_sources]]

    return top_sources


# ✅ Select best chunks (balanced + deduplicated)
def select_best_chunks(results, max_chunks=8, force_multi=False):
    

    source_chunks = {}
    source_scores = {}

    # Step 1: group + score
    for item in results:
        src = item["source"]
        
        similarity = -item["score"]

        if src not in source_chunks:
            source_chunks[src] = []
            source_scores[src] = 0

        source_chunks[src].append({
            "text": item["text"],
            "source": src,
            "document_id": item["document_id"],
            "score": similarity
        })

        source_scores[src] += similarity  # 🔥 TOTAL relevance

    # Step 2: sort sources by total score
    sorted_sources = sorted(source_scores.items(), key=lambda x: x[1], reverse=True)

    # 🔥 SMART DECISION
    # If top source dominates → use only that
    # Else → use top 2 (for comparison queries)

    top_sources = []

    if len(sorted_sources) == 1:
        top_sources = [sorted_sources[0][0]]

    else:
        # dominance check
        top_score = sorted_sources[0][1]
        second_score = sorted_sources[1][1]

        if force_multi:
            top_sources = [s[0] for s in sorted_sources[:2]]
        else:
            top_score = sorted_sources[0][1]
            second_score = sorted_sources[1][1]

            if top_score > 1.3 * second_score:
                top_sources = [sorted_sources[0][0]]
            else:
                top_sources = [s[0] for s in sorted_sources[:2]]

    # Step 3: collect chunks from selected sources
    selected = []

    for src in top_sources:
        chunks = sorted(source_chunks[src], key=lambda x: x["score"], reverse=True)

        selected.extend(chunks[:4])  # max per source

    # Step 4: trim total
    return selected[:max_chunks]


# ✅ Build context safely
def build_context(selected_chunks):
    context = ""
    MAX_CONTEXT_LENGTH = 5000

    for item in selected_chunks:
        entry = f"\n\n===== SOURCE: {item['source']} =====\n{item['text']}\n"

        if len(context) + len(entry) > MAX_CONTEXT_LENGTH:
            break

        context += entry

    return context


# ✅ Main RAG pipeline
def generate_answer(user_id, project_id, query):

    # 🔥 Step 1: Enhance query (generic, scalable)
    enhanced_query = f"""
    {query}
    Consider scientific explanation, causes, effects, comparisons, and impacts.
    """

    query_embedding = get_embeddings([enhanced_query])[0]

    # 🔥 Step 2: Retrieve chunks (FLAT results expected)
    results = search(user_id, project_id, query_embedding, top_k=40)

    # ❌ No documents
    if not results:
        return {
            "answer": "No documents available. Please upload papers first.",
            "sources": []
        }
    query_lower = query.lower()

    is_comparison = any(word in query_lower for word in [
        "compare", "difference", "both", "vs", "versus"
    ])

    # 🔥 Step 3: Select best chunks
    selected_chunks = select_best_chunks(results, force_multi=is_comparison)

    # ❌ No useful chunks
    if not selected_chunks:
        return {
            "answer": "The provided papers do not contain sufficient information to answer this.",
            "sources": []
        }

    # 🔥 Step 4: Build context
    context = build_context(selected_chunks)

    # 🔥 Step 5: Prompt (STRONG version)
    prompt = f"""
You are an expert AI Research Assistant.

Use ONLY the provided research context.

---------------------
CONTEXT:
{context}
---------------------

QUESTION:
{query}

---------------------
INSTRUCTIONS:

- If multiple sources are available, ALWAYS attempt a comparison.
- Even if information is partial, extract and compare what is available.
- Do NOT say "insufficient information" unless NO relevant data exists at all.
- Focus on identifying differences, similarities, and patterns.
- Be analytical, not overly cautious.

---------------------
OUTPUT FORMAT:

- Summary:
- Key Points:
- Insights:
- Conclusion:

---------------------

ANSWER:
"""

    # 🔥 Step 6: Generate response safely
    try:
        response = model.generate_content(prompt)
        answer = response.text if response.text else "No response generated."
    except Exception as e:
        answer = f"Error generating response: {str(e)}"

    unique_sources = []

    seen = set()

    for chunk in selected_chunks:

        doc_id = chunk["document_id"]

        if doc_id not in seen:

            seen.add(doc_id)

            unique_sources.append({

            "document_id":
                chunk["document_id"],

            "source":
                chunk["source"]

        })

    # 🔥 Step 7: Return clean output
    return {
        "answer": answer,
        "sources": unique_sources
    }