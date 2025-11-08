import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.jsx";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
