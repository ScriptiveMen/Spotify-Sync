import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useSelector((state) => state.user);

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to={"/signin"} replace />;
    }

    return children;
};

export default ProtectedRoutes;
