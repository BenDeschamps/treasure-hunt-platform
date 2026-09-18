from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from database.database import SessionLocal
from models.team import Team
from services.auth_service import (create_access_token,get_current_team)

router = APIRouter()


@router.get("/")
def auth_root():
    return {"message": "Auth route working"}


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()

    team = db.query(Team).filter(
        Team.name == form_data.username
    ).first()

    db.close()

    if team and team.password == form_data.password:
        token = create_access_token(team.id, team.name)

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    return {
        "success": False,
        "message": "Invalid credentials"
    }

@router.get("/me")
def me(current_team = Depends(get_current_team)):
    return {
        "success": True,
        "team_id": current_team["team_id"],
        "team_name": current_team["team_name"]
    }