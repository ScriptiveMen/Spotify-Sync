import express from "express";
import multer from "multer";

const router = express();

const upload = multer(multer.memoryStorage());

router.get("/", (req, res) => {
    res.send("Working...");
});

export default router;
