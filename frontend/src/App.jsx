import { useEffect, useState } from "react";
import authClient from "./utils/authClient.axios.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./pages/common/SignIn.jsx";
import SignUp from "./pages/common/SignUp";
import Home from "./pages/common/Home";
import Track from "./pages/common/Track";
import ProtectedRoutes from "./components/common/ProtectedRoutes";
import PublicRoutes from "./components/common/PublicRoutes";
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import { io } from "socket.io-client";

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        async function getUser() {
            try {
                const res = await authClient.get("/api/auth/me", {
                    withCredentials: true,
                });
                dispatch(setUser(res.data.user));
            } catch (error) {
                console.log("Error Fetching user:", error);
                dispatch(setUser(null));
            }
        }

        getUser();
    }, [dispatch]);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!user) return;
        const newSocket = io("http://localhost:3002", {
            withCredentials: true,
        });

        setSocket(newSocket);

        newSocket.on("play", (data) => {
            const musicId = data.musicId;
            navigate(`/track/${musicId}`);
        });

        return () => newSocket.disconnect();
    }, [user]);
    return (
        <div className="text-white">
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoutes>
                            <Home socket={socket} />
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
        </div>
    );
};

export default App;
