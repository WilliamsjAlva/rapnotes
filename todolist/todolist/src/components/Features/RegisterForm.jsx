import React, { useState } from "react";
import PropTypes from "prop-types";
import bcrypt from "bcryptjs";
import ErrorMessage from "../Common/ErrorMessage/ErrorMessage";

function RegisterForm({ onRegister }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        if (username.includes(" ") || email.includes(" ") || password.includes(" ")) {
            setErrorMessage("El nombre de usuario, correo y contraseña no deben contener espacios.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some((user) => user.email === email)) {
            setErrorMessage("El correo ya está en uso.");
            return;
        }

        if (users.some((user) => user.username === username)) {
            setErrorMessage("El nombre de usuario ya está en uso.");
            return;
        }

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { firstName, lastName, username, email, password: hashedPassword };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        setErrorMessage("");

        onRegister(newUser);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md m-4 p-8 space-y-6 border border-black dark:border-white shadow-md rounded-lg min-[300px]:w-4/5 max-[490px]:w-96 max-[300px]:p-4">
                <h2 className="text-2xl font-bold text-center text-black dark:text-white">Registro</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    <ErrorMessage message={errorMessage} />
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-black dark:text-white">Nombre</label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 w-full px-4 py-2 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" placeholder="Ingresa tu nombre" required />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-black dark:text-white">Apellido</label>
                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 w-full px-4 py-2 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" placeholder="Ingresa tu apellido" required />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-black dark:text-white">Nombre de Usuario</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 w-full px-4 py-2 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" placeholder="Ingresa tu nombre de usuario" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white">Correo Electrónico</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-4 py-2 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" placeholder="Ingresa tu correo electrónico" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white">Contraseña</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-4 py-2 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" placeholder="Ingresa tu contraseña" required />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-black dark:text-white">Confirmar Contraseña</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 w-full px-4 py-2 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" placeholder="Confirma tu contraseña" required />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-black bg-white font-semibold rounded-md">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

RegisterForm.propTypes = { onRegister: PropTypes.func.isRequired };

export default RegisterForm;
