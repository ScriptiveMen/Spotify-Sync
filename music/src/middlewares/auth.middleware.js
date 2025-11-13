import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function authArtistMiddleware(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({ message: "Token not provided" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Forbidden" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
    }
}

export async function authUserMiddleware(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({ message: "Token not provided" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
    }
}
