import { CircleUserRound, House, Music2, Podcast } from "lucide-react";

const Navbar = () => {
    return (
        <div className="w-full py-3 bg-black fixed z-999 top-0 left-0 flex items-center justify-between px-5">
            <div className="flex items-center justify-center gap-5">
                <Podcast size={40} className="mr-5" />
            </div>

            <div className="flex items-center justify-center gap-3">
                <CircleUserRound size={30} />
                <p>Test User</p>
            </div>
        </div>
    );
};

export default Navbar;
