import { CircleUserRound, House, Music2, Podcast } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="w-full py-3 bg-black fixed top-0 left-0 flex items-center justify-between px-5">
            <div className="flex items-center justify-center gap-5">
                <Podcast size={40} className="mr-5" />

                {pathname === "/" ? (
                    <div
                        onClick={() => navigate("/music-player")}
                        className={`rounded-full p-2 bg-[#212121]`}
                    >
                        <Music2 />
                    </div>
                ) : (
                    <div
                        onClick={() => navigate("/")}
                        className={`rounded-full p-2 bg-[#212121]`}
                    >
                        <House />
                    </div>
                )}
            </div>

            <div className="flex items-center justify-center gap-3">
                <CircleUserRound size={30} />
                <p>Test User</p>
            </div>
        </div>
    );
};

export default Navbar;
