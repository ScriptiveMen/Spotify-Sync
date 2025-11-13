import { uploadFile, getPresignedUrl } from "../services/storage.service.js";
import musicModel from "../models/music.model.js";
import playlistModel from "../models/playlist.model.js";

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

export async function getMusics(req, res) {
    const { skip = 0, limit = 10 } = req.query;
    try {
        const musics = await musicModel.find().skip(skip).limit(limit).lean();

        for (let music of musics) {
            music.musicUrl = await getPresignedUrl(music.musicKey);
            music.coverImageUrl = await getPresignedUrl(music.coverImageKey);
        }

        res.status(200).json({ message: "Musics fetched sucessfully", musics });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getMusicById(req, res) {
    const { id } = req.params;
    try {
        const music = await musicModel.findById(id).lean();

        if (!music) {
            return res.status(404).json({ message: "No music found" });
        }

        music.musicUrl = await getPresignedUrl(music.musicKey);
        music.coverImageUrl = await getPresignedUrl(music.coverImageKey);

        res.status(200).json({ music });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getArtistMusics(req, res) {
    try {
        const musics = await musicModel.find({ artistId: req.user.id }).lean();
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

export async function createPlaylist(req, res) {
    const { title, musics } = req.body;

    try {
        const playlist = await playlistModel.create({
            title,
            musics,
            artistId: req.user.id,
            artist:
                req.user.fullName.firstName + " " + req.user.fullName.lastName,
        });

        res.status(201).json({
            message: "Playlist created!",
            playlist,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export async function getPlaylist(req, res) {
    try {
        const playlist = await playlistModel.find({ artistId: req.user.id });

        res.status(200).json({ playlist });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPlaylistById(req, res) {
    const { id } = req.params;

    try {
        const playlist = await playlistModel.findById(id).lean();

        if (!playlist) {
            return res.status(404).json({ message: "No playlist found" });
        }

        // Replace music IDs with actual music objects + presigned URLs
        const enrichedMusics = await Promise.all(
            playlist.musics.map(async (musicId) => {
                const music = await musicModel.findById(musicId).lean();
                if (!music) return null;

                return {
                    ...music,
                    musicUrl: await getPresignedUrl(music.musicKey),
                    coverImageUrl: await getPresignedUrl(music.coverImageKey),
                };
            })
        );

        // Filter out nulls (if any music not found)
        playlist.musics = enrichedMusics.filter(Boolean);

        res.status(200).json({ message: "Playlist found", playlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
