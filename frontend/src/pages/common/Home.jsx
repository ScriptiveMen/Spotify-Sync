import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../layout/Navbar";
import { ChevronDown, ChevronUp, ListMusic } from "lucide-react";

const Home = () => {
    const [isShowAll, setIsShowAll] = useState(false);
    const [itemsPerRow, setItemsPerRow] = useState(5);
    const containerRef = useRef(null);

    const playlists = [
        {
            image: "/sample.jpeg",
            title: "Lorem ipsum dolor emit.Lorem ipsum dolor emit.Lorem ipsum dolor emit.",
            artist: "Arijit Singh",
        },
        {
            image: "/sample.jpeg",
            title: "Lorem ipsum dolor emit.",
            artist: "Arijit Singh",
        },
        {
            image: "/sample.jpeg",
            title: "Lorem ipsum dolor emit.",
            artist: "Arijit Singh",
        },
        {
            image: "/sample.jpeg",
            title: "Lorem ipsum dolor emit.",
            artist: "Arijit Singh",
        },
        {
            image: "/sample.jpeg",
            title: "Lorem ipsum dolor emit.",
            artist: "Arijit Singh",
        },
        {
            image: "/sample.jpeg",
            title: "Lorem ipsum dolor emit.",
            artist: "Arijit Singh",
        },
        {
            image: "/sample.jpeg",
            title: "Lorem ipsum dolor emit.",
            artist: "Arijit Singh",
        },
        {
            image: "/sample.jpeg",
            title: "Lorem ipsum dolor emit.",
            artist: "Arijit Singh",
        },
        {
            image: "/sample.jpeg",
            title: "Lorem ipsum dolor emit.",
            artist: "Arijit Singh",
        },
    ];

    // Calculate items per row based on screen size
    useEffect(() => {
        const calculateItemsPerRow = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setItemsPerRow(2); // mobile
            } else if (width < 1024) {
                setItemsPerRow(5); // tablet
            } else {
                setItemsPerRow(7); // desktop
            }
        };

        calculateItemsPerRow();
        window.addEventListener("resize", calculateItemsPerRow);
        return () => window.removeEventListener("resize", calculateItemsPerRow);
    }, []);

    const displayedPlaylists = isShowAll
        ? playlists
        : playlists.slice(0, itemsPerRow);
    const hasMorePlaylists = playlists.length > itemsPerRow;

    return (
        <div className="h-screen w-screen p-5 relative overflow-auto">
            <Navbar />
            <div className="w-full h-full pt-20">
                <div className="playlists">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="flex items-center justify-start gap-3">
                            <ListMusic />
                            <span className="text-2xl">Trending Playlists</span>
                        </h1>
                        {hasMorePlaylists && (
                            <button
                                onClick={() => setIsShowAll(!isShowAll)}
                                className="flex text-gray-300 text-sm select-none transition-all duration-300 items-center justify-center gap-2 hover:text-white cursor-pointer"
                            >
                                <span>
                                    {isShowAll ? "Show less" : "Show all"}
                                </span>
                                {isShowAll ? (
                                    <ChevronUp size={16} />
                                ) : (
                                    <ChevronDown size={16} />
                                )}
                            </button>
                        )}
                    </div>

                    <div
                        ref={containerRef}
                        className="lists w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-5"
                    >
                        {displayedPlaylists.map((playlist, idx) => {
                            return (
                                <div key={idx} className="flex flex-col">
                                    <div className="card w-full aspect-square overflow-hidden rounded-lg bg-gray-800">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={playlist.image || ""}
                                            alt="music banner"
                                        />
                                    </div>
                                    <div className="pt-2 shrink-0">
                                        <h3 className="font-extralight text-sm md:text-base line-clamp-2 min-h-10">
                                            {playlist.title.length > 30
                                                ? playlist.title.slice(0, 26) +
                                                  "..."
                                                : playlist.title}
                                        </h3>
                                        <p className="font-extralight text-xs md:text-sm text-gray-400 truncate">
                                            {playlist.artist}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
