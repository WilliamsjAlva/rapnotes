import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        
        const timer = setTimeout(() => {
            if (currentUser) {
                navigate("/notes");
            } else {
                navigate("/login");
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen text-center">
            <h2 className="text-3xl font-bold text-gray-300">
                Redireccionando...
            </h2>
        </div>
    );
}

export default RedirectingPage;
