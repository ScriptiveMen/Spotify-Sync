import React, { useEffect, useState } from "react";
import {
    Music,
    ListMusic,
    Plus,
    Edit2,
    Trash2,
    Eye,
    BarChart3,
    Users,
    Play,
} from "lucide-react";
import musicClient from "../../utils/musicClient.axios.js";
import StatCard from "../../components/artist/StatCard.jsx";
import AddTrackModal from "../../components/artist/AddTrackModal.jsx";
import AddPlaylistModal from "../../components/artist/AddPlaylistModal.jsx";

const ArtistDashboard = () => {
    const [activeTab, setActiveTab] = useState("tracks");
    const [showTrackModal, setShowTrackModal] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [myTracks, setMyTracks] = useState([]);
    const [myPlaylists, setMyPlaylists] = useState([]);

    const stats = {
        totalTracks: `${myTracks.length}`,
        totalPlaylists: 8,
        totalListeners: 12500,
        monthlyPlays: 45600,
    };

    async function getArtistTracks() {
        try {
            const res = await musicClient.get("/api/music/artist-musics", {
                withCredentials: true,
            });
            setMyTracks(res.data.musics);
        } catch (error) {
            console.error("Error fetching tracks:", error);
        }
    }

    async function getArtistPlaylists() {
        try {
            const res = await musicClient.get("/api/music/playlist", {
                withCredentials: true,
            });
            setMyPlaylists(res.data.playlist);
        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
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
                                onClick={() => setShowTrackModal(true)} // Open track modal
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all font-medium"
                            >
                                <Plus size={20} />
                                <span className="hidden sm:inline">
                                    Add Track
                                </span>
                            </button>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
                            {myTracks.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    No tracks yet. Add your first track!
                                </div>
                            ) : (
                                myTracks.map((track) => (
                                    <div
                                        key={track._id}
                                        className="flex items-center gap-4 p-4 hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                                        onMouseEnter={() =>
                                            setHoveredItem(track._id)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredItem(null)
                                        }
                                    >
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                            <img
                                                src={track.coverImageUrl}
                                                alt={track.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {hoveredItem === track._id && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <Play
                                                        size={20}
                                                        fill="white"
                                                    />
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
                                                plays •{" "}
                                                {track.duration || "3:45"}
                                            </p>
                                        </div>

                                        <span className="hidden bg-green-500/20 text-green-400 sm:inline px-3 py-1 rounded-full text-xs font-medium">
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
                                ))
                            )}
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
                                onClick={() => setShowPlaylistModal(true)} // Open playlist modal
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all font-medium"
                            >
                                <Plus size={20} />
                                <span className="hidden sm:inline">
                                    Add Playlist
                                </span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {myPlaylists.length === 0 ? (
                                <div className="col-span-full text-center py-12 text-gray-400">
                                    No playlists yet. Create your first
                                    playlist!
                                </div>
                            ) : (
                                myPlaylists.map((playlist) => (
                                    <div
                                        key={playlist._id}
                                        className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer border border-white/10"
                                    >
                                        <h3 className="font-semibold text-xl mb-2 truncate">
                                            {playlist.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-5">
                                            {playlist.musics?.length || 0}{" "}
                                            tracks
                                        </p>

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

                                        <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100">
                                            <Trash2
                                                size={16}
                                                className="text-red-400"
                                            />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AddTrackModal
                isOpen={showTrackModal}
                onClose={() => setShowTrackModal(false)}
                onSuccess={() => {
                    getArtistTracks();
                }}
            />
            <AddPlaylistModal
                isOpen={showPlaylistModal}
                onClose={() => setShowPlaylistModal(false)}
                onSuccess={() => {
                    getArtistPlaylists();
                }}
            />
        </div>
    );
};

export default ArtistDashboard;
