import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/common/SignIn";
import SignUp from "../pages/common/SignUp";
import Home from "../pages/common/Home";
import Track from "../pages/common/Track";
import ProtectedRoutes from "../components/common/ProtectedRoutes";
import PublicRoutes from "../components/common/PublicRoutes";
import ArtistDashboard from "../pages/artist/ArtistDashboard";

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
            <Route
                path="/signin"
                element={
                    <PublicRoutes>
                        <SignIn />
                    </PublicRoutes>
                }
            />
            <Route
                path="/signup"
                element={
                    <PublicRoutes>
                        <SignUp />
                    </PublicRoutes>
                }
            />
            <Route
                path="/track/:id"
                element={
                    <ProtectedRoutes>
                        <Track />
                    </ProtectedRoutes>
                }
            />

            <Route
                path="/artist/dashboard"
                element={
                    <ProtectedRoutes>
                        <ArtistDashboard />
                    </ProtectedRoutes>
                }
            />
        </Routes>
    );
};

export default MainRotues;
