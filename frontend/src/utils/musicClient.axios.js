import axios from "axios";

const musicClient = axios.create({
    baseURL: import.meta.env.VITE_MUSIC_API_URL || "http://localhost:3002",
    withCredentials: true,
});

export default musicClient;
