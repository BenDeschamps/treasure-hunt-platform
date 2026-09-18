import { useState } from "react";

import CaesarDecoder from "../components/decoder/caesarDecoder";

type Decoder = "caesar";

function DecoderPage() {
    const [activeDecoder, setActiveDecoder] =
        useState<Decoder>("caesar");

    return (
        <div className="min-h-screen bg-gray-100 p-6 pt-24 sm:p-8 sm:pt-24">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-8 text-3xl font-bold">
                    Décodeurs
                </h1>

                <div className="flex flex-col gap-6 sm:flex-row">
                    <div className="w-full shrink-0 sm:w-48">
                        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                            <button
                                onClick={() =>
                                    setActiveDecoder("caesar")
                                }
                                className={`
                                    w-full
                                    px-5
                                    py-4
                                    text-left
                                    font-semibold
                                    transition
                                    ${
                                        activeDecoder === "caesar"
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }
                                `}
                            >
                                Code César
                            </button>
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        {activeDecoder === "caesar" && (
                            <CaesarDecoder />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DecoderPage;