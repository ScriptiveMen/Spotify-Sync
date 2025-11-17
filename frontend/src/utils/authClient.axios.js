import axios from "axios";

const authClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL || "http://localhost:3000",
    withCredentials: true,
});

export default authClient;
