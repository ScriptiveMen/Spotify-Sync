import express from "express";
import morgan from "morgan";
import musicRoutes from "./routes/music.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/music", musicRoutes);

export default app;
