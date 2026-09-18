from sqlalchemy import Column, Integer, String, ForeignKey

from database.database import Base


class PuzzleFile(Base):
    __tablename__ = "puzzle_files"

    id = Column(Integer, primary_key=True, index=True)

    puzzle_id = Column(
        Integer,
        ForeignKey("puzzles.id"),
        nullable=False
    )

    file_path = Column(String, nullable=False)

    file_type = Column(String, nullable=False)