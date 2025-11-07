import React, { useState } from "react";
import { Podcast, User, Mic } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [accountType, setAccountType] = useState("user");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const submitHandler = (data) => {
        const formattedData = {
            email: data.email,
            fullName: {
                firstName: data.firstName,
                lastName: data.lastName,
            },
            password: data.password,
            role: accountType,
        };

        console.log(formattedData);
        reset();
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10">
            <Podcast size={40} className="text-[#20D760]" />

            <h1 className="py-2 text-4xl sm:text-5xl text-center lg:text-6xl font-bold">
                Sign up to <br /> start listening
            </h1>

            <div className="w-full pt-7 max-w-md flex flex-col items-center">
                <div className="w-full mb-6">
                    <label className="font-semibold text-base block mb-3 text-center">
                        Choose Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={() => setAccountType("user")}
                            className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-lg border-2 transition-all ${
                                accountType === "user"
                                    ? "border-[#20D760] bg-[#20D760]/10"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <User
                                size={32}
                                className={`mb-2 ${
                                    accountType === "user"
                                        ? "text-[#20D760]"
                                        : "text-gray-600"
                                }`}
                            />
                            <span className="font-semibold text-sm sm:text-base">
                                User
                            </span>
                            <span className="text-xs text-gray-500 mt-1 text-center">
                                Listen to Albums
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setAccountType("artist")}
                            className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-lg border-2 transition-all ${
                                accountType === "artist"
                                    ? "border-[#20D760] bg-[#20D760]/10"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <Mic
                                size={32}
                                className={`mb-2 ${
                                    accountType === "artist"
                                        ? "text-[#20D760]"
                                        : "text-gray-600"
                                }`}
                            />
                            <span className="font-semibold text-sm sm:text-base">
                                Artist
                            </span>
                            <span className="text-xs text-gray-500 mt-1 text-center">
                                Create Albums
                            </span>
                        </button>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="flex flex-col items-center justify-center rounded-lg w-full"
                >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-5 w-full">
                        <div className="flex-1">
                            <label
                                className="font-semibold text-sm sm:text-base"
                                htmlFor="firstName"
                            >
                                First Name
                            </label>
                            <input
                                {...register("firstName", {
                                    required: "First name is required.",
                                })}
                                type="text"
                                name="firstName"
                                className={`border outline-none p-3 sm:p-3.5 w-full rounded mt-1 ${
                                    errors.firstName
                                        ? "border-red-500"
                                        : "border-white"
                                }`}
                            />

                            {errors.firstName && (
                                <small className="text-red-500 text-xs">
                                    {errors.firstName.message}
                                </small>
                            )}
                        </div>
                        <div className="flex-1">
                            <label
                                className="font-semibold text-sm sm:text-base"
                                htmlFor="lastName"
                            >
                                Last Name
                            </label>
                            <input
                                {...register("lastName", {
                                    required: "Last name is required.",
                                })}
                                type="text"
                                name="lastName"
                                className={`border outline-none p-3 sm:p-3.5 w-full rounded mt-1 ${
                                    errors.lastName
                                        ? "border-red-500"
                                        : "border-white"
                                }`}
                            />

                            {errors.lastName && (
                                <small className="text-red-500 text-xs">
                                    {errors.lastName.message}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label
                            className="font-semibold text-sm sm:text-base"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address.",
                                },
                            })}
                            type="text"
                            name="email"
                            className={`border outline-none p-3 sm:p-3.5 w-full rounded ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.email && (
                            <small className="text-red-500 text-xs">
                                {errors.email.message}
                            </small>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 w-full mt-5">
                        <label
                            className="font-semibold text-sm sm:text-base"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required.",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters.",
                                },
                            })}
                            type="password"
                            name="password"
                            className={`border outline-none p-3 sm:p-3.5 w-full rounded ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-white"
                            }`}
                        />

                        {errors.password && (
                            <small className="text-red-500 text-xs">
                                {errors.password.message}
                            </small>
                        )}
                    </div>

                    <button className="bg-[#20D760] hover:bg-[#3BE477] transition hover:scale-105 cursor-pointer text-base sm:text-lg font-semibold mt-6 text-black w-full rounded-full p-3 sm:p-3.5">
                        Continue
                    </button>
                </form>

                <h3 className="my-4 text-base sm:text-lg">or</h3>

                <div className="flex items-center justify-center gap-3 sm:gap-5 border rounded-full w-full py-3 cursor-pointer hover:bg-gray-50 hover:text-black transition mb-6 sm:mb-10">
                    <img
                        className="h-5 sm:h-6"
                        src="/google.svg"
                        alt="Google"
                    />
                    <p className="font-semibold text-sm sm:text-base">
                        Continue with Google
                    </p>
                </div>

                <h3 className="my-3 text-gray-400 text-sm sm:text-base">
                    Already have an account?
                </h3>
                <p
                    onClick={() => navigate("/signin")}
                    className="font-semibold cursor-pointer text-sm sm:text-base hover:text-[#20D760] transition"
                >
                    Sign In
                </p>
            </div>
        </div>
    );
};

export default SignUp;
