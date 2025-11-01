import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function registerUser(req, res) {
    const {
        email,
        fullName: { firstName, lastName },
        password,
    } = req.body;

    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        email,
        password: hashedPassword,
        fullName: {
            firstName,
            lastName,
        },
    });

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        config.JWT_SECRET,
        { expiresIn: "2d" }
    );

    res.cookie("token", token);
    res.status(201).json({
        message: "User Registered sucessfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        },
    });
}
