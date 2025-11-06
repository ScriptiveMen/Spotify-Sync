import React from "react";
import { useForm } from "react-hook-form";
import { Podcast } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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
        };

        console.log(formattedData);
        reset();
    };

    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col items-center justify-center px-5">
            <Podcast size={40} className="text-[#20D760]" />

            <h1 className="py-2 text-5xl text-center lg:text-6xl font-bold">
                Sign up to <br /> start listening
            </h1>

            <div className="w-full pt-7 max-w-md flex flex-col items-center">
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="flex flex-col items-center justify-center rounded-lg w-full"
                >
                    <div className="flex gap-5 mb-5">
                        <div>
                            <label
                                className="font-semibold"
                                htmlFor="firstName"
                            >
                                First Name
                            </label>
                            <input
                                {...register("firstName", {
                                    required: "firstname is required.",
                                })}
                                type="text"
                                name="firstName"
                                className={`border outline-none p-3.5 w-full rounded ${
                                    errors.firstName
                                        ? "border-red-500"
                                        : "border-white"
                                }`}
                            />

                            {errors.lastName && (
                                <small className="text-red-500">
                                    {errors.firstName.message}
                                </small>
                            )}
                        </div>
                        <div>
                            <label className="font-semibold" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                {...register("lastName", {
                                    required: "lastname is required.",
                                })}
                                type="text"
                                name="lastName"
                                className={`border outline-none p-3.5 w-full rounded ${
                                    errors.lastName
                                        ? "border-red-500"
                                        : "border-white"
                                }`}
                            />

                            {errors.lastName && (
                                <small className="text-red-500">
                                    {errors.lastName.message}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-semibold" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required.",
                            })}
                            type="text"
                            name="email"
                            className={`border outline-none p-3.5 w-full rounded ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.email && (
                            <small className="text-red-500">
                                {errors.email.message}
                            </small>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 w-full mt-5">
                        <label className="font-semibold" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required.",
                            })}
                            type="password"
                            name="password"
                            className={`border outline-none p-3.5 w-full rounded ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-white"
                            }`}
                        />

                        {errors.password && (
                            <small className="text-red-500">
                                {errors.password.message}
                            </small>
                        )}
                    </div>

                    <button className="bg-[#20D760] hover:bg-[#3BE477] transition hover:scale-103 cursor-pointer text-lg font-semibold mt-5 text-black w-full rounded-full p-3">
                        Continue
                    </button>
                </form>

                <h3 className="my-3 text-lg">or</h3>

                <div className="flex items-center justify-center gap-5 border rounded-full w-full py-3 cursor-pointer hover:bg-gray-50 hover:text-black transition mb-10">
                    <img className="h-6" src="/google.svg" alt="Google" />
                    <p className="font-semibold text-base">
                        Continue with Google
                    </p>
                </div>

                <h3 className="my-3 text-gray-400">Already have an account?</h3>
                <p
                    onClick={() => navigate("/signin")}
                    className="font-semibold cursor-pointer"
                >
                    Sign In
                </p>
            </div>
        </div>
    );
};

export default SignUp;
