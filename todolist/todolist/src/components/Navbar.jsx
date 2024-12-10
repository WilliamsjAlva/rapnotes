import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar({ currentUser, handleLogout }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        handleLogout();
        navigate("/login");
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="w-full h-16 flex items-center justify-between px-10 text-white bg-white/25 backdrop-blur-sm  relative">
            <ul className="hidden md:flex gap-10 text-gray-300 font-semibold items-center justify-center w-full h-[60px] px-10">
                {currentUser ? (
                    <>
                        <NavLink to="/home" className={({ isActive }) => isActive ? "text-black dark:text-white border-b-2 border-white-600 pb-1" : "text-gray-400 dark:text-gray-300 "}>
                            <li>Inicio</li>
                        </NavLink>
                        <NavLink to="/notes" className={({ isActive }) => isActive ? "text-black dark:text-white border-b-2 border-white-600 pb-1" : "text-gray-400 dark:text-gray-300 "}>
                            <li>Notas</li>
                        </NavLink>
                        <NavLink to="/editProfile" className={({ isActive }) => isActive ? "text-black dark:text-white border-b-2 border-white-600 pb-1" : "text-gray-400 dark:text-gray-300 "}>
                            <li>Perfil</li>
                        </NavLink>
                        {currentUser.role === "admin" && (
                            <NavLink to="/admin" className={({ isActive }) => isActive ? "text-black dark:text-white border-b-2 border-white-600 pb-1" : "text-gray-400 dark:text-gray-300 "}>
                                <li>Admin</li>
                            </NavLink>
                        )}
                        <button onClick={handleSignOut} className="px-4 py-2 text-red-400 hover:text-red-500 font-semibold">Cerrar Sesión</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/" className={({ isActive }) => isActive ? "text-black dark:text-white border-b-2 border-white-600 pb-1" : "text-gray-400 dark:text-gray-300 "}>
                            <li>Inicio</li>
                        </NavLink>
                        <NavLink to="/login" className={({ isActive }) => isActive ? "text-black dark:text-white border-b-2 border-white-600 pb-1" : "text-gray-400 dark:text-gray-300 "}>
                            <li>Login</li>
                        </NavLink>
                        <NavLink to="/register" className={({ isActive }) => isActive ? "text-black dark:text-white border-b-2 border-white-600 pb-1" : "text-gray-400 dark:text-gray-300 "}>
                            <li>Register</li>
                        </NavLink>
                    </>
                )}
            </ul>
            <div className="md:hidden flex items-center">
                <button className="text-gray-400 dark:text-gray-300 focus:outline-none hover:text-white" onClick={toggleMenu}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {menuOpen && (
                <ul className="absolute top-16 left-0 w-full bg-white/25 backdrop-blur-sm text-black font-semibold flex flex-col gap-5 p-5 md:hidden">
                    {currentUser ? (
                        <>
                            <NavLink to="/home" className="" onClick={() => setMenuOpen(false)}><li>Inicio</li></NavLink>
                            <NavLink to="/notes" className="" onClick={() => setMenuOpen(false)}><li>Notas</li></NavLink>
                            <NavLink to="/editProfile" className="" onClick={() => setMenuOpen(false)}><li>Perfil</li></NavLink>
                            {currentUser.role === "admin" && (
                                <NavLink to="/admin" className="" onClick={() => setMenuOpen(false)}><li>Admin</li></NavLink>
                            )}
                            <button onClick={() => { handleSignOut(); setMenuOpen(false); }} className="text-red-500">Cerrar Sesión</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" className="" onClick={() => setMenuOpen(false)}><li>Inicio</li></NavLink>
                            <NavLink to="/login" className="" onClick={() => setMenuOpen(false)}><li>Login</li></NavLink>
                            <NavLink to="/register" className="" onClick={() => setMenuOpen(false)}><li>Register</li></NavLink>
                        </>
                    )}
                </ul>
            )}
            <ThemeToggle />
        </nav>
    );
}

export default Navbar;