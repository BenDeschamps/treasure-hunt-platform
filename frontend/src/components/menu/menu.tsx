import { useEffect, useState } from "react";
import {
    House,
    LogOut,
    Menu as MenuIcon,
    X,
    Wrench,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    function handleNavigation(path: string) {
        setIsOpen(false);
        navigate(path);
    }

    function handleLogout() {
        localStorage.removeItem("access_token");
        setIsOpen(false);
        navigate("/login");
    }

    useEffect(() => {
        function handleClickOutside() {
            setIsOpen(false);
        }

        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    if (location.pathname === "/login") {
        return null;
    }

    return (
        <div className="fixed right-6 top-6 z-50">
            <button
                onClick={(event) => {
                    event.stopPropagation();
                    setIsOpen((value) => !value);
                }}
                className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-lg
                    transition
                    hover:scale-105
                "
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <MenuIcon size={24} />
                )}
            </button>

            {isOpen && (
                <div
                    onClick={(event) => event.stopPropagation()}
                    className="
                        absolute
                        right-0
                        mt-3
                        w-56
                        overflow-hidden
                        rounded-2xl
                        bg-white
                        shadow-xl
                    "
                >
                    <button
                        onClick={() => handleNavigation("/")}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            px-5
                            py-4
                            text-left
                            transition
                            hover:bg-gray-100
                        "
                    >
                        <House size={20} />
                        <span>Page principale</span>
                    </button>

                    <button
                        onClick={() => handleNavigation("/decoders")}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            px-5
                            py-4
                            text-left
                            transition
                            hover:bg-gray-100
                        "
                    >
                        <Wrench size={20} />
                        <span>Décodeurs</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            border-t
                            border-gray-200
                            px-5
                            py-4
                            text-left
                            text-red-600
                            transition
                            hover:bg-red-50
                        "
                    >
                        <LogOut size={20} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Menu;