import { useState } from "react";

import { API_URL } from "../../config";
import type { PuzzleFile } from "../../services/gameService";


type PuzzleCardProps = {
    title: string;
    description: string | null;
    solvedMessage: string | null;
    files: PuzzleFile[];
    locked: boolean;
    solved: boolean;
    onSolve: (answer: string) => Promise<boolean>;
};


function PuzzleCard({
    title,
    description,
    solvedMessage,
    files,
    locked,
    solved,
    onSolve,
}: PuzzleCardProps) {
    const [answer, setAnswer] = useState("");
    const [hasError, setHasError] = useState(false);


    async function handleSubmit() {
        setHasError(false);

        const success = await onSolve(answer);

        if (success) {
            setAnswer("");
            return;
        }

        setHasError(true);
    }


    const imageFiles = files.filter(
        (file) => file.file_type === "image"
    );


    return (
        <div className="rounded-2xl bg-white p-6 shadow-xl">

            <h2 className="mb-4 text-2xl font-bold">
                {title}
            </h2>


            {locked && (
                <div className="rounded-xl bg-gray-100 p-6 text-center">
                    <p className="text-gray-500">
                        Cette énigme est verrouillée.
                    </p>
                </div>
            )}


            {!locked && (
                <>
                    {description && (
                        <p className="mb-6 whitespace-pre-line">
                            {description}
                        </p>
                    )}


                    {imageFiles.length > 0 && (
                        <div className="mb-6 grid gap-4 sm:grid-cols-2">
                            {imageFiles.map((file) => (
                                <img
                                    key={file.id}
                                    src={`${API_URL}/uploads/${file.file_path}`}
                                    alt={title}
                                    className="w-full rounded-xl object-contain"
                                />
                            ))}
                        </div>
                    )}


                    {solved ? (
                        <div className="rounded-xl bg-green-100 p-4 text-center font-semibold text-green-700">
                            {solvedMessage || "Énigme résolue ✓"}
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={answer}
                                onChange={(event) => {
                                    setAnswer(event.target.value);
                                    setHasError(false);
                                }}
                                placeholder="Votre réponse"
                                className={`w-full rounded-xl border-2 px-4 py-3 outline-none transition ${
                                    hasError
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                }`}
                            />


                            {hasError && (
                                <p className="mt-2 text-sm text-red-500">
                                    Mauvaise réponse.
                                </p>
                            )}


                            <button
                                onClick={handleSubmit}
                                disabled={answer.trim() === ""}
                                className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                Valider
                            </button>
                        </>
                    )}
                </>
            )}

        </div>
    );
}


export default PuzzleCard;