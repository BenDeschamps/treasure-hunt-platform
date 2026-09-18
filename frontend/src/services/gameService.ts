import { API_URL } from "../config";


export type PuzzleFile = {
    id: number;
    file_path: string;
    file_type: string;
};


export type Puzzle = {
    id: number;
    title: string;
    description: string | null;
    solved_message: string | null;
    locked: boolean;
    solved: boolean;
    is_final: boolean;
    files: PuzzleFile[];
};


export type MainPageData = {
    puzzles: Puzzle[];
};


export async function getMainPage(): Promise<MainPageData> {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}/game/main`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
}


export async function solvePuzzle(
    puzzleId: number,
    answer: string
) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/game/puzzle/${puzzleId}/solve`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                answer: answer,
            }),
        }
    );

    return response.json();
}


export async function unlockFinalPuzzle(
    code: string
) {
    const token = localStorage.getItem("access_token");

    const response = await fetch(
        `${API_URL}/game/final/unlock`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                code: code,
            }),
        }
    );

    return response.json();
}