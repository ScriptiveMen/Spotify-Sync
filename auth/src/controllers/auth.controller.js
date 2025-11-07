import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { publishToQueue } from "../broker/rabbit.js";

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
            },
            config.JWT_SECRET,
            { expiresIn: "2d" }
        );

        res.cookie("token", token);

        return res.status(200).json({
            message: "User loggedIn Sucessfully",
            user: {
                id: isAlreadyUserExists._id,
                email: isAlreadyUserExists.email,
                fullName: isAlreadyUserExists.fullName,
                role: isAlreadyUserExists.role,
            },
        });
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
        },
        config.JWT_SECRET,
        { expiresIn: "2d" }
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered sucessfully",
        user: {
            id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            role: newUser.role,
        },
    });
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
