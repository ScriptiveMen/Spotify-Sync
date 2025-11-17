import React, { useEffect, useState } from "react";
import {
    Music,
    ListMusic,
    Plus,
    Edit2,
    Trash2,
    Eye,
    Upload,
    BarChart3,
    Users,
    Play,
    MoreVertical,
    X,
} from "lucide-react";
import musicClient from "../../utils/musicClient.axios.js";

const ArtistDashboard = () => {
    const [activeTab, setActiveTab] = useState("tracks");
    const [showAddModal, setShowAddModal] = useState(false);
    const [modalType, setModalType] = useState(""); // 'music' or 'playlist'
    const [hoveredItem, setHoveredItem] = useState(null);
    const [myTracks, setMyTracks] = useState([]);
    const [myPlaylists, setMyPlaylists] = useState([]);

    // Sample data - replace with real data from your backend
    const stats = {
        totalTracks: `${myTracks.length}`,
        totalPlaylists: 8,
        totalListeners: 12500,
        monthlyPlays: 45600,
    };

    const StatCard = ({ icon: Icon, label, value, gradient }) => (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm mb-1">{label}</p>
                    <h3 className="text-2xl md:text-3xl font-bold">
                        {value.toLocaleString()}
                    </h3>
                </div>
                <div className={`p-3 ${gradient} rounded-lg`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );

    const AddModal = () => (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">
                        Add New {modalType === "music" ? "Track" : "Playlist"}
                    </h3>
                    <button
                        onClick={() => setShowAddModal(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            placeholder={`Enter ${modalType} title`}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {modalType === "music" && (
                        <>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Upload Audio
                                </label>
                                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500 transition-all cursor-pointer">
                                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                    <p className="text-sm text-gray-400">
                                        Click to upload or drag and drop
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Cover Image
                                </label>
                                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500 transition-all cursor-pointer">
                                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                    <p className="text-sm text-gray-400">
                                        Upload cover image
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {modalType === "playlist" && (
                        <>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Describe your playlist"
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">
                                    Visibility
                                </label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                // Handle submit logic here
                                setShowAddModal(false);
                            }}
                            className={`flex-1 px-4 py-3 rounded-lg ${
                                modalType === "music"
                                    ? "bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                                    : "bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            } transition-all font-medium`}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    async function getArtistTracks() {
        const res = await musicClient.get("/api/music/artist-musics", {
            withCredentials: true,
        });

        setMyTracks(res.data.musics);
    }

    async function getArtistPlaylists() {
        const res = await musicClient.get("/api/music/playlist", {
            withCredentials: true,
        });

        setMyPlaylists(res.data.playlist);
    }

    useEffect(() => {
        getArtistTracks();
        getArtistPlaylists();
    }, []);

    return (
        <div className="min-h-screen w-full bg-linear-to-b from-gray-900 via-black to-black">
            <div className="w-full min-h-screen px-4 md:px-8 lg:px-12 pt-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-[#20D760]">
                        Artist Dashboard
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Manage your music, playlists, and track your performance
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={Music}
                        label="Total Tracks"
                        value={stats.totalTracks}
                        gradient="bg-linear-to-br from-blue-500 to-cyan-500"
                    />
                    <StatCard
                        icon={ListMusic}
                        label="Total Playlists"
                        value={myPlaylists.length}
                        gradient="bg-linear-to-br from-purple-500 to-pink-500"
                    />
                    <StatCard
                        icon={Users}
                        label="Listeners"
                        value={stats.totalListeners}
                        gradient="bg-linear-to-br from-green-500 to-emerald-500"
                    />
                    <StatCard
                        icon={BarChart3}
                        label="Monthly Plays"
                        value={stats.monthlyPlays}
                        gradient="bg-linear-to-br from-orange-500 to-red-500"
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("tracks")}
                        className={`px-6 py-3 font-medium transition-all whitespace-nowrap ${
                            activeTab === "tracks"
                                ? "text-blue-400 border-b-2 border-blue-400"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        My Tracks
                    </button>
                    <button
                        onClick={() => setActiveTab("playlists")}
                        className={`px-6 py-3 font-medium transition-all whitespace-nowrap ${
                            activeTab === "playlists"
                                ? "text-blue-400 border-b-2 border-blue-400"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        My Playlists
                    </button>
                </div>

                {/* My Tracks Section */}
                {activeTab === "tracks" && (
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
                                <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg">
                                    <Music className="w-6 h-6" />
                                </div>
                                <span>My Tracks</span>
                            </h2>
                            <button
                                onClick={() => {
                                    setModalType("music");
                                    setShowAddModal(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all font-medium"
                            >
                                <Plus size={20} />
                                <span className="hidden sm:inline">
                                    Add Track
                                </span>
                            </button>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
                            {myTracks.map((track) => (
                                <div
                                    key={track._id}
                                    className="flex items-center gap-4 p-4 hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                                    onMouseEnter={() =>
                                        setHoveredItem(track._id)
                                    }
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
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
                                            {(
                                                track.plays || 1000
                                            ).toLocaleString()}{" "}
                                            plays • {track.duration || "3:45"}
                                        </p>
                                    </div>

                                    <span
                                        className={`hidden bg-green-500/20 text-green-400 sm:inline px-3 py-1 rounded-full text-xs font-medium`}
                                    >
                                        Published
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded-full transition-all">
                                            <Edit2
                                                size={18}
                                                className="text-blue-400"
                                            />
                                        </button>
                                        <button className="p-2 hover:bg-white/10 rounded-full transition-all">
                                            <Trash2
                                                size={18}
                                                className="text-red-400"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* My Playlists Section */}
                {activeTab === "playlists" && (
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold">
                                <div className="p-2 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg">
                                    <ListMusic className="w-6 h-6" />
                                </div>
                                <span>My Playlists</span>
                            </h2>
                            <button
                                onClick={() => {
                                    setModalType("playlist");
                                    setShowAddModal(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-medium"
                            >
                                <Plus size={20} />
                                <span className="hidden sm:inline">
                                    Add Playlist
                                </span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {myPlaylists.map((playlist) => (
                                <div
                                    key={playlist._id}
                                    className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer border border-white/10"
                                >
                                    {/* Playlist Info */}
                                    <h3 className="font-semibold text-xl mb-2 truncate">
                                        {playlist.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-5">
                                        {playlist.musics?.length || 0} tracks
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm font-medium">
                                            <Eye size={16} />
                                            <span>View</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm font-medium">
                                            <Edit2 size={16} />
                                            <span>Edit</span>
                                        </button>
                                    </div>

                                    {/* Delete Button - Top Right */}
                                    <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100">
                                        <Trash2
                                            size={16}
                                            className="text-red-400"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {showAddModal && <AddModal />}
        </div>
    );
};

export default ArtistDashboard;
