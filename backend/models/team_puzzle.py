from sqlalchemy import Column, Integer, Boolean, ForeignKey, UniqueConstraint

from database.database import Base


class TeamPuzzle(Base):
    __tablename__ = "team_puzzles"

    id = Column(Integer, primary_key=True, index=True)

    team_id = Column(
        Integer,
        ForeignKey("teams.id"),
        nullable=False
    )

    puzzle_id = Column(
        Integer,
        ForeignKey("puzzles.id"),
        nullable=False
    )

    solved = Column(Boolean, default=False, nullable=False)

    __table_args__ = (
        UniqueConstraint(
            "team_id",
            "puzzle_id",
            name="unique_team_puzzle"
        ),
    )