import { uploadFile, getPresignedUrl } from "../services/storage.service.js";
import musicModel from "../models/music.model.js";

export async function uploadMusic(req, res) {
    const musicFile = req.files["music"][0];
    const coverImageFile = req.files["coverImage"][0];

    try {
        const musicKey = await uploadFile(musicFile);
        const coverImageKey = await uploadFile(coverImageFile);

        const music = await musicModel.create({
            title: req.body.title,
            artist:
                req.user.fullName.firstName + " " + req.user.fullName.lastName,
            artistId: req.user.id,
            musicKey,
            coverImageKey,
        });

        res.status(201).json({
            message: "Music uploaded",
            music,
        });
    } catch (err) {
        console.log("Error uploading music: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getArtistMusics(req, res) {
    const musics = await musicModel.find({ artistId: req.user.id }).lean();

    try {
        for (let music of musics) {
            music.musicUrl = await getPresignedUrl(music.musicKey);
            music.coverImageUrl = await getPresignedUrl(music.coverImageKey);
        }

        return res.status(200).json({ musics });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
