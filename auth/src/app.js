import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/auth.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);

export default app;
