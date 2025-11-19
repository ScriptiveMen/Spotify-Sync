import config from "../config/config.js";
import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";

function initSocketServer(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    io.use((socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers.cookie || "");

        const token = cookies.token;

        if (!token) {
            return next(new Error("Authenticaton error"));
        }

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            socket.user = decoded;
            next();
        } catch (error) {
            return next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket) => {
        socket.join(socket.user.id);

        socket.on("play", (data) => {
            const musicId = data.musicId;
            socket.broadcast.to(socket.user.id).emit("play", { musicId });
            console.log("Broadcasted music id: ", { musicId });
        });

        socket.on("disconnect", () => {
            socket.leave(socket.user.id);
        });
    });
}

export default initSocketServer;
