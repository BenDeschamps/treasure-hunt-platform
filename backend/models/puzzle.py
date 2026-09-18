from sqlalchemy import Column, Integer, String, Boolean

from database.database import Base


class Puzzle(Base):
    __tablename__ = "puzzles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    solved_message = Column(String, nullable=True)
    answer = Column(String, nullable=False)
    is_final = Column(Boolean, default=False, nullable=False)