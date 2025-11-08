import express from "express";
import morgan from "morgan";
import musicRoutes from "./routes/music.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/music", musicRoutes);

export default app;
