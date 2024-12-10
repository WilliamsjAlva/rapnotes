import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((u) => u.username === username);

        if (user && (await bcrypt.compare(password, user.password))) {
            onLogin(user);
            navigate("/redirecting");
        } else {
            setErrorMessage("Usuario o contraseña incorrectos.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen mt-2">
            <div className="w-full max-w-md p-8 space-y-6 border border-black dark:border-white shadow-md rounded-lg min-[300px]:w-4/5 max-[490px]:w-96 max-[300px]:p-4">
                <h2 className="text-2xl font-bold text-center text-black dark:text-white">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-black dark:text-white">Nombre de Usuario</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md text-black dark:text-white bg-transparent border-black dark:border-white" placeholder="Ingresa tu nombre de usuario" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white">Contraseña</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md text-black dark:text-white bg-transparent border-black dark:border-white" placeholder="Ingresa tu contraseña" required />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-black bg-white font-semibold rounded-md">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
