# ResearchGPT 🚀

## AI-Powered Multi-Document Research Analysis & Literature Review Platform

ResearchGPT is a full-stack AI-powered research intelligence platform designed to help researchers, students, and professionals analyze, compare, and interact with large collections of research papers through Retrieval-Augmented Generation (RAG).

Unlike traditional PDF chatbots that rely solely on conversation history, ResearchGPT combines semantic retrieval, project-isolated vector databases, persistent research workspaces, source attribution, and multi-session research chats to deliver accurate, grounded, and scalable research assistance.

The platform enables users to upload research papers, organize them into projects, perform semantic search, compare studies, generate literature reviews, identify research gaps, and conduct long-term research conversations with persistent context.

---

# 🎯 Project Objective

ResearchGPT was built to address one of the biggest challenges in academic and technical research:

> Understanding, comparing, and extracting insights from large collections of research papers efficiently.

The platform combines modern AI technologies with scalable system architecture to provide:

* Semantic document retrieval
* Multi-document contextual understanding
* AI-powered literature review generation
* Comparative research analysis
* Persistent research workspaces
* Grounded conversational AI
* Source-aware responses

Instead of manually reading hundreds of pages, users can interact with their research corpus through an intelligent AI assistant.

---

# ✨ Core Features

## 📁 Multi-Project Research Workspace

ResearchGPT organizes research into isolated project workspaces.

Each project maintains:

* Uploaded PDFs
* Project-specific vector databases
* Research chat sessions
* Message history
* Citation history

This enables users to manage multiple research domains independently without cross-project contamination.

---

## 📄 Multi-PDF Upload & Processing

The platform supports uploading multiple research papers into a unified workspace.

Features:

* Multi-file PDF upload
* Automatic text extraction
* Intelligent chunking
* Metadata management
* Semantic indexing
* Project-level document isolation

Uploaded papers are automatically processed and converted into searchable vector representations.

---

## 💬 Persistent Research Chats

ResearchGPT supports multiple chat sessions inside a single research workspace.

Features:

* Create multiple research conversations
* Persistent chat history
* Session-based organization
* Reload previous conversations
* Long-term research workflows

Unlike conventional LLM chats, conversations remain useful because answers are generated from retrieved research evidence rather than relying solely on conversation memory.

---

## 🧠 AI-Powered Research Assistant

Users can ask natural language questions about uploaded papers.

Example Queries:

```text
Compare the methodologies used in these papers
```

```text
What are the key findings related to climate change?
```

```text
Identify research gaps across all uploaded studies
```

```text
Summarize the limitations discussed in these papers
```

The system retrieves relevant research evidence before generating responses.

---

## 🔍 Semantic Search & Retrieval

ResearchGPT uses vector embeddings and semantic similarity search instead of traditional keyword matching.

Capabilities:

* Meaning-based search
* Context-aware retrieval
* Cross-document understanding
* Semantic chunk matching
* Research-focused question answering

This allows users to discover relevant information even when exact keywords are absent.

---

## 📊 Multi-Document Comparative Analysis

The platform is designed to compare multiple research papers simultaneously.

ResearchGPT can:

* Compare methodologies
* Analyze similarities and differences
* Detect trends across studies
* Generate comparative insights
* Evaluate findings across papers

This transforms the system from a simple chatbot into a research analysis engine.

---

## 🧾 Literature Review Generation

ResearchGPT assists researchers in literature review workflows by:

* Summarizing multiple papers
* Extracting key findings
* Organizing research themes
* Highlighting major contributions
* Generating structured reviews

All outputs are grounded in retrieved research evidence.

---

## 🔬 Research Gap Identification

The platform can identify:

* Unexplored topics
* Missing research directions
* Potential future work
* Weaknesses in existing studies
* Areas requiring further investigation

This helps researchers discover new opportunities efficiently.

---

## 📚 Source Attribution & Citation Tracking

Every AI response includes document-level source attribution.

Features:

* Source-aware responses
* Citation persistence
* Document tracking
* Multi-document evidence support

Users can always determine which paper contributed to a generated answer.

---

# 🏗️ System Architecture

ResearchGPT follows a distributed full-stack architecture.

```text
React Frontend
       │
       ▼
Node.js + Express API Gateway
       │
       ▼
PostgreSQL Database
       │
       ▼
FastAPI AI Service
       │
       ▼
PDF Processing
       │
       ▼
Chunking Pipeline
       │
       ▼
Embedding Generation
       │
       ▼
FAISS Vector Database
       │
       ▼
Semantic Retrieval
       │
       ▼
Gemini LLM
       │
       ▼
Grounded AI Response
```

