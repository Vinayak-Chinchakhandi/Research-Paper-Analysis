from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def test_analysis():
    return {"message": "Analysis route working"}