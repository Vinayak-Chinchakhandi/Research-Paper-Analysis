# 🚀 ResearchGPT Backend Setup Guide

## 📁 Project Structure

Backend is located inside:

```
research-gpt/backend
```

---

## ⚙️ 1. Create Virtual Environment

```bash
python -m venv venv
```

---

## ▶️ 2. Activate Virtual Environment

### Windows (PowerShell)

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## 📦 3. Install Dependencies

```bash
pip install fastapi uvicorn python-multipart
```

---

## ▶️ 4. Run FastAPI Server

```bash
uvicorn app.main:app --reload
```

---

## 🌐 5. Access API

* Root: http://127.0.0.1:8000
* Upload: http://127.0.0.1:8000/upload
* Chat: http://127.0.0.1:8000/chat
* Analysis: http://127.0.0.1:8000/analysis

---

## 📘 6. API Docs (Swagger UI)

```bash
http://127.0.0.1:8000/docs
```

---

## ⚠️ Notes

* `--reload` enables auto-restart on code changes
* Make sure virtual environment is activated before running
* If port is busy, change port:

```bash
uvicorn app.main:app --reload --port 8001
```

---

## 🧠 Status

✔ Backend server running
✔ Routes configured
⏳ Next: PDF Upload + AI Processing
