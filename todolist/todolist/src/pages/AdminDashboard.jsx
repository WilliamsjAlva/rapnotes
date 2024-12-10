import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [userToDelete, setUserToDelete] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    const saveUsers = (updatedUsers) => {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    const filteredUsers = users.filter((user) =>
        Object.values(user).join(" ").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (user) => {
        setEditingUser(user.username);
        setEditedData({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prev) => ({ ...prev, [name]: value }));
    };

    const saveEdit = () => {
        if (editingUser === "admin" && editedData.role !== "admin") {
            alert("No puedes cambiar el rol del usuario 'admin'.");
            return;
        }

        if (editedData.password) {
            editedData.password = bcrypt.hashSync(editedData.password, 10);
        } else {
            delete editedData.password;
        }

        const updatedUsers = users.map((user) =>
            user.username === editingUser ? editedData : user
        );
        saveUsers(updatedUsers);
        setEditingUser(null);
    };

    const cancelEdit = () => {
        setEditingUser(null);
        setEditedData({});
    };

    const confirmDelete = (user) => {
        if (user.username === "admin") {
            alert("No puedes eliminar al usuario 'admin'.");
            return;
        }
        setUserToDelete(user);
        setIsPopupOpen(true);
    };

    const deleteUser = () => {
        const updatedUsers = users.filter(
            (user) => user.username !== userToDelete.username
        );
        saveUsers(updatedUsers);
        setUserToDelete(null);
        setIsPopupOpen(false);
    };

    const closePopup = () => {
        setUserToDelete(null);
        setIsPopupOpen(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Administrar Usuarios</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre, usuario o correo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                    <div key={user.username} className="p-4 border border-black dark:border-white rounded-lg bg-transparent">
                        {editingUser === user.username ? (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Editando: {user.username}</h2>
                                <label className="block mb-2">Nombre: <input type="text" name="firstName" value={editedData.firstName || ""} onChange={handleChange} className="w-full px-2 py-1 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" /></label>
                                <label className="block mb-2">Apellido: <input type="text" name="lastName" value={editedData.lastName || ""} onChange={handleChange} className="w-full px-2 py-1 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" /></label>
                                <label className="block mb-2">Nombre de usuario: <input type="text" name="username" value={editedData.username || ""} onChange={handleChange} className="w-full px-2 py-1 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" /></label>
                                <label className="block mb-2">Correo: <input type="email" name="email" value={editedData.email || ""} onChange={handleChange} className="w-full px-2 py-1 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" /></label>
                                <label className="block mb-2">Contraseña: <input type="text" name="password" value={editedData.password || ""} onChange={handleChange} className="w-full px-2 py-1 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white" /></label>
                                <label className="block mb-2">Rol: <select name="role" value={editedData.role || ""} onChange={handleChange} disabled={user.username === "admin"} className="w-full px-2 py-1 border border-black dark:border-white rounded-md bg-transparent text-black dark:text-white"><option value="user" className="text-black">Usuario</option><option value="admin" className="text-black">Administrador</option></select></label>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button onClick={saveEdit} className="px-4 py-2 border border-blue-500 text-black dark:text-white rounded-md">Guardar</button>
                                    <button onClick={cancelEdit} className="px-4 py-2 border border-red-500 text-black dark:text-white rounded-md">Cancelar</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold mb-2 text-black dark:text-white">{user.username}</h2>
                                <p className="text-black dark:text-white"><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
                                <p className="text-black dark:text-white"><strong>Correo:</strong> {user.email}</p>
                                <p className="text-black dark:text-white"><strong>Rol:</strong> {user.role}</p>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button onClick={() => handleEdit(user)} className="px-4 py-2 border border-green-500 text-black dark:text-white rounded-md">Editar</button>
                                    <button onClick={() => confirmDelete(user)} className="px-4 py-2 border border-red-500 text-black dark:text-white rounded-md">Eliminar</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                        <h2 className="text-lg font-bold mb-4">¿Estás seguro de eliminar el usuario?</h2>
                        <p className="mb-4 text-gray-600">Esta acción no se puede deshacer.</p>
                        <div className="flex justify-center space-x-4">
                            <button onClick={deleteUser} className="px-4 py-2 bg-red-600 text-black dark:text-white rounded-md hover:bg-red-700">Aceptar</button>
                            <button onClick={closePopup} className="px-4 py-2 bg-gray-600 text-black dark:text-white rounded-md hover:bg-gray-700">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
