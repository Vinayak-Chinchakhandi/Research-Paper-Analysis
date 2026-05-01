from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routes
from app.api.routes import upload, chat, analysis

app = FastAPI(title="ResearchGPT API")

# Enable CORS (for frontend later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(upload.router, prefix="/upload", tags=["Upload"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(analysis.router, prefix="/analysis", tags=["Analysis"])

@app.get("/")
def root():
    return {"message": "ResearchGPT API is running 🚀"}