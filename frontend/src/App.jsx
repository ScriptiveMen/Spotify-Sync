import React, { useEffect } from "react";
import MainRotues from "./routes/MainRotues";
import authClient from "./utils/authClient.axios.js";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";

const App = () => {
    const dispatch = useDispatch();
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

    return (
        <div className="text-white">
            <MainRotues />
        </div>
    );
};

export default App;
