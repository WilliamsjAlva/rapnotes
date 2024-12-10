import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import HomeUser from "./pages/HomeUser";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotesPage from "./pages/NotesPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import RedirectingPage from "./pages/RedirectingPage";
import AdminDashboard from "./pages/AdminDashboard"; 
import PrivateRoute from "./components/PrivateRoute";
import UserNotesPage from "./pages/UserNotesPage";

function App() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (loggedUser) {
            setCurrentUser(loggedUser);
        }
        setLoading(false);
    
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const adminExists = users.some((user) => user.username === "admin");
    
        if (!adminExists) {
            const hashedPassword = bcrypt.hashSync("admin", 10);
            
            const adminUser = {
                username: "admin",
                password: hashedPassword,
                firstName: "Administrador",
                lastName: "Sistema",
                email: "admin@example.com",
                role: "admin",
            };
            users.push(adminUser);
            localStorage.setItem("users", JSON.stringify(users));
        }
    }, []);
    

    const handleLogin = (user) => {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/redirecting");
    };

    const handleRegister = (user) => {
        handleLogin(user);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Background />
            <Navbar currentUser={currentUser} handleLogout={handleLogout} />
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={currentUser ? <RedirectingPage /> : <Login onLogin={handleLogin} />} />
                <Route path="/register" element={currentUser ? <RedirectingPage /> : <Register onRegister={handleRegister} />} />
                <Route path="/redirecting" element={<RedirectingPage />} />

                {/* Rutas privadas para usuarios autenticados */}
                <Route element={<PrivateRoute currentUser={currentUser} />}>
                    <Route path="/notes" element={<NotesPage currentUser={currentUser} />} />
                    <Route path="/editProfile" element={<ProfileEditPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                    <Route path="/home" element={<HomeUser />} />
                </Route>

                {/* Rutas privadas para administradores */}
                <Route element={<PrivateRoute currentUser={currentUser} allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users/:username/notes" element={<UserNotesPage />}
/>

                </Route>

                {/* Ruta 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
