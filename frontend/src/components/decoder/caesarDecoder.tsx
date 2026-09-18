import { useMemo, useState } from "react";

function CaesarDecoder() {
    const [keyLetter, setKeyLetter] = useState("D");
    const [encodedText, setEncodedText] = useState("");

    const shift = useMemo(() => {
        return keyLetter.charCodeAt(0) - "A".charCodeAt(0);
    }, [keyLetter]);

    const decodedText = useMemo(() => {
        return encodedText
            .split("")
            .map((char) => {
                const code = char.charCodeAt(0);

                // Lettres majuscules
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(
                        ((code - 65 + shift) % 26) + 65
                    );
                }

                // Lettres minuscules
                if (code >= 97 && code <= 122) {
                    return String.fromCharCode(
                        ((code - 97 + shift) % 26) + 97
                    );
                }

                // Espaces, chiffres et ponctuation
                return char;
            })
            .join("");
    }, [encodedText, shift]);

    function handleKeyChange(value: string) {
        const letter = value
            .toUpperCase()
            .replace(/[^A-Z]/g, "")
            .slice(0, 1);

        setKeyLetter(letter);
    }

    return (
        <div className="rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold">
                Code César
            </h2>

            <div className="mb-8 rounded-xl bg-gray-100 p-5">
                <p className="mb-3 text-sm font-semibold text-gray-500">
                    Clé du décalage
                </p>

                <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-bold">
                        A
                    </span>

                    <span className="text-2xl font-bold text-gray-400">
                        →
                    </span>

                    <input
                        type="text"
                        value={keyLetter}
                        onChange={(event) =>
                            handleKeyChange(event.target.value)
                        }
                        maxLength={1}
                        className="
                            h-12
                            w-12
                            rounded-lg
                            border-2
                            border-gray-300
                            text-center
                            text-2xl
                            font-bold
                            uppercase
                            outline-none
                            transition
                            focus:border-blue-500
                        "
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Texte codé
                    </label>

                    <textarea
                        value={encodedText}
                        onChange={(event) =>
                            setEncodedText(event.target.value)
                        }
                        placeholder="Entrez votre texte codé..."
                        rows={7}
                        className="
                            w-full
                            resize-none
                            rounded-xl
                            border-2
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-blue-500
                        "
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Résultat
                    </label>

                    <textarea
                        value={decodedText}
                        readOnly
                        rows={7}
                        placeholder="Le texte décodé apparaîtra ici..."
                        className="
                            w-full
                            resize-none
                            rounded-xl
                            border-2
                            border-gray-200
                            bg-gray-50
                            px-4
                            py-3
                            outline-none
                        "
                    />
                </div>
            </div>
        </div>
    );
}

export default CaesarDecoder;