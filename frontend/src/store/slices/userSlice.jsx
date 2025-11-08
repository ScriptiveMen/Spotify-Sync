import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
};

export const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
