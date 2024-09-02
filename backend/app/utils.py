import uuid
from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse
from fastapi import HTTPException, APIRouter


router = APIRouter()


@router.get("/generate_txn_number", tags=["Basic"])
def generate_txn_number():
    return str(uuid.uuid4())


class LogoutRequest(BaseModel):
    txn: str
    email: EmailStr


@router.post("/logout", tags=["Login & Registration"])
async def logout(request: LogoutRequest):
    try:
        email = request.email
        txn = request.txn

        # Simulated successful logout
        return JSONResponse(content={
            "status_code": 200,
            "success": True,
            "message": "Logout successful"
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred during logout. Please try again later.")

