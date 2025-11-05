import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/common/Login";
import Register from "../pages/common/Register";
import Home from "../pages/common/Home";
import MusicPlayer from "../pages/common/MusicPlayer";

const MainRotues = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/music-player" element={<MusicPlayer />} />
        </Routes>
    );
};

export default MainRotues;
