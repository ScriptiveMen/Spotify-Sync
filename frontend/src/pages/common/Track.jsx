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
    MoreHorizontal,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import musicClient from "../../utils/musicClient.axios.js";

const Track = () => {
    const audioRef = useRef(null);
    const imageRef = useRef(null);
    const navigate = useNavigate();
    const isUnmountingRef = useRef(false);

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
    const [musicData, setMusicData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();

    const generateGradient = () => {
        const colors = [
            { primary: "#6b21a8", secondary: "#1f2937" }, // Purple
            { primary: "#1e40af", secondary: "#1f2937" }, // Blue
            { primary: "#b91c1c", secondary: "#1f2937" }, // Red
            { primary: "#059669", secondary: "#1f2937" }, // Green
            { primary: "#d97706", secondary: "#1f2937" }, // Orange
            { primary: "#7c2d12", secondary: "#1f2937" }, // Brown
            { primary: "#0891b2", secondary: "#1f2937" }, // Cyan
            { primary: "#c026d3", secondary: "#1f2937" }, // Magenta
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // Fetch music data
    useEffect(() => {
        const getMusic = async () => {
            try {
                const res = await musicClient.get(
                    `/api/music/playlist/get-details/${params.id}`,
                    { withCredentials: true }
                );

                setMusicData({
                    id: res.data.music._id,
                    title: res.data.music.title,
                    artist: res.data.music.artist,
                    image: res.data.music.coverImageUrl,
                    audioUrl: res.data.music.musicUrl,
                });

                setGradientColors(generateGradient());
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching music:", error);
                setIsLoading(false);
            }
        };

        getMusic();
    }, [params.id]);

    // audio element
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !musicData.audioUrl) return;

        // Set initial volume
        audio.volume = volume / 100;
        audio.playbackRate = playbackSpeed;

        const handleCanPlay = () => {
            if (!isUnmountingRef.current) {
                audio
                    .play()
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((err) => {
                        console.log("Autoplay blocked:", err);
                        setIsPlaying(false);
                    });
            }
        };

        const handlePlay = () => {
            if (!isUnmountingRef.current) {
                setIsPlaying(true);
            }
        };

        const handlePause = () => {
            if (!isUnmountingRef.current) {
                setIsPlaying(false);
            }
        };

        const handleEnded = () => {
            if (!isUnmountingRef.current) {
                if (isRepeat) {
                    audio.currentTime = 0;
                    audio
                        .play()
                        .catch((err) => console.log("Replay failed:", err));
                } else {
                    setIsPlaying(false);
                }
            }
        };

        audio.addEventListener("canplay", handleCanPlay);
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("canplay", handleCanPlay);
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [musicData.audioUrl, volume, playbackSpeed, isRepeat]);

    useEffect(() => {
        return () => {
            isUnmountingRef.current = true;
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio
                .play()
                .then(() => setIsPlaying(true))
                .catch((err) => {
                    console.log("Play failed:", err);
                    setIsPlaying(false);
                });
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    // time update
    const handleTimeUpdate = () => {
        if (audioRef.current && !isUnmountingRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Handle loaded metadata
    const handleLoadedMetadata = () => {
        if (audioRef.current && !isUnmountingRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
        if (newVolume > 0) setIsMuted(false);
    };

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

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleBack = () => {
        isUnmountingRef.current = true;
        if (audioRef.current) {
            audioRef.current.pause();
        }
        navigate("/");
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col text-white"
            style={{
                background: `linear-gradient(to bottom, ${gradientColors.primary}, ${gradientColors.secondary}, #000000)`,
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 shrink-0">
                <button
                    onClick={handleBack}
                    className="p-1 hover:bg-white/10 rounded-full transition"
                >
                    <ChevronDown size={24} />
                </button>
                <h2 className="text-xs sm:text-sm text-gray-300 font-semibold">
                    Playing from {musicData.album || "Trending Songs"}
                </h2>
                <button className="p-1 hover:bg-white/10 rounded-full transition">
                    <MoreHorizontal size={24} />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-y-auto pb-4">
                <div className="w-full max-w-2xl">
                    {/* Album Art */}
                    <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto aspect-square mb-6 sm:mb-8 rounded-lg shadow-2xl overflow-hidden">
                        <img
                            ref={imageRef}
                            src={musicData.image}
                            alt={musicData.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Song Info */}
                    <div className="mb-6 sm:mb-8">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 truncate">
                                    {musicData.title}
                                </h1>
                                <p className="text-sm sm:text-base text-gray-300 truncate">
                                    {musicData.artist}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="hover:scale-110 transition mt-1"
                            >
                                <Heart
                                    size={26}
                                    className={
                                        isLiked
                                            ? "fill-[#1ed760] text-[#1ed760]"
                                            : "text-gray-400"
                                    }
                                />
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6 sm:mb-8">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={(currentTime / duration) * 100 || 0}
                            onChange={handleSeek}
                            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs sm:text-sm text-gray-400 mt-2">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Main Controls */}
                    <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                        <button
                            onClick={() => setIsShuffle(!isShuffle)}
                            className={`hover:scale-110 transition hidden sm:block ${
                                isShuffle ? "text-[#1ed760]" : "text-gray-400"
                            }`}
                        >
                            <Shuffle size={20} />
                        </button>

                        <button className="hover:scale-110 transition">
                            <SkipBack size={28} />
                        </button>

                        <button
                            onClick={togglePlayPause}
                            className="bg-white text-black rounded-full p-3 sm:p-4 hover:scale-105 transition"
                        >
                            {isPlaying ? (
                                <Pause size={28} />
                            ) : (
                                <Play size={28} className="ml-0.5" />
                            )}
                        </button>

                        <button className="hover:scale-110 transition">
                            <SkipForward size={28} />
                        </button>

                        <button
                            onClick={() => setIsRepeat(!isRepeat)}
                            className={`hover:scale-110 transition hidden sm:block ${
                                isRepeat ? "text-[#1ed760]" : "text-gray-400"
                            }`}
                        >
                            <Repeat size={20} />
                        </button>
                    </div>

                    {/* Mobile Secondary Controls */}
                    <div className="flex items-center justify-center gap-8 mb-6 sm:hidden">
                        <button
                            onClick={() => setIsShuffle(!isShuffle)}
                            className={`hover:scale-110 transition ${
                                isShuffle ? "text-[#1ed760]" : "text-gray-400"
                            }`}
                        >
                            <Shuffle size={20} />
                        </button>
                        <button
                            onClick={changeSpeed}
                            className="px-3 py-1 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-sm transition"
                        >
                            {playbackSpeed}x
                        </button>
                        <button
                            onClick={() => setIsRepeat(!isRepeat)}
                            className={`hover:scale-110 transition ${
                                isRepeat ? "text-[#1ed760]" : "text-gray-400"
                            }`}
                        >
                            <Repeat size={20} />
                        </button>
                    </div>

                    {/* Volume Control - Desktop */}
                    <div className="hidden sm:flex items-center justify-center gap-3 max-w-md mx-auto">
                        <button
                            onClick={changeSpeed}
                            className="px-3 py-1 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-sm transition"
                        >
                            {playbackSpeed}x
                        </button>
                        <button
                            onClick={toggleMute}
                            className="hover:scale-110 transition text-gray-400"
                        >
                            {isMuted || volume === 0 ? (
                                <VolumeX size={20} />
                            ) : (
                                <Volume2 size={20} />
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                    </div>

                    {/* Volume Control - Mobile */}
                    <div className="flex sm:hidden items-center justify-center gap-3">
                        <button
                            onClick={toggleMute}
                            className="hover:scale-110 transition text-gray-400"
                        >
                            {isMuted || volume === 0 ? (
                                <VolumeX size={20} />
                            ) : (
                                <Volume2 size={20} />
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="flex-1 max-w-xs h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                    </div>
                </div>
            </div>

            {/* Audio Element */}
            <audio
                ref={audioRef}
                src={musicData.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
        </div>
    );
};

export default Track;
