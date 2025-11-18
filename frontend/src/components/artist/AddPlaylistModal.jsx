import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Search, Check } from "lucide-react";
import musicClient from "../../utils/musicClient.axios.js";

const AddPlaylistModal = ({ isOpen, onClose, onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [allSongs, setAllSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoadingSongs, setIsLoadingSongs] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            visibility: "public",
        },
    });

    // Fetch all available songs when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchAllSongs();
        }
    }, [isOpen]);

    const fetchAllSongs = async () => {
        setIsLoadingSongs(true);
        try {
            // Update this endpoint to match your API
            const response = await musicClient.get("/api/music/artist-musics", {
                withCredentials: true,
            });
            setAllSongs(response.data.musics || []);
        } catch (error) {
            console.error("Error fetching songs:", error);
            setError("submit", {
                type: "manual",
                message: "Failed to load songs. Please try again.",
            });
        } finally {
            setIsLoadingSongs(false);
        }
    };

    const toggleSongSelection = (songId) => {
        setSelectedSongs((prev) => {
            if (prev.includes(songId)) {
                return prev.filter((id) => id !== songId);
            } else {
                return [...prev, songId];
            }
        });
    };

    const filteredSongs = allSongs.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const response = await musicClient.post(
                "/api/music/playlist",
                {
                    title: data.title,
                    musics: selectedSongs,
                },
                {
                    withCredentials: true,
                }
            );

            reset();
            setSelectedSongs([]);
            setSearchQuery("");
            onClose();

            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (error) {
            console.error("Error creating playlist:", error);

            if (error.response?.data?.message) {
                setError("submit", {
                    type: "manual",
                    message: error.response.data.message,
                });
            } else {
                setError("submit", {
                    type: "manual",
                    message: "Failed to create playlist. Please try again.",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        reset();
        setSelectedSongs([]);
        setSearchQuery("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Add New Playlist</h3>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-all"
                        disabled={isSubmitting}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            {...register("title", {
                                required: "Title is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Title must be at least 3 characters",
                                },
                                maxLength: {
                                    value: 100,
                                    message:
                                        "Title must be less than 100 characters",
                                },
                            })}
                            placeholder="Enter playlist title"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            disabled={isSubmitting}
                        />
                        {errors.title && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Song Selection */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Select Songs ({selectedSongs.length} selected)
                        </label>

                        {/* Search Bar */}
                        <div className="relative mb-3">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search songs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Song List */}
                        <div className="bg-white/5 border border-white/10 rounded-lg max-h-64 overflow-y-auto">
                            {isLoadingSongs ? (
                                <div className="p-4 text-center text-gray-400">
                                    Loading songs...
                                </div>
                            ) : filteredSongs.length === 0 ? (
                                <div className="p-4 text-center text-gray-400">
                                    {searchQuery
                                        ? "No songs found"
                                        : "No songs available"}
                                </div>
                            ) : (
                                filteredSongs.map((song) => (
                                    <div
                                        key={song._id}
                                        onClick={() =>
                                            toggleSongSelection(song._id)
                                        }
                                        className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 transition-all"
                                    >
                                        {/* Checkbox */}
                                        <div
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                                selectedSongs.includes(song._id)
                                                    ? "bg-purple-500 border-purple-500"
                                                    : "border-white/20"
                                            }`}
                                        >
                                            {selectedSongs.includes(
                                                song._id
                                            ) && (
                                                <Check
                                                    size={14}
                                                    className="text-white"
                                                />
                                            )}
                                        </div>

                                        {/* Song Cover */}
                                        {song.coverImageUrl && (
                                            <img
                                                src={song.coverImageUrl}
                                                alt={song.title}
                                                className="w-10 h-10 rounded object-cover"
                                            />
                                        )}

                                        {/* Song Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium truncate">
                                                {song.title}
                                            </h4>
                                            <p className="text-sm text-gray-400 truncate">
                                                {song.artist ||
                                                    "Unknown Artist"}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <p className="text-red-400 text-sm">
                                {errors.submit.message}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            className="flex-1 px-4 py-3 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Playlist"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlaylistModal;
