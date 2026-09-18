import { useEffect, useState } from "react";

import {
    getMainPage,
    solvePuzzle,
    unlockFinalPuzzle,
    type Puzzle,
} from "../services/gameService";

import PuzzleCard from "../components/puzzle/puzzleCard";
import FinalPuzzleCard from "../components/finalPuzzle/finalPuzzleCard";


function MainPage() {
    const [puzzles, setPuzzles] = useState<Puzzle[]>([]);


    async function loadMainPage() {
        const data = await getMainPage();

        setPuzzles(data.puzzles);
    }


    useEffect(() => {
        loadMainPage();
    }, []);


    async function handlePuzzleSolve(
        puzzleId: number,
        answer: string
    ): Promise<boolean> {
        const result = await solvePuzzle(
            puzzleId,
            answer
        );

        if (result.success) {
            await loadMainPage();

            return true;
        }

        return false;
    }


    async function handleFinalPuzzleUnlock(
        code: string
    ): Promise<boolean> {
        const result = await unlockFinalPuzzle(code);

        if (result.success) {
            await loadMainPage();

            return true;
        }

        return false;
    }


    const mainPuzzles = puzzles.filter(
        (puzzle) => !puzzle.is_final
    );

    const finalPuzzle = puzzles.find(
        (puzzle) => puzzle.is_final
    );


    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {finalPuzzle && (
                <FinalPuzzleCard
                    title={finalPuzzle.title}
                    locked={finalPuzzle.locked}
                    solved={finalPuzzle.solved}
                    onUnlock={handleFinalPuzzleUnlock}
                >
                    <div className="space-y-6">
                        <p className="whitespace-pre-line">
                            {finalPuzzle.description}
                        </p>
                    </div>
                </FinalPuzzleCard>
            )}


            <div className="mt-8 grid gap-8 md:grid-cols-2">
                {mainPuzzles.map((puzzle) => (
                    <PuzzleCard
                        key={puzzle.id}
                        title={puzzle.title}
                        description={puzzle.description}
                        solvedMessage={puzzle.solved_message}
                        files={puzzle.files}
                        locked={puzzle.locked}
                        solved={puzzle.solved}
                        onSolve={(answer) =>
                            handlePuzzleSolve(
                                puzzle.id,
                                answer
                            )
                        }
                    />
                ))}
            </div>

        </div>
    );
}


export default MainPage;
