import React, { useState, useRef, useEffect } from "react";
import {
    CircleUserRound,
    House,
    Music2,
    Podcast,
    Search,
    Menu,
    X,
    Component,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    // Random music ID generator (you'll replace this with real IDs later)
    const getRandomMusicId = () => {
        return Math.floor(Math.random() * 15); // Assuming you have 15 songs (0-14)
    };

    const navLinks = [
        { name: "Home", path: "/", icon: House },
        {
            name: "Random Picks",
            path: `/track/${getRandomMusicId()}`,
            icon: Music2,
            isRandom: true,
        },
        // Conditionally add artist link
        ...(user?.role === "artist"
            ? [
                  {
                      name: "Artist Mode",
                      path: "/artist/dashboard",
                      icon: Component,
                      isArtist: true,
                  },
              ]
            : []),
    ];

    useEffect(() => {
        if (window.scrollY > 100) {
            setIsVisible(false);
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY.current) {
                setIsVisible(true);
            } else if (
                currentScrollY > lastScrollY.current &&
                currentScrollY > 100
            ) {
                setIsVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMusicClick = (e, link) => {
        if (link.isRandom) {
            e.preventDefault();
            navigate(`/track/${getRandomMusicId()}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <nav
                className={`fixed  top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                {/* Main Navbar */}
                <div className="w-full bg-black/95 backdrop-blur-md">
                    <div className="mx-auto px-4 md:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-13 md:h-16">
                            {/* Left section */}
                            <div className="flex w-full items-center justify-start gap-8">
                                {/* Logo Section */}
                                <div className="flex items-center gap-3 cursor-pointer">
                                    <Podcast className="text-white sm:text-[#20D760] w-6 h-6 md:w-7 md:h-7 " />
                                    <span className="text-xl whitespace-nowrap md:text-2xl font-bold text-white hidden sm:block">
                                        Spotify-Sync
                                    </span>
                                </div>

                                {/* Desktop Navigation */}
                                <div className="hidden md:flex items-center gap-4">
                                    {navLinks.map((link) => (
                                        <NavLink
                                            key={link.path}
                                            to={link.path}
                                            onClick={(e) =>
                                                handleMusicClick(e, link)
                                            }
                                            className={({ isActive }) =>
                                                `flex items-center gap-2 px-4 whitespace-nowrap py-2 rounded-full transition-all duration-200 ${
                                                    isActive && !link.isRandom
                                                        ? "bg-[#282828] text-white"
                                                        : "text-[#b3b3b3] hover:text-white"
                                                }`
                                            }
                                        >
                                            <link.icon size={20} />
                                            <span className="font-medium">
                                                {link.name}
                                            </span>
                                        </NavLink>
                                    ))}
                                </div>
                            </div>

                            {/* Right section */}
                            <div className="flex w-full items-center justify-end gap-8">
                                {/* Search Bar - Desktop */}
                                <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                                    <div className="relative w-full">
                                        <Search
                                            size={18}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="What do you want to listen to?"
                                            className="w-full bg-[#242424] hover:bg-[#2a2a2a] rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* User Section - Desktop */}
                                <div className="hidden md:flex items-center gap-3">
                                    <button className="p-2 hover:bg-[#282828] rounded-full transition-all lg:hidden">
                                        <Search
                                            size={22}
                                            className="text-[#b3b3b3]"
                                        />
                                    </button>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#000000] hover:bg-[#282828] rounded-full transition-all cursor-pointer">
                                        <CircleUserRound
                                            size={24}
                                            className="text-white"
                                        />
                                        <p className="font-semibold capitalize text-white text-sm">
                                            {user.fullName.firstName}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-[#282828] transition-all"
                            >
                                {isMenuOpen ? (
                                    <X className="text-white w-6 h-6 md:w-7 md:h-7" />
                                ) : (
                                    <Menu className="text-white w-6 h-6 md:w-7 md:h-7" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden bg-black border-t border-[#282828] overflow-hidden transition-all duration-300 ${
                        isMenuOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-4 py-4 space-y-2">
                        {/* Mobile Search */}
                        <div className="relative mb-4">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b3b3b3]"
                            />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-[#242424] rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-white"
                            />
                        </div>

                        {/* Mobile Nav Links */}
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={(e) => {
                                    handleMusicClick(e, link);
                                    if (!link.isRandom) setIsMenuOpen(false);
                                }}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                        isActive && !link.isRandom
                                            ? "bg-[#282828] text-white"
                                            : "text-[#b3b3b3] hover:text-white hover:bg-[#282828]"
                                    }`
                                }
                            >
                                <link.icon size={22} />
                                <span className="font-medium">{link.name}</span>
                            </NavLink>
                        ))}

                        {/* Mobile User Section */}
                        <div className="flex items-center gap-3 px-4 py-3 bg-[#181818] rounded-lg mt-4">
                            <CircleUserRound size={24} className="text-white" />
                            <p className="font-semibold text-white">
                                Test User
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
