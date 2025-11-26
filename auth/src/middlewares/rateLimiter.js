import rateLimit from "express-rate-limit";

const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Allow only 50 attempts per 15 mins
    message: "Too many attempts, try again later.",
});

export default Limiter;
