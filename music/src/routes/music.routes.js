import express from "express";
import multer from "multer";
import * as musicController from "../controllers/music.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const router = express();

const upload = multer({
    storage: multer.memoryStorage(),
});

/* POST /api/music/upload */
router.post(
    "/upload",
    authMiddleware.authArtistMiddleware,
    upload.fields([
        { name: "music", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    musicController.uploadMusic
);

/* GET /api/music */
router.get("/", authMiddleware.authUserMiddleware, musicController.getMusics);

/* GET /api/music/get-details/:id */
router.get(
    "/playlist/get-details/:id",
    authMiddleware.authUserMiddleware,
    musicController.getMusicById
);

/* GET /api/music/artist-musics */
router.get(
    "/artist-musics",
    authMiddleware.authArtistMiddleware,
    musicController.getArtistMusics
);

/* POST /api/music/playlist */
router.post(
    "/playlist",
    authMiddleware.authArtistMiddleware,
    musicController.createPlaylist
);

/* GET /api/music/playlist (for artist) */
router.get(
    "/playlist",
    authMiddleware.authUserMiddleware,
    musicController.getPlaylist
);

/* GET /api/music/playlists (for all users) */
router.get(
    "/playlists",
    authMiddleware.authUserMiddleware,
    musicController.getAllPlaylists
);

/* GET /api/music/playlist/:id */
router.get(
    "/playlist/:id",
    authMiddleware.authUserMiddleware,
    musicController.getPlaylistById
);

export default router;
