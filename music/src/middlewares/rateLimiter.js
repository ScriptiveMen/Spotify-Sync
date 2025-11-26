import rateLimit from "express-rate-limit";

const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too many attempts, try again later.",
});

export default Limiter;
