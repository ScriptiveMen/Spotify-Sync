import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const token = Cookies.get("token");

    if (!token) {
        return <Navigate to={"/signin"} replace />;
    }

    return children;
};

export default ProtectedRoutes;
