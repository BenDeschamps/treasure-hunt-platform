import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
    const [selectedImage, setSelectedImage] =
        useState<PuzzleFile | null>(null);

    async function handleSubmit() {
        setHasError(false);

        const success = await onSolve(answer);

        if (success) {
            setAnswer("");
            return;
        }

        setHasError(true);
    }

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setSelectedImage(null);
            }
        }

        if (selectedImage) {
            document.addEventListener(
                "keydown",
                handleEscape
            );
        }

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [selectedImage]);

    const imageFiles = files.filter(
        (file) => file.file_type === "image"
    );

    return (
        <>
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
                                    <button
                                        key={file.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedImage(file)
                                        }
                                        className="
                                            overflow-hidden
                                            rounded-xl
                                            text-left
                                            transition
                                            hover:scale-[1.02]
                                            hover:shadow-lg
                                        "
                                    >
                                        <img
                                            src={`${API_URL}/uploads/${file.file_path}`}
                                            alt={title}
                                            className="
                                                w-full
                                                cursor-zoom-in
                                                object-contain
                                            "
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {solved ? (
                            <div className="rounded-xl bg-green-100 p-4 text-center font-semibold text-green-700">
                                {solvedMessage ||
                                    "Énigme résolue ✓"}
                            </div>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(event) => {
                                        setAnswer(
                                            event.target.value
                                        );
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
                                    disabled={
                                        answer.trim() === ""
                                    }
                                    className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                                >
                                    Valider
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>

            {selectedImage && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-black/80
                        p-4
                        backdrop-blur-sm
                    "
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        type="button"
                        onClick={() =>
                            setSelectedImage(null)
                        }
                        className="
                            absolute
                            right-4
                            top-4
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-white/90
                            text-gray-800
                            shadow-lg
                            transition
                            hover:scale-105
                            hover:bg-white
                        "
                    >
                        <X size={24} />
                    </button>

                    <div
                        className="
                            flex
                            max-h-full
                            max-w-full
                            items-center
                            justify-center
                        "
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <img
                            src={`${API_URL}/uploads/${selectedImage.file_path}`}
                            alt={title}
                            className="
                                max-h-[90vh]
                                max-w-[95vw]
                                rounded-xl
                                object-contain
                                shadow-2xl
                            "
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default PuzzleCard;