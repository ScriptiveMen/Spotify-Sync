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
    const [isVisible, setIsVisible] = useState(false);
    const [musicData, setMusicData] = useState({});

    const params = useParams();

    // Generate random vibrant gradient colors for variety
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

    useEffect(() => {
        const getMusic = async () => {
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

            // Set a random vibrant gradient for each song
            setGradientColors(generateGradient());
        };

        getMusic();
    }, [params.id]);

    // Mount animation - slide up on mount
    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

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

    return (
        <div
            className={`fixed inset-0 z-50 transition-transform duration-200 ease-out flex flex-col text-white ${
                isVisible ? "translate-y-0" : "translate-y-full"
            }`}
            style={{
                background: `linear-gradient(to bottom, ${gradientColors.primary}, ${gradientColors.secondary}, #000000)`,
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 shrink-0">
                <button
                    onClick={() => navigate("/")}
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
                onEnded={() => setIsPlaying(false)}
            />

            {/* Slider Styles */}
            <style>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .slider:hover::-webkit-slider-thumb {
                    width: 14px;
                    height: 14px;
                }

                .slider::-moz-range-thumb {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    border: none;
                    transition: all 0.2s;
                }

                .slider:hover::-moz-range-thumb {
                    width: 14px;
                    height: 14px;
                }
            `}</style>
        </div>
    );
};

export default Track;
