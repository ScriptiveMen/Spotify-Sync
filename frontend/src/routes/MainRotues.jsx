import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/common/Login";

const MainRotues = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default MainRotues;
