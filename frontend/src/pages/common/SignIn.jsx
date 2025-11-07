import { Podcast } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios.js";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            await axios.post("/api/auth/login", data, {
                withCredentials: true,
            });
            navigate("/");
        } catch (err) {
            console.log("Error signin...", err);
        } finally {
            reset();
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center px-5">
            <Podcast size={40} className="text-[#20D760]" />

            <h1 className="py-2 text-5xl lg:text-6xl font-bold">
                Welcome back
            </h1>

            <div className="w-full pt-7 max-w-md flex flex-col items-center">
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="flex flex-col items-center justify-center rounded-lg w-full"
                >
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

                <h3 className="my-4 text-lg">or</h3>

                <div
                    onClick={() =>
                        (window.location.href =
                            "http://localhost:3000/api/auth/google")
                    }
                    className="flex items-center justify-center gap-5 border rounded-full w-full py-3 cursor-pointer hover:bg-gray-50 hover:text-black transition mb-10"
                >
                    <img className="h-6" src="/google.svg" alt="Google" />
                    <p className="font-semibold text-base">
                        Continue with Google
                    </p>
                </div>

                <h3 className="my-5 text-gray-400">Don't have an account?</h3>
                <p
                    onClick={() => navigate("/signup")}
                    className="font-semibold cursor-pointer"
                >
                    Sign Up
                </p>
            </div>
        </div>
    );
};

export default SignIn;
