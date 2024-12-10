import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isLogged, adminOnly }) => {
    const currentUser = JSON.parse(localStorage.getItem("users")).find(
        (user) => user.username === localStorage.getItem("currentUser")
    );

    if (!isLogged) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && currentUser.role !== "admin") {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
