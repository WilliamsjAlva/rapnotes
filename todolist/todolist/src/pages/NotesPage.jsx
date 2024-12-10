import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function NotesPage({ currentUser }) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [error, setError] = useState("");
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const MAX_NOTE_LENGTH = 500;

    useEffect(() => {
        const userNotes = JSON.parse(localStorage.getItem(`notes_${currentUser.username}`)) || [];
        setNotes(userNotes);
    }, [currentUser.username]);

    const addNote = () => {
        setError("");
        if (newNote.trim() === "") {
            setError("La nota no puede estar vacía.");
            return;
        }
        if (newNote.length > MAX_NOTE_LENGTH) {
            setError(`La nota no puede tener más de ${MAX_NOTE_LENGTH} caracteres.`);
            return;
        }
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        localStorage.setItem(`notes_${currentUser.username}`, JSON.stringify(updatedNotes));
        setNewNote("");
    };

    const toggleSelectNote = (index) => {
        setSelectedNotes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const deleteSelectedNotes = () => {
        const updatedNotes = notes.filter((_, i) => !selectedNotes.includes(i));
        setNotes(updatedNotes);
        localStorage.setItem(`notes_${currentUser.username}`, JSON.stringify(updatedNotes));
        setSelectedNotes([]);
        setIsDeleting(false);
    };

    const cancelDeletion = () => {
        setSelectedNotes([]);
        setIsDeleting(false);
    };

    return (
        <div className="min-h-screen flex flex-col justify-around items-center mt-5 md:flex-row">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold mt-10 mb-6 text-black dark:text-white">Mis Notas</h2>
                {isDeleting ? (
                    <div className="flex space-x-4">
                        <button onClick={deleteSelectedNotes} className="border border-red-500 text-black dark:text-white px-4 py-2 rounded-md focus:outline-none">Aceptar</button>
                        <button onClick={cancelDeletion} className="border border-black dark:border-white text-black dark:text-white px-4 py-2 rounded-md focus:outline-none">Cancelar</button>
                    </div>
                ) : (
                    <button onClick={() => setIsDeleting(true)} className="border border-red-500 text-black dark:text-white px-4 py-2 rounded-md focus:outline-none">Eliminar</button>
                )}
            </div>
            <div className="w-full max-w-md bg-transparent border border-black dark:border-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col items-start mb-4">
                    <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} className="w-full px-4 py-2 border border-black dark:border-white bg-transparent text-black dark:text-white rounded-l-md focus:outline-none focus:ring" placeholder={`Escribe una nueva nota (máx. ${MAX_NOTE_LENGTH} caracteres)`} maxLength={MAX_NOTE_LENGTH} />
                    <button onClick={addNote} className="mt-2 border border-black dark:border-white text-black dark:text-white px-4 py-2 rounded-md focus:outline-none">Agregar</button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
                <div className="flex flex-col w-full space-y-2">
                    {notes.map((note, index) => (
                        <div key={index} className={`p-3 rounded-md flex justify-between items-center bg-transparent border border-black dark:border-white ${selectedNotes.includes(index) ? 'border-2 border-indigo-500' : ''}`}>
                            <span className="text-black dark:text-white w-full break-words">{note}</span>
                            {isDeleting && <input type="checkbox" checked={selectedNotes.includes(index)} onChange={() => toggleSelectNote(index)} className="ml-2" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

NotesPage.propTypes = {
    currentUser: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }).isRequired,
};

export default NotesPage;
