import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },

    artistId: {
        type: String,
        required: true,
    },

    musics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "music",
        },
    ],
});

const playlistModel = mongoose.model("playlist", playlistSchema);

export default playlistModel;
