from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def test_upload():
    return {"message": "Upload route working"}