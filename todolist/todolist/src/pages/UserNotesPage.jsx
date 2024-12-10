import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserNotesPage() {
    const { username } = useParams();
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const MAX_NOTE_LENGTH = 250;

    useEffect(() => {
        const userNotesKey = `notes_${username}`;
        const storedNotes = JSON.parse(localStorage.getItem(userNotesKey)) || [];
        setNotes(storedNotes);
    }, [username]);

    const saveNotes = (updatedNotes) => {
        const userNotesKey = `notes_${username}`;
        localStorage.setItem(userNotesKey, JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    const addNote = () => {
        setError("");
        if (!newNote.trim()) {
            setError("La nota no puede estar vacía.");
            return;
        }
        if (newNote.length > MAX_NOTE_LENGTH) {
            setError(`La nota no puede tener más de ${MAX_NOTE_LENGTH} caracteres.`);
            return;
        }
        const updatedNotes = [...notes, newNote];
        saveNotes(updatedNotes);
        setNewNote("");
    };

    const deleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        saveNotes(updatedNotes);
    };

    return (
        <div className="p-6">
            <button onClick={() => navigate("/admin")} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 mb-4">Volver</button>
            <h1 className="text-3xl font-bold mb-6">Gestionar Notas de {username}</h1>
            <div className="mb-6">
                <textarea placeholder={`Escribe una nueva nota (máx. ${MAX_NOTE_LENGTH} caracteres)`} value={newNote} onChange={(e) => setNewNote(e.target.value)} className="w-full px-4 py-2 border rounded-md mb-2 resize-none" rows="3" maxLength={MAX_NOTE_LENGTH} />
                <button onClick={addNote} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Agregar Nota</button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-100 flex flex-col justify-between" style={{ wordWrap: "break-word", minHeight: "100px" }}>
                        <p className="mb-4 overflow-hidden text-ellipsis">{note}</p>
                        <button onClick={() => deleteNote(index)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Eliminar Nota</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserNotesPage;
