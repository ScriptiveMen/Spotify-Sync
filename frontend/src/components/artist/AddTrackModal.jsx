import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Upload } from "lucide-react";
import musicClient from "../../utils/musicClient.axios.js";

const AddTrackModal = ({ isOpen, onClose, onSuccess }) => {
    const [audioFile, setAudioFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [audioPreview, setAudioPreview] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm();

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (50MB max)
            if (file.size > 50 * 1024 * 1024) {
                setError("audio", {
                    type: "manual",
                    message: "Audio file must be less than 50MB",
                });
                return;
            }
            setAudioFile(file);
            setAudioPreview(file.name);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                setError("coverImage", {
                    type: "manual",
                    message: "Image file must be less than 5MB",
                });
                return;
            }
            setCoverImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        // Validate files are selected
        if (!audioFile) {
            setError("audio", {
                type: "manual",
                message: "Audio file is required",
            });
            return;
        }

        if (!coverImage) {
            setError("coverImage", {
                type: "manual",
                message: "Cover image is required",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Create FormData object for Multer - SAME AS POSTMAN
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("music", audioFile);
            formData.append("coverImage", coverImage);

            console.log(formData);

            const response = await musicClient.post(
                "/api/music/upload",
                formData,
                {
                    withCredentials: true,
                }
            );

            resetForm();
            onClose();
            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (error) {
            console.error("Error uploading track:", error);

            if (error.response?.data?.message) {
                setError("submit", {
                    type: "manual",
                    message: error.response.data.message,
                });
            } else {
                setError("submit", {
                    type: "manual",
                    message: "Failed to upload track. Please try again.",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        reset();
        setAudioFile(null);
        setCoverImage(null);
        setAudioPreview("");
        setImagePreview("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Add New Track</h3>
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
                                    value: 2,
                                    message:
                                        "Title must be at least 2 characters",
                                },
                                maxLength: {
                                    value: 100,
                                    message:
                                        "Title must be less than 100 characters",
                                },
                            })}
                            placeholder="Enter track title"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            disabled={isSubmitting}
                        />
                        {errors.title && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Audio Upload */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Upload Audio *
                        </label>
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500 transition-all cursor-pointer">
                            <input
                                type="file"
                                accept="audio/mpeg,audio/wav,audio/flac,audio/mp3"
                                onChange={handleAudioChange}
                                className="hidden"
                                id="audio-upload"
                                disabled={isSubmitting}
                            />
                            <label
                                htmlFor="audio-upload"
                                className="cursor-pointer block"
                            >
                                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm text-gray-400">
                                    {audioPreview ||
                                        "Click to upload or drag and drop"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    MP3, WAV, FLAC up to 50MB
                                </p>
                            </label>
                        </div>
                        {errors.audio && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.audio.message}
                            </p>
                        )}
                    </div>

                    {/* Cover Image Upload */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Cover Image *
                        </label>
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500 transition-all cursor-pointer">
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                                disabled={isSubmitting}
                            />
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer block"
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-24 h-24 mx-auto mb-2 rounded-lg object-cover"
                                    />
                                ) : (
                                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                )}
                                <p className="text-sm text-gray-400">
                                    {imagePreview
                                        ? "Click to change image"
                                        : "Upload cover image"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    JPG, PNG, WEBP up to 5MB
                                </p>
                            </label>
                        </div>
                        {errors.coverImage && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.coverImage.message}
                            </p>
                        )}
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
                            className="flex-1 px-4 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Uploading..." : "Create Track"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTrackModal;
