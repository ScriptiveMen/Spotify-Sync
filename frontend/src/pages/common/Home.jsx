import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layout/Navbar";
import { ChevronDown, ChevronUp, ListMusic, Music, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    const [isShowAllPlaylists, setIsShowAllPlaylists] = useState(false);
    const [isShowAllMusics, setIsShowAllMusics] = useState(false);
    const [itemsPerRow, setItemsPerRow] = useState(5);
    const [hoveredPlaylist, setHoveredPlaylist] = useState(null);
    const [hoveredMusic, setHoveredMusic] = useState(null);
    const containerRef = useRef(null);

    const playlists = [
        {
            image: "/sample.jpeg",
            title: "Bollywood Hits 2024",
            artist: "Various Artists",
        },
        {
            image: "/sample.jpeg",
            title: "Romantic Melodies",
            artist: "Various Artists",
        },
        {
            image: "/sample.jpeg",
            title: "Party Mix",
            artist: "Various Artists",
        },
        {
            image: "/sample.jpeg",
            title: "Chill Vibes",
            artist: "Various Artists",
        },
        {
            image: "/sample.jpeg",
            title: "Classical Collection",
            artist: "Various Artists",
        },
        {
            image: "/sample.jpeg",
            title: "Workout Motivation",
            artist: "Various Artists",
        },
        {
            image: "/sample.jpeg",
            title: "90s Nostalgia",
            artist: "Various Artists",
        },
        {
            image: "/sample.jpeg",
            title: "Indie Favorites",
            artist: "Various Artists",
        },
        {
            image: "/sample.jpeg",
            title: "Road Trip Essentials",
            artist: "Various Artists",
        },
    ];

    const musics = [
        {
            _id: 0,
            image: "/sample2.jpeg",
            title: "Tum Hi Ho",
            artist: "Arijit Singh",
        },
        {
            _id: 1,
            image: "/sample2.jpeg",
            title: "Kesariya",
            artist: "Arijit Singh",
        },
        {
            _id: 2,
            image: "/sample2.jpeg",
            title: "Apna Bana Le",
            artist: "Arijit Singh",
        },
        {
            _id: 3,
            image: "/sample2.jpeg",
            title: "Chaleya",
            artist: "Arijit Singh",
        },
        {
            _id: 4,
            image: "/sample2.jpeg",
            title: "Pal Pal Dil Ke Paas",
            artist: "Kishore Kumar",
        },
        {
            _id: 5,
            image: "/sample2.jpeg",
            title: "Ve Kamleya",
            artist: "Arijit Singh",
        },
        {
            _id: 6,
            image: "/sample2.jpeg",
            title: "O Bedardeya",
            artist: "Arijit Singh",
        },
        {
            _id: 7,
            image: "/sample2.jpeg",
            title: "Satranga",
            artist: "Arijit Singh",
        },
        {
            _id: 8,
            image: "/sample2.jpeg",
            title: "Phir Aur Kya Chahiye",
            artist: "Arijit Singh",
        },
        {
            _id: 9,
            image: "/sample2.jpeg",
            title: "Raabta",
            artist: "Arijit Singh",
        },
        {
            _id: 10,
            image: "/sample2.jpeg",
            title: "Hawayein",
            artist: "Arijit Singh",
        },
        {
            _id: 11,
            image: "/sample2.jpeg",
            title: "Ae Dil Hai Mushkil",
            artist: "Arijit Singh",
        },
        {
            _id: 12,
            image: "/sample2.jpeg",
            title: "Kabira",
            artist: "Tochi Raina",
        },
        {
            _id: 13,
            image: "/sample2.jpeg",
            title: "Ilahi",
            artist: "Arijit Singh",
        },
        {
            _id: 14,
            image: "/sample2.jpeg",
            title: "Pehla Nasha",
            artist: "Udit Narayan",
        },
    ];

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
                    <p className="text-gray-400 text-lg">
                        What do you want to listen to today?
                    </p>
                </div>

                {/* Musics Section */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
                            <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg">
                                <Music size={24} />
                            </div>
                            <span>Trending Musics</span>
                        </h2>
                        {hasMoreMusics && (
                            <button
                                onClick={() =>
                                    setIsShowAllMusics(!isShowAllMusics)
                                }
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium"
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

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {displayedMusics.map((music, idx) => (
                            <Link
                                to={`/music-player/${music._id}`}
                                key={idx}
                                className="group"
                                onMouseEnter={() => setHoveredMusic(idx)}
                                onMouseLeave={() => setHoveredMusic(null)}
                            >
                                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                    <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-4 shadow-2xl">
                                        <img
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={music.image}
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
                                                <Play size={24} fill="white" />
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
                </div>

                {/* Playlists Section */}
                <div className="pb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
                            <div className="p-2 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg">
                                <ListMusic size={24} />
                            </div>
                            <span>Trending Playlists</span>
                        </h2>
                        {hasMorePlaylists && (
                            <button
                                onClick={() =>
                                    setIsShowAllPlaylists(!isShowAllPlaylists)
                                }
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium"
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

                    <div
                        ref={containerRef}
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
                    >
                        {displayedPlaylists.map((playlist, idx) => (
                            <div
                                key={idx}
                                className="group cursor-pointer"
                                onMouseEnter={() => setHoveredPlaylist(idx)}
                                onMouseLeave={() => setHoveredPlaylist(null)}
                            >
                                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                                    <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-4 shadow-2xl">
                                        <img
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={playlist.image}
                                            alt={playlist.title}
                                        />
                                        <div
                                            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                                                hoveredPlaylist === idx
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                        >
                                            <div className="bg-purple-500 hover:bg-purple-600 rounded-full p-3 shadow-lg transform transition-transform hover:scale-110">
                                                <Play size={24} fill="white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
                                            {playlist.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-gray-400 truncate">
                                            {playlist.artist}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
