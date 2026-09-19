import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";


function LoginForm() {
    const [teamName, setTeamName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const result = await login(teamName, password);

        if (result.access_token && result.token_type === "bearer") {
            localStorage.setItem("access_token", result.access_token);
            navigate("/");
        } 
        else 
        {
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
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez le mot de passe"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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