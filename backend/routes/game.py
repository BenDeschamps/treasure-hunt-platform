from fastapi import APIRouter, Depends
from pydantic import BaseModel

from database.database import SessionLocal
from models.puzzle import Puzzle
from models.puzzle_file import PuzzleFile
from models.team_puzzle import TeamPuzzle
from services.auth_service import get_current_team


router = APIRouter()


class PuzzleAnswer(BaseModel):
    answer: str


class FinalPuzzleCode(BaseModel):
    code: str


def get_team_puzzle(
    db,
    team_id: int,
    puzzle_id: int
):
    return db.query(TeamPuzzle).filter(
        TeamPuzzle.team_id == team_id,
        TeamPuzzle.puzzle_id == puzzle_id
    ).first()


def is_puzzle_unlocked(
    db,
    team_id: int,
    puzzle_id: int
):
    if puzzle_id in [1, 2]:
        return True

    if puzzle_id == 3:
        puzzle = get_team_puzzle(
            db,
            team_id,
            1
        )

        return puzzle is not None and puzzle.solved

    if puzzle_id == 4:
        puzzle = get_team_puzzle(
            db,
            team_id,
            2
        )

        return puzzle is not None and puzzle.solved

    if puzzle_id == 5:
        for required_puzzle_id in [1, 2, 3, 4]:
            puzzle = get_team_puzzle(
                db,
                team_id,
                required_puzzle_id
            )

            if puzzle is None or not puzzle.solved:
                return False

        return True

    return False


@router.get("/main")
def get_main_page(
    current_team=Depends(get_current_team)
):
    db = SessionLocal()

    puzzles = db.query(Puzzle).order_by(Puzzle.id).all()

    result = []

    for puzzle in puzzles:
        team_puzzle = get_team_puzzle(
            db,
            current_team["team_id"],
            puzzle.id
        )

        solved = (
            team_puzzle is not None
            and team_puzzle.solved
        )

        unlocked = is_puzzle_unlocked(
            db,
            current_team["team_id"],
            puzzle.id
        )

        files = db.query(PuzzleFile).filter(
            PuzzleFile.puzzle_id == puzzle.id
        ).all()

        result.append({
            "id": puzzle.id,
            "title": puzzle.title,
            "description": puzzle.description,
            "solved_message": puzzle.solved_message,
            "locked": not unlocked,
            "solved": solved,
            "is_final": puzzle.is_final,
            "files": [
                {
                    "id": file.id,
                    "file_path": file.file_path,
                    "file_type": file.file_type
                }
                for file in files
            ]
        })

    db.close()

    return {
        "puzzles": result
    }


@router.post("/puzzle/{puzzle_id}/solve")
def solve_puzzle(
    puzzle_id: int,
    data: PuzzleAnswer,
    current_team=Depends(get_current_team)
):
    db = SessionLocal()

    puzzle = db.query(Puzzle).filter(
        Puzzle.id == puzzle_id
    ).first()

    if not puzzle:
        db.close()

        return {
            "success": False,
            "message": "Puzzle not found"
        }

    if puzzle.is_final:
        db.close()

        return {
            "success": False,
            "message": "Use the final puzzle endpoint"
        }

    if not is_puzzle_unlocked(
        db,
        current_team["team_id"],
        puzzle_id
    ):
        db.close()

        return {
            "success": False,
            "message": "Puzzle is locked"
        }

    if data.answer != puzzle.answer:
        db.close()

        return {
            "success": False,
            "message": "Invalid answer"
        }

    team_puzzle = get_team_puzzle(
        db,
        current_team["team_id"],
        puzzle_id
    )

    if not team_puzzle:
        team_puzzle = TeamPuzzle(
            team_id=current_team["team_id"],
            puzzle_id=puzzle_id,
            solved=True
        )

        db.add(team_puzzle)
    else:
        team_puzzle.solved = True

    db.commit()
    db.close()

    return {
        "success": True
    }


@router.post("/final/unlock")
def unlock_final_puzzle(
    data: FinalPuzzleCode,
    current_team=Depends(get_current_team)
):
    db = SessionLocal()

    final_puzzle = db.query(Puzzle).filter(
        Puzzle.is_final == True
    ).first()

    if not final_puzzle:
        db.close()

        return {
            "success": False,
            "message": "Final puzzle not found"
        }

    if not is_puzzle_unlocked(
        db,
        current_team["team_id"],
        final_puzzle.id
    ):
        db.close()

        return {
            "success": False,
            "message": "Final puzzle is locked"
        }

    if data.code != final_puzzle.answer:
        db.close()

        return {
            "success": False,
            "message": "Invalid code"
        }

    team_puzzle = get_team_puzzle(
        db,
        current_team["team_id"],
        final_puzzle.id
    )

    if not team_puzzle:
        team_puzzle = TeamPuzzle(
            team_id=current_team["team_id"],
            puzzle_id=final_puzzle.id,
            solved=True
        )

        db.add(team_puzzle)
    else:
        team_puzzle.solved = True

    db.commit()
    db.close()

    return {
        "success": True
    }