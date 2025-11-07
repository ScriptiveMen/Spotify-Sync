import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/common/SignIn";
import SignUp from "../pages/common/SignUp";
import Home from "../pages/common/Home";
import Track from "../pages/common/Track";
import ProtectedRoutes from "../components/common/ProtectedRoutes";

const MainRotues = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoutes>
                        <Home />
                    </ProtectedRoutes>
                }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
                path="/track/:id"
                element={
                    <ProtectedRoutes>
                        <Track />
                    </ProtectedRoutes>
                }
            />
        </Routes>
    );
};

export default MainRotues;
