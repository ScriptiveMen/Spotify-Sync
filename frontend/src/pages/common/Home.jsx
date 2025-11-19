import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layout/Navbar";
import {
    ChevronDown,
    ChevronUp,
    ListMusic,
    Music,
    Play,
    Eye,
    Edit2,
    ServerCrash,
    Inbox,
    InboxIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import musicClient from "../../utils/musicClient.axios.js";
import { useSelector } from "react-redux";
import ErrorMsg from "../../components/common/ErrorMsg.jsx";

const Home = ({ socket }) => {
    const { user } = useSelector((state) => state.user);
    const [isShowAllPlaylists, setIsShowAllPlaylists] = useState(false);
    const [isShowAllMusics, setIsShowAllMusics] = useState(false);
    const [itemsPerRow, setItemsPerRow] = useState(5);
    const [hoveredMusic, setHoveredMusic] = useState(null);
    const containerRef = useRef(null);
    const [playlists, setplaylists] = useState([]);
    const [musics, setMusics] = useState([]);

    // Calculate items per row based on screen size
    useEffect(() => {
        const calculateItemsPerRow = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setItemsPerRow(2);
            } else if (width < 1024) {
                setItemsPerRow(4);
            } else if (width < 1280) {
                setItemsPerRow(5);
            } else {
                setItemsPerRow(6);
            }
        };

        calculateItemsPerRow();
        window.addEventListener("resize", calculateItemsPerRow);
        return () => window.removeEventListener("resize", calculateItemsPerRow);
    }, []);

    async function getPlaylist() {
        const res = await musicClient.get("/api/music/playlists", {
            withCredentials: true,
        });
        setplaylists(res.data.playlists);
    }
    async function getMusics() {
        const res = await musicClient.get("/api/music", {
            withCredentials: true,
        });

        setMusics(res.data.musics);
    }

    useEffect(() => {
        getPlaylist();
        getMusics();
    }, []);

    const displayedPlaylists = isShowAllPlaylists
        ? playlists
        : playlists.slice(0, itemsPerRow);
    const hasMorePlaylists = playlists.length > itemsPerRow;

    const displayedMusics = isShowAllMusics
        ? musics
        : musics.slice(0, itemsPerRow);
    const hasMoreMusics = musics.length > itemsPerRow;

    return (
        <div className="min-h-screen w-full bg-linear-to-b from-gray-900 via-black to-black">
            <Navbar />
            <div className="w-full min-h-screen px-4 md:px-8 lg:px-12 pt-24">
                {/* Hero Section */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-[#20D760]">
                        Welcome Back
                    </h1>
                    <p className="text-gray-300 text-2xl font-semibold mb-2">
                        {user?.fullName.firstName +
                            " " +
                            user?.fullName.lastName}
                    </p>
                </div>

                {/* Playlists Section */}
                <div className="pb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-bold">
                            <div className="p-1.5 sm:p-2 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg">
                                <ListMusic className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span>Trending Playlists</span>
                        </h2>
                        {hasMorePlaylists && (
                            <button
                                onClick={() =>
                                    setIsShowAllPlaylists(!isShowAllPlaylists)
                                }
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 text-xs sm:text-sm font-medium"
                            >
                                <span>
                                    {isShowAllPlaylists
                                        ? "Show less"
                                        : "Show all"}
                                </span>
                                {isShowAllPlaylists ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                )}
                            </button>
                        )}
                    </div>
                    {displayedPlaylists.length === 0 ? (
                        <ErrorMsg
                            icon={Inbox}
                            title="No playlists available right now."
                        />
                    ) : (
                        <div
                            ref={containerRef}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                        >
                            {displayedPlaylists.map((playlist) => (
                                <div
                                    key={playlist._id}
                                    className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer border border-white/10"
                                >
                                    {/* Playlist Info */}
                                    <h3 className="font-semibold text-xl mb-2 truncate">
                                        {playlist.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-5">
                                        {playlist.musics.length} tracks
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm font-medium">
                                            <Eye size={16} />
                                            <span>View</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm font-medium">
                                            <Play size={16} />
                                            <span>Play</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Musics Section */}
                <div className="pb-5">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-bold">
                            <div className="p-1.5 sm:p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg">
                                <Music className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span>Trending Musics</span>
                        </h2>
                        {hasMoreMusics && (
                            <button
                                onClick={() =>
                                    setIsShowAllMusics(!isShowAllMusics)
                                }
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 text-xs sm:text-sm font-medium"
                            >
                                <span>
                                    {isShowAllMusics ? "Show less" : "Show all"}
                                </span>
                                {isShowAllMusics ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                )}
                            </button>
                        )}
                    </div>
                    {displayedMusics.length == 0 ? (
                        <ErrorMsg
                            icon={Inbox}
                            title={"No musics available right now."}
                        />
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                            {displayedMusics.map((music, idx) => (
                                <Link
                                    to={`/track/${music._id}`}
                                    onClick={() => {
                                        socket?.emit("play", {
                                            musicId: music._id,
                                        });

                                        console.log("sent musicId", music._id);
                                    }}
                                    key={idx}
                                    className="group"
                                    onMouseEnter={() => setHoveredMusic(idx)}
                                    onMouseLeave={() => setHoveredMusic(null)}
                                >
                                    <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-2 sm:p-4 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                        <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-4 shadow-2xl">
                                            <img
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                src={music.coverImageUrl}
                                                alt={music.title}
                                            />
                                            <div
                                                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                                                    hoveredMusic === idx
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                }`}
                                            >
                                                <div className="bg-blue-500 hover:bg-blue-600 rounded-full p-3 shadow-lg transform transition-transform hover:scale-110">
                                                    <Play
                                                        size={24}
                                                        fill="white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
                                                {music.title}
                                            </h3>
                                            <p className="text-xs md:text-sm text-gray-400 truncate">
                                                {music.artist}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
