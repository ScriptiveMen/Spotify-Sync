import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/auth.routes.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config/config.js";
import cors from "cors";
import Limiter from "./middlewares/rateLimiter.js";

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            // Here, you would typically find or create a user in your database
            // For this example, we'll just return the profile
            return done(null, profile);
        }
    )
);

app.use("/api/auth/login", Limiter);
app.use("/api/auth/register", Limiter);
app.use("/api/auth/google", Limiter);

app.use("/api/auth", userRoutes);

export default app;
