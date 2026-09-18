import LoginForm from "../components/loginForm";

function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-100 px-4 py-6 flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg sm:p-8">
                <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
                    Treasure Hunt
                </h1>

                <p className="mb-8 text-center text-gray-600">
                    Connectez-vous avec les identifiants de votre équipe
                </p>

                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;