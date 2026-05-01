from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
from PyPDF2 import PdfReader
import google.generativeai as genai

# Replace with your Gemini API key
genai.configure(api_key="GOOGLE_API_KEY")

app = Flask(__name__)
CORS(app, origins="*")  # Allow all origins for simplicity

def extract_text_from_pdf(pdf_data_url):
    try:
        header, encoded = pdf_data_url.split(",", 1)
        decoded = base64.b64decode(encoded)
        pdf_file = io.BytesIO(decoded)
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        return f"Error extracting text: {e}"

@app.route('/analyze', methods=['POST'])
def analyze_paper():
    data = request.get_json()
    prompt = data.get('prompt')

    pdf_data_url = prompt.split("Paper data: ")[1]
    pdf_text = extract_text_from_pdf(pdf_data_url)

    # Use Gemini API to analyze the text
    model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
    gemini_prompt = f"Analyze this research paper text: {pdf_text}. Give a structured summary."
    try:
        response = model.generate_content(gemini_prompt)
        result = response.text
    except Exception as e:
        result = f"Gemini API error: {e}"

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)