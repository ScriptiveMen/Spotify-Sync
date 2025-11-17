import React, { useState } from "react";
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

const ArtistDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [showAddModal, setShowAddModal] = useState(false);
    const [modalType, setModalType] = useState(""); // 'music' or 'playlist'
    const [hoveredItem, setHoveredItem] = useState(null);

    // Sample data - replace with real data from your backend
    const stats = {
        totalTracks: 24,
        totalPlaylists: 8,
        totalListeners: 12500,
        monthlyPlays: 45600,
    };

    const myTracks = [
        {
            _id: 1,
            title: "Midnight Dreams",
            plays: 12500,
            image: "/sample2.jpeg",
            duration: "3:45",
            status: "published",
        },
        {
            _id: 2,
            title: "Summer Vibes",
            plays: 8900,
            image: "/sample2.jpeg",
            duration: "4:20",
            status: "published",
        },
        {
            _id: 3,
            title: "Urban Nights",
            plays: 15600,
            image: "/sample2.jpeg",
            duration: "3:12",
            status: "published",
        },
        {
            _id: 4,
            title: "Acoustic Soul",
            plays: 6700,
            image: "/sample2.jpeg",
            duration: "5:00",
            status: "draft",
        },
        {
            _id: 5,
            title: "Electric Pulse",
            plays: 9200,
            image: "/sample2.jpeg",
            duration: "3:58",
            status: "published",
        },
    ];

    const myPlaylists = [
        {
            _id: 1,
            title: "Best of 2024",
            tracks: 15,
            image: "/sample.jpeg",
            visibility: "public",
        },
        {
            _id: 2,
            title: "Chill Sessions",
            tracks: 22,
            image: "/sample.jpeg",
            visibility: "public",
        },
        {
            _id: 3,
            title: "Workout Mix",
            tracks: 18,
            image: "/sample.jpeg",
            visibility: "private",
        },
        {
            _id: 4,
            title: "Late Night Vibes",
            tracks: 12,
            image: "/sample.jpeg",
            visibility: "public",
        },
    ];

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
                                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            } transition-all font-medium`}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-black">
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
                        gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
                    />
                    <StatCard
                        icon={ListMusic}
                        label="Total Playlists"
                        value={stats.totalPlaylists}
                        gradient="bg-gradient-to-br from-purple-500 to-pink-500"
                    />
                    <StatCard
                        icon={Users}
                        label="Listeners"
                        value={stats.totalListeners}
                        gradient="bg-gradient-to-br from-green-500 to-emerald-500"
                    />
                    <StatCard
                        icon={BarChart3}
                        label="Monthly Plays"
                        value={stats.monthlyPlays}
                        gradient="bg-gradient-to-br from-orange-500 to-red-500"
                    />
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-6 py-3 font-medium transition-all whitespace-nowrap ${
                            activeTab === "overview"
                                ? "text-blue-400 border-b-2 border-blue-400"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Overview
                    </button>
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
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                                    <Music className="w-6 h-6" />
                                </div>
                                <span>My Tracks</span>
                            </h2>
                            <button
                                onClick={() => {
                                    setModalType("music");
                                    setShowAddModal(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all font-medium"
                            >
                                <Plus size={20} />
                                <span className="hidden sm:inline">
                                    Add Track
                                </span>
                            </button>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
                            {myTracks.map((track, idx) => (
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
                                            src={track.image}
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
                                            {track.plays.toLocaleString()} plays
                                            • {track.duration}
                                        </p>
                                    </div>

                                    <span
                                        className={`hidden sm:inline px-3 py-1 rounded-full text-xs font-medium ${
                                            track.status === "published"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                        }`}
                                    >
                                        {track.status}
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
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                                    <ListMusic className="w-6 h-6" />
                                </div>
                                <span>My Playlists</span>
                            </h2>
                            <button
                                onClick={() => {
                                    setModalType("playlist");
                                    setShowAddModal(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-medium"
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
                                    className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-4">
                                        <img
                                            src={playlist.image}
                                            alt={playlist.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    playlist.visibility ===
                                                    "public"
                                                        ? "bg-green-500/80 text-white"
                                                        : "bg-gray-500/80 text-white"
                                                }`}
                                            >
                                                {playlist.visibility}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-lg mb-1 truncate">
                                        {playlist.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-3">
                                        {playlist.tracks} tracks
                                    </p>

                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm">
                                            <Eye size={16} />
                                            <span>View</span>
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm">
                                            <Edit2 size={16} />
                                            <span>Edit</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Overview Tab */}
                {activeTab === "overview" && (
                    <div className="space-y-8 mb-10">
                        {/* Recent Tracks */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Recent Tracks
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {myTracks.slice(0, 3).map((track) => (
                                    <div
                                        key={track._id}
                                        className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={track.image}
                                                alt={track.title}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold truncate">
                                                    {track.title}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    {track.plays.toLocaleString()}{" "}
                                                    plays
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Playlists */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Recent Playlists
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {myPlaylists.slice(0, 3).map((playlist) => (
                                    <div
                                        key={playlist._id}
                                        className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={playlist.image}
                                                alt={playlist.title}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold truncate">
                                                    {playlist.title}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    {playlist.tracks} tracks
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
