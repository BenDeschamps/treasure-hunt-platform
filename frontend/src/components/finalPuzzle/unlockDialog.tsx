import { useEffect, useState } from "react";

import CodeInput from "./codeInput";

type UnlockDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onValidate: (code: string) => Promise<boolean>;
};

function UnlockDialog({
    isOpen,
    onClose,
    onValidate,
}: UnlockDialogProps) {
    const [code, setCode] = useState("");
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCode("");
            setHasError(false);
        }
    }, [isOpen]);

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!hasError) {
            return;
        }

        const timer = setTimeout(() => {
            setCode("");
            setHasError(false);
        }, 700);

        return () => clearTimeout(timer);
    }, [hasError]);

    if (!isOpen) {
        return null;
    }

    async function handleValidate() {
        const success = await onValidate(code);

        if (!success) {
            setHasError(true);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <CodeInput
                    length={4}
                    value={code}
                    onChange={(newCode) => {
                        if (hasError) {
                            setHasError(false);
                        }

                        setCode(newCode);
                    }}
                    hasError={hasError}
                />

                <button
                    className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    disabled={code.length !== 4}
                    onClick={handleValidate}
                >
                    Valider
                </button>
            </div>
        </div>
    );
}

export default UnlockDialog;