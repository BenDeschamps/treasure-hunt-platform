import { useEffect, useRef } from "react";

type CodeInputProps = {
    length: number;
    value: string;
    onChange: (code: string) => void;
    hasError: boolean;
};

function CodeInput({
    length,
    value,
    onChange,
    hasError,
}: CodeInputProps) {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    function handleChange(index: number, input: string) {
        if (!/^\d?$/.test(input)) {
            return;
        }

        const values = (value ?? "").split("");

        while (values.length < length) {
            values.push("");
        }

        values[index] = input;

        onChange(values.join(""));

        if (input && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (
            event.key === "Backspace" &&
            (value?.[index] ?? "") === "" &&
            index > 0
        ) {
            inputsRef.current[index - 1]?.focus();
        }
    }

    function handlePaste(
        event: React.ClipboardEvent<HTMLInputElement>
    ) {
        event.preventDefault();

        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, length);

        onChange(pasted);

        const nextIndex = Math.min(pasted.length, length - 1);
        inputsRef.current[nextIndex]?.focus();
    }

    return (
        <div
            className={`flex justify-center gap-3 ${
                hasError ? "animate-shake" : ""
            }`}
        >
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={(element) => {
                        inputsRef.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value?.[index] ?? ""}
                    onChange={(event) =>
                        handleChange(index, event.target.value)
                    }
                    onKeyDown={(event) =>
                        handleKeyDown(index, event)
                    }
                    onPaste={handlePaste}
                    className={`h-14 w-14 rounded-lg border-2 text-center text-2xl font-bold outline-none transition-all duration-200 ${
                        hasError
                            ? "border-red-500 bg-red-50 text-red-600"
                            : "border-gray-300 focus:border-blue-500"
                    }`}
                />
            ))}
        </div>
    );
}

export default CodeInput;