from database.database import SessionLocal
from models.puzzle import Puzzle


def initialize_puzzles():
    db = SessionLocal()

    existing_puzzles = db.query(Puzzle).count()

    if existing_puzzles == 0:
        puzzles = [
            Puzzle(
                title="Énigme 1",
                answer="test1",
                is_final=False
            ),
            Puzzle(
                title="Énigme 2",
                answer="test2",
                is_final=False
            ),
            Puzzle(
                title="Énigme 3",
                answer="test3",
                is_final=False
            ),
            Puzzle(
                title="Énigme 4",
                answer="test4",
                is_final=False
            ),
            Puzzle(
                title="Énigme finale",
                answer="1234",
                is_final=True
            ),
        ]

        db.add_all(puzzles)
        db.commit()

    db.close()