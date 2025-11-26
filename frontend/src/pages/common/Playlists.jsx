import React, { useEffect, useState } from "react";
import Navbar from "../../layout/Navbar";
import musicClient from "../../utils/musicClient.axios";
import { useNavigate, useParams } from "react-router-dom";
import { Edit2, ListMinus, ListMusic, Music, Play, Trash2 } from "lucide-react";

const Playlists = ({ socket }) => {
    const [musics, setMusics] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [playlistName, setPlaylistName] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function getPlaylistMusics() {
            const res = await musicClient.get(`/api/music/playlist/${id}`, {
                withCredentials: true,
            });

            setMusics(res.data.playlist.musics);
            setPlaylistName(res.data.playlist.title);
        }

        getPlaylistMusics();
    }, [id]);

    return (
        <div className="min-h-screen w-full bg-linear-to-b from-gray-900 via-black to-black">
            <Navbar />

            <div className="w-full min-h-screen px-4 md:px-8 lg:px-12 pt-24">
                <h2 className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-bold mb-10">
                    <div className="p-1.5 sm:p-2 bg-linear-to-br from-cyan-500 to-blue-500 rounded-lg">
                        <ListMinus className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span>{playlistName}</span>
                </h2>

                {musics ? (
                    musics.map((track) => {
                        return (
                            <div
                                onClick={() => {
                                    navigate(`/track/${track._id}`);
                                    socket?.emit("play", {
                                        musicId: track._id,
                                    });
                                }}
                                key={track._id}
                                className="flex items-center gap-4 p-4 hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                                onMouseEnter={() => setHoveredItem(track._id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                    <img
                                        src={track.coverImageUrl}
                                        alt={track.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {hoveredItem === track._id && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <Play size={20} fill="white" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold truncate">
                                        {track.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {(track.plays || 1000).toLocaleString()}{" "}
                                        plays • {track.duration || "3:45"}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">
                                        {track.artist}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h1>No Musics</h1>
                )}
            </div>
        </div>
    );
};

export default Playlists;
