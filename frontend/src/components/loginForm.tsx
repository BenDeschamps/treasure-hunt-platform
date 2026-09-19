import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
    const [teamName, setTeamName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const result = await login(teamName, password);

        if (result.access_token && result.token_type === "bearer") {
            localStorage.setItem("access_token", result.access_token);
            navigate("/");
        } else {
            setMessage("Identifiants invalides");
        }
    }

    return (
        <form className="w-full space-y-5" onSubmit={handleSubmit}>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Nom d'équipe
                </label>

                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Entrez le nom de l'équipe"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Mot de passe
                </label>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez le mot de passe"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 transition hover:text-gray-700"
                        aria-label={
                            showPassword
                                ? "Masquer le mot de passe"
                                : "Afficher le mot de passe"
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
                Se connecter
            </button>

            {message && (
                <p className="text-center font-medium">
                    {message}
                </p>
            )}
        </form>
    );
}

export default LoginForm;