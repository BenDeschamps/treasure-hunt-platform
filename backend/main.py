from dotenv import load_dotenv

load_dotenv()

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import engine, Base
from models.team import Team
from models.puzzle import Puzzle
from models.team_puzzle import TeamPuzzle
from models.puzzle_file import PuzzleFile
from services.puzzle_service import initialize_puzzles

from routes import auth
from routes import game

from fastapi.staticfiles import StaticFiles
from pathlib import Path


app = FastAPI()

UPLOADS_DIR = os.getenv("UPLOADS_DIR")

Path(f"{UPLOADS_DIR}/puzzles").mkdir(
    parents=True,
    exist_ok=True
)

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOADS_DIR),
    name="uploads"
)


Base.metadata.create_all(bind=engine)
initialize_puzzles()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/auth")
app.include_router(game.router, prefix="/game")


@app.get("/")
def root():
    return {"message": "Backend is running"}