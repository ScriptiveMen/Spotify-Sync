import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/common/SignIn";
import SignUp from "../pages/common/SignUp";
import Home from "../pages/common/Home";
import MusicPlayer from "../pages/common/MusicPlayer";

const MainRotues = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/track/:id" element={<MusicPlayer />} />
        </Routes>
    );
};

export default MainRotues;