---

# 🏛️ Project Isolation Architecture

A key design goal of ResearchGPT is complete project-level isolation.

Each project maintains its own:

* Uploaded documents
* FAISS index
* Metadata store
* Chat sessions
* Message history

Directory Structure:

```text
data/
└── users/
    └── {user_id}
        └── projects/
            └── {project_id}
                ├── uploads/
                │   └── PDF files
                │
                └── faiss/
                    ├── index.faiss
                    ├── metadata.json
                    └── documents.json
```

This ensures retrieval remains isolated and accurate for every project.

---

# 🧬 Retrieval-Augmented Generation (RAG) Pipeline

ResearchGPT uses a custom RAG pipeline.

```text
PDF Upload
    ↓
Text Extraction
    ↓
Chunk Generation
    ↓
Embedding Creation
    ↓
FAISS Indexing
    ↓
Semantic Retrieval
    ↓
Source Aggregation
    ↓
Context Construction
    ↓
Gemini Grounded Generation
    ↓
Source Attribution
```

The platform retrieves relevant evidence before generating responses, reducing hallucinations and improving answer reliability.

---

# 🔎 Current Retrieval Strategy

The retrieval system follows these stages:

### 1. Query Enhancement

User queries are enriched to improve retrieval quality.

### 2. Embedding Generation

Queries are converted into dense vector representations using Sentence Transformers.

### 3. Semantic Retrieval

Relevant chunks are retrieved from project-specific FAISS indexes.

### 4. Source-Based Aggregation

Retrieved chunks are grouped by source document.

### 5. Multi-Document Selection

Relevant chunks from one or more papers are selected based on semantic relevance.

### 6. Context Construction

An optimized context window is built from selected chunks.

### 7. Grounded Response Generation

Gemini generates responses using retrieved evidence only.

### 8. Citation Generation

Source metadata is attached to responses for transparency and traceability.

---

# 🗄️ Database Design

ResearchGPT uses PostgreSQL for metadata persistence.

Core Tables:

### Users

```text
users
```

Stores user accounts and authentication information.

### Projects

```text
projects
```

Stores research workspaces.

### Documents

```text
documents
```

Stores uploaded document metadata.

### Chat Sessions

```text
chat_sessions
```

Stores research conversations within a project.

### Chat Messages

```text
chat_messages
```

Stores user messages, AI responses, and source citations.

---

# ⚙️ Technology Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Markdown
* Context API

---

## Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* Multer

---

## AI Service

* FastAPI
* Python
* Uvicorn

---

## AI & RAG

* Sentence Transformers
* FAISS Vector Database
* Google Gemini
* Semantic Retrieval Pipeline

---

## Document Processing

* pdfplumber
* PyPDF2

---

# 🚀 Key Engineering Highlights

## Multi-Tenant Architecture

User and project-level isolation ensures secure and scalable document retrieval.

---

## Persistent Research Workspaces

Projects, chats, messages, and citations remain available across sessions.

---

## Project-Specific Vector Databases

Each project maintains its own FAISS index to eliminate retrieval contamination.

---

## Grounded AI Responses

Responses are generated using retrieved evidence rather than relying solely on LLM memory.

---

## Source Attribution

Every response can be traced back to contributing research papers.

---

## Modular AI Architecture

Frontend, API gateway, AI services, retrieval systems, and storage layers are fully decoupled.

---

# 🎯 Use Cases

ResearchGPT can be used for:

* Academic Research
* Literature Review Generation
* Research Gap Analysis
* Comparative Study Analysis
* Technical Paper Understanding
* Knowledge Discovery
* Scientific Research Assistance
* Educational Research Platforms

---

# 🔮 Future Enhancements

Planned improvements include:

* Cross-Encoder Re-ranking
* Hybrid Search (FAISS + BM25)
* Query Classification
* Citation Preview Panels
* Document Deletion & Reindexing
* Chat Auto-Naming
* Research Export Tools
* Cloud Deployment
* Team Collaboration Workspaces

---

# 🌟 Final Vision

ResearchGPT aims to become an intelligent research intelligence platform that enables users to:

* Organize research efficiently
* Understand papers faster
* Compare studies intelligently
* Generate grounded insights
* Identify research opportunities
* Conduct long-term AI-assisted research

By combining semantic retrieval, project-isolated vector databases, persistent o an AI-powered research experience.workspaces, and grounded LLM reasoning, ResearchGPT transforms traditional research workflows int
