import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import bcrypt from "bcryptjs";
import ErrorMessage from "./../Common/ErrorMessage/ErrorMessage";
import InputField from "./../UI/Input/InputField";
import PasswordField from "./../UI/Input/PasswordField";

function EditProfileForm({ currentUser, onUpdate }) {
    const [firstName, setFirstName] = useState(currentUser.firstName || "");
    const [lastName, setLastName] = useState(currentUser.lastName || "");
    const [username, setUsername] = useState(currentUser.username || "");
    const [email, setEmail] = useState(currentUser.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        setFirstName(currentUser.firstName);
        setLastName(currentUser.lastName);
        setUsername(currentUser.username);
        setEmail(currentUser.email);
    }, [currentUser]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find((user) => user.username === currentUser.username);

        if (email !== currentUser.email && users.some((user) => user.email === email)) {
            setErrorMessage("El correo ya está en uso.");
            setSuccessMessage("");
            return;
        }

        if (username !== currentUser.username && users.some((user) => user.username === username)) {
            setErrorMessage("El nombre de usuario ya está en uso.");
            setSuccessMessage("");
            return;
        }

        if (password || confirmPassword) {
            if (password !== confirmPassword) {
                setErrorMessage("Las contraseñas no coinciden.");
                setSuccessMessage("");
                return;
            }
            existingUser.password = bcrypt.hashSync(password, 10);
        }

        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.username = username;
        existingUser.email = email;
        localStorage.setItem("users", JSON.stringify(users));

        setErrorMessage("");
        setSuccessMessage("¡Datos modificados exitosamente!");
        onUpdate(existingUser);
    };

    return (
        <div className="flex items-center justify-center min-h-screen mt-4">
            <div className="w-full max-w-md m-4 p-8 space-y-6 border border-black dark:border-white shadow-md rounded-lg min-[300px]:w-4/5 max-[490px]:w-96 max-[300px]:p-4">
                <h2 className="text-2xl font-bold text-center text-black dark:text-white">Editar Perfil</h2>
                <form onSubmit={handleUpdate} className="space-y-6" >
                    <ErrorMessage message={errorMessage} />
                    {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                    <InputField label="Nombre" value={firstName} onChange={setFirstName} placeholder="Ingresa tu nombre" />
                    <InputField label="Apellido" value={lastName} onChange={setLastName} placeholder="Ingresa tu apellido" />
                    <InputField label="Nombre de Usuario" value={username} onChange={setUsername} placeholder="Ingresa tu nombre de usuario" />
                    <InputField label="Correo Electrónico" value={email} onChange={setEmail} type="email" placeholder="Ingresa tu correo electrónico" />
                    <PasswordField label="Nueva Contraseña" value={password} onChange={setPassword} placeholder="Ingresa tu nueva contraseña" />
                    <PasswordField label="Confirmar Nueva Contraseña" value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirma tu nueva contraseña" />
                    <button type="submit" className="w-full px-4 py-2 text-black bg-white font-semibold rounded-md">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
}

EditProfileForm.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default EditProfileForm;
