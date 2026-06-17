import os

from fastapi import Header, HTTPException
from dotenv import load_dotenv

load_dotenv()

INTERNAL_API_KEY = os.getenv("INTERNAL_API_KEY")


def verify_internal_api_key(
    x_internal_api_key: str = Header(None)
):

    if x_internal_api_key != INTERNAL_API_KEY:

        raise HTTPException(
            status_code=403,
            detail="Unauthorized internal request"
        )