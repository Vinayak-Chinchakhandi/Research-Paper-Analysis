# Research Paper Analyser

## Overview

Research Paper Analyser is a web-based application designed to help users analyze research papers and extract key insights. Users can input a research topic and upload a PDF of a research paper. The agent then processes the information and presents a structured analysis, potentially including summaries, key points, citations, related topics, and suggested actions.

This project provides a user-friendly interface with a clean and modern design, allowing researchers, students, and anyone interested in academic literature to quickly grasp the core concepts of research papers.

## Features

* **Topic Input:** Allows users to specify the research topic of interest.
* **PDF Upload:** Enables users to upload research papers in PDF format for analysis.
* **Structured Analysis Display:** Presents the extracted information in a clear and organized manner, including:
    * Summaries
    * Key Points
    * Citations
    * Related Topics
    * Suggested Actions
* **Analysis History:** Keeps a record of past analyses for easy review.
* **Clear and Modern UI:** Features a responsive design with an attractive color scheme.
* **File Upload Success Feedback:** Provides confirmation when a PDF file is successfully added.
* **Structured History Display:** When an interaction in the history is clicked, the details are displayed in a structured format.
* **Copy and Save Options:** (If implemented) Allows users to copy or save the analysis results.
* **Loading Indicator:** Provides visual feedback during the analysis process.

## Technologies Used

* **Frontend:**
    * HTML
    * CSS
    * JavaScript
* **Fonts:**
    * Roboto (for general text)
    * Montserrat (for headings)
* **Potential Backend (if applicable):**
    * Python flask
* **Potential Libraries/APIs (if applicable):**
    * Flask
    * google-generativeai
    * python-dotenv
    * flask-cors
    * PyPDF2

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vinayak-Chinchakhandi/Research-Paper-Analyser.git
    cd Research Paper Analyser

2.  **Frontend Setup (for static deployment or if the backend serves the frontend):**
    * Navigate to the `frontend` directory (if you have one).
    * Ensure you have a web browser to open the `index.html` file.

3.  **Backend Setup (if applicable):**
    * If your application has a backend, follow the specific instructions in the `backend` directory (or create a `backend/README.md`). This might involve installing dependencies (e.g., using `pip install -r requirements.txt` for Python) and running the backend server.

4.  **Open in Browser:**
    * If it's a static frontend, open the `index.html` file in your web browser.
    * If you have a backend, access the application through the URL provided by your backend server (e.g., `http://localhost:5000`).

## Usage

1.  Enter the research topic you are interested in.
2.  Click on the "Upload PDF Paper" area to select and upload a PDF file of the research paper. You will see a "File added successfully" message upon successful upload.
3.  Click the "Analyze Paper" button.
4.  Wait for the analysis to complete. A loading indicator will be displayed during this process.
5.  The analysis results will be displayed in the "Result" section in a structured format.
6.  You can view your analysis history by clicking the "History" button in the top right corner. Clicking on an interaction in the history will display its details in a structured format in the "Result" section.
7.  (If implemented) Use the "Save as Text" or "Copy Text" buttons to manage the analysis results.
8.  Click the "Clear" button to clear the input fields and the result area.

---

Thank you for checking out Research Paper Analyser!
