import { useState } from "react";
import { Lock } from "lucide-react";

import UnlockDialog from "./unlockDialog";


type FinalPuzzleCardProps = {
    title: string;
    locked: boolean;
    solved: boolean;
    children: React.ReactNode;
    onUnlock: (code: string) => Promise<boolean>;
};


function FinalPuzzleCard({
    title,
    locked,
    solved,
    children,
    onUnlock,
}: FinalPuzzleCardProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [accessMessage, setAccessMessage] = useState(false);


    function handleLockClick() {
        if (locked) {
            setAccessMessage(true);

            setTimeout(() => {
                setAccessMessage(false);
            }, 2000);

            return;
        }

        setDialogOpen(true);
    }


    async function handleValidate(code: string): Promise<boolean> {
        const success = await onUnlock(code);

        if (success) {
            setDialogOpen(false);
        }

        return success;
    }


    return (
        <>
            <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-xl">

                <div className="border-b border-gray-200 px-8 py-6">
                    <h2 className="text-3xl font-bold">
                        {title}
                    </h2>
                </div>


                <div className="relative min-h-[500px]">

                    <div
                        className={`p-8 transition-all duration-500 ${
                            !solved
                                ? "select-none blur-md"
                                : ""
                        }`}
                    >
                        {children}
                    </div>


                    {!solved && (
                        <button
                            onClick={handleLockClick}
                            className="
                                absolute
                                left-1/2
                                top-1/2
                                flex
                                h-24
                                w-24
                                -translate-x-1/2
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-full
                                bg-white/90
                                shadow-2xl
                                transition-all
                                duration-200
                                hover:scale-110
                                hover:bg-white
                            "
                        >
                            <Lock
                                size={48}
                                className="text-gray-700"
                            />
                        </button>
                    )}


                    {accessMessage && (
                        <div
                            className="
                                absolute
                                left-1/2
                                top-[calc(50%+80px)]
                                -translate-x-1/2
                                rounded-xl
                                bg-black/80
                                px-5
                                py-3
                                text-center
                                text-sm
                                font-medium
                                text-white
                                shadow-lg
                            "
                        >
                            Vous ne pouvez pas encore accéder à cela.
                        </div>
                    )}

                </div>
            </div>


            <UnlockDialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onValidate={handleValidate}
            />
        </>
    );
}


export default FinalPuzzleCard;