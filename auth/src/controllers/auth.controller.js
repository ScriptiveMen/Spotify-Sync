import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { publishToQueue } from "../broker/rabbit.js";

export async function registerUser(req, res) {
    const {
        email,
        fullName: { firstName, lastName },
        role = "user",
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
        role,
    });

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
            fullName: user.fullName,
        },
        config.JWT_SECRET,
        { expiresIn: "2d" }
    );

    await publishToQueue("USER_CREATED", {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
    });

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

export async function googleAuthCallback(req, res) {
    const user = req.user;

    const isAlreadyUserExists = await userModel.findOne({
        $or: [{ email: user.emails[0].value }, { googleId: user.id }],
    });

    if (isAlreadyUserExists) {
        const token = jwt.sign(
            {
                id: isAlreadyUserExists._id,
                role: isAlreadyUserExists.role,
                fullName: isAlreadyUserExists.fullName,
            },
            config.JWT_SECRET,
            { expiresIn: "2d" }
        );

        res.cookie("token", token);

        return res.redirect("http://localhost:5173");
    }

    const newUser = await userModel.create({
        googleId: user.id,
        email: user.emails[0].value,
        fullName: {
            firstName: user.name.givenName,
            lastName: user.name.familyName,
        },
    });

    await publishToQueue("USER_CREATED", {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
    });

    const token = jwt.sign(
        {
            id: newUser._id,
            role: newUser.role,
            fullName: newUser.fullName,
        },
        config.JWT_SECRET,
        { expiresIn: "2d" }
    );

    res.cookie("token", token);

    res.redirect("http://localhost:5173");
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(403).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
            fullName: user.fullName,
        },
        config.JWT_SECRET,
        { expiresIn: "2d" }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in sucessfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        },
    });
}

export async function getUser(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({
        message: "User fetched sucessfully",
        user: {
            id: req.user.id,
            email: req.user.email,
            fullName: req.user.fullName,
            role: req.user.fullName,
        },
    });
}
