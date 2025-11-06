import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Repeat,
    Shuffle,
    Heart,
    ChevronDown,
} from "lucide-react";

const Track = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const imageRef = useRef(null);

    // States
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [gradientColors, setGradientColors] = useState({
        primary: "#6b21a8",
        secondary: "#1f2937",
    });

    // Dummy music data
    const musicData = {
        id: id,
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        album: "Aashiqui 2",
        image: "/sahiba-banner.jpeg",
        audioUrl: "/Sahiba(KoshalWorld.Com).mp3",
    };

    // Extract colors from image
    useEffect(() => {
        const extractColors = () => {
            const img = imageRef.current;
            if (!img) return;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            try {
                const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const pixels = imageData.data;

                // Sample colors from different parts of the image
                const colorCounts = {};
                const step = 10; // Sample every 10th pixel for performance

                for (let i = 0; i < pixels.length; i += 4 * step) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const a = pixels[i + 3];

                    // Skip transparent or very dark/light pixels
                    if (a < 128 || r + g + b < 50 || r + g + b > 700) continue;

                    // Round colors to reduce unique values
                    const roundedR = Math.round(r / 30) * 30;
                    const roundedG = Math.round(g / 30) * 30;
                    const roundedB = Math.round(b / 30) * 30;

                    const colorKey = `${roundedR},${roundedG},${roundedB}`;
                    colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
                }

                // Get top 2 colors
                const sortedColors = Object.entries(colorCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 2);

                if (sortedColors.length > 0) {
                    const [r1, g1, b1] = sortedColors[0][0]
                        .split(",")
                        .map(Number);
                    const primaryColor = `rgb(${r1}, ${g1}, ${b1})`;

                    let secondaryColor = "#1f2937"; // Default dark color
                    if (sortedColors.length > 1) {
                        const [r2, g2, b2] = sortedColors[1][0]
                            .split(",")
                            .map(Number);
                        // Darken the secondary color
                        secondaryColor = `rgb(${Math.floor(
                            r2 * 0.3
                        )}, ${Math.floor(g2 * 0.3)}, ${Math.floor(b2 * 0.3)})`;
                    }

                    setGradientColors({
                        primary: primaryColor,
                        secondary: secondaryColor,
                    });
                }
            } catch (error) {
                console.log(
                    "Could not extract colors from image (CORS or other issue)",
                    error
                );
            }
        };

        const img = imageRef.current;
        if (img && img.complete) {
            extractColors();
        }
    }, [musicData.image]);

    // Play/Pause toggle
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Handle time update
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Handle loaded metadata
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Seek to position
    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    // Volume control
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
        if (newVolume > 0) setIsMuted(false);
    };

    // Toggle mute
    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.volume = volume / 100;
                setIsMuted(false);
            } else {
                audioRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    // Change playback speed
    const changeSpeed = () => {
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        const newSpeed = speeds[nextIndex];
        setPlaybackSpeed(newSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = newSpeed;
        }
    };

    // Format time
    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    // Close player and go back
    const handleClose = () => {
        navigate("/");
    };

    return (
        <div
            className="fixed inset-0 z-50 animate-slide-up transition-colors duration-700"
            style={{
                background: `linear-gradient(to bottom, ${gradientColors.primary}, ${gradientColors.secondary}, #000000)`,
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-5">
                <button
                    onClick={handleClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-all"
                >
                    <ChevronDown size={28} />
                </button>
                <h2 className="text-sm text-gray-400 invert-100">
                    Playing Now
                </h2>
                <div className="w-10"></div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center px-8 mt-10">
                {/* Album Art */}
                <div className="w-80 h-80 md:w-96 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        ref={imageRef}
                        src={musicData.image}
                        alt={musicData.title}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        onLoad={() => {
                            const img = imageRef.current;
                            if (!img) return;

                            const canvas = document.createElement("canvas");
                            const ctx = canvas.getContext("2d");
                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx.drawImage(img, 0, 0, img.width, img.height);

                            try {
                                const imageData = ctx.getImageData(
                                    0,
                                    0,
                                    canvas.width,
                                    canvas.height
                                );
                                const pixels = imageData.data;
                                const colorCounts = {};
                                const step = 10;

                                for (
                                    let i = 0;
                                    i < pixels.length;
                                    i += 4 * step
                                ) {
                                    const r = pixels[i];
                                    const g = pixels[i + 1];
                                    const b = pixels[i + 2];
                                    const a = pixels[i + 3];

                                    if (
                                        a < 128 ||
                                        r + g + b < 50 ||
                                        r + g + b > 700
                                    )
                                        continue;

                                    const roundedR = Math.round(r / 30) * 30;
                                    const roundedG = Math.round(g / 30) * 30;
                                    const roundedB = Math.round(b / 30) * 30;

                                    const colorKey = `${roundedR},${roundedG},${roundedB}`;
                                    colorCounts[colorKey] =
                                        (colorCounts[colorKey] || 0) + 1;
                                }

                                const sortedColors = Object.entries(colorCounts)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 2);

                                if (sortedColors.length > 0) {
                                    const [r1, g1, b1] = sortedColors[0][0]
                                        .split(",")
                                        .map(Number);
                                    const primaryColor = `rgb(${r1}, ${g1}, ${b1})`;

                                    let secondaryColor = "#1f2937";
                                    if (sortedColors.length > 1) {
                                        const [r2, g2, b2] = sortedColors[1][0]
                                            .split(",")
                                            .map(Number);
                                        secondaryColor = `rgb(${Math.floor(
                                            r2 * 0.3
                                        )}, ${Math.floor(
                                            g2 * 0.3
                                        )}, ${Math.floor(b2 * 0.3)})`;
                                    }

                                    setGradientColors({
                                        primary: primaryColor,
                                        secondary: secondaryColor,
                                    });
                                }
                            } catch (error) {
                                console.log("Could not extract colors", error);
                            }
                        }}
                    />
                </div>

                {/* Song Info */}
                <div className="text-center mb-8 w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-2">
                        {musicData.title}
                    </h1>
                    <p className="text-gray-400 text-lg">{musicData.artist}</p>
                    <p className="text-gray-500 text-sm mt-1">
                        {musicData.album}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md mb-4">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={(currentTime / duration) * 100 || 0}
                        onChange={handleSeek}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center gap-8 mb-6">
                    <button
                        onClick={() => setIsShuffle(!isShuffle)}
                        className={`hover:scale-110 transition-transform ${
                            isShuffle ? "text-purple-500" : "text-gray-400"
                        }`}
                    >
                        <Shuffle size={20} />
                    </button>

                    <button className="hover:scale-110 transition-transform">
                        <SkipBack size={32} />
                    </button>

                    <button
                        onClick={togglePlayPause}
                        className="bg-white text-black rounded-full p-4 hover:scale-110 transition-transform"
                    >
                        {isPlaying ? (
                            <Pause size={32} />
                        ) : (
                            <Play size={32} className="ml-1" />
                        )}
                    </button>

                    <button className="hover:scale-110 transition-transform">
                        <SkipForward size={32} />
                    </button>

                    <button
                        onClick={() => setIsRepeat(!isRepeat)}
                        className={`hover:scale-110 transition-transform ${
                            isRepeat ? "text-purple-500" : "text-gray-400"
                        }`}
                    >
                        <Repeat size={20} />
                    </button>
                </div>

                {/* Secondary Controls - Moved to bottom */}
                <div className="fixed bottom-8 lg:bottom-3 left-0 right-0 px-8">
                    <div className="flex items-center justify-between w-full max-w-md mx-auto">
                        {/* Like Button */}
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className="hover:scale-110 transition-transform"
                        >
                            <Heart
                                size={24}
                                className={
                                    isLiked
                                        ? "fill-red-500 text-red-500"
                                        : "text-gray-400"
                                }
                            />
                        </button>

                        {/* Speed Control */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Speed</span>
                            <button
                                onClick={changeSpeed}
                                className="px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors"
                            >
                                {playbackSpeed}x
                            </button>
                        </div>

                        {/* Volume Control */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleMute}
                                className="hover:scale-110 transition-transform"
                            >
                                {isMuted || volume === 0 ? (
                                    <VolumeX size={24} />
                                ) : (
                                    <Volume2 size={24} />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <audio
                ref={audioRef}
                src={musicData.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
};

export default Track;
