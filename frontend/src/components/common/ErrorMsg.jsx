import {
    AlertCircle,
    WifiOff,
    ServerCrash,
    FileX,
    SearchX,
    ShieldAlert,
    DatabaseZap,
    Ban,
    XCircle,
    AlertTriangle,
    Inbox,
    Music,
    ListMusic,
    UserX,
    LockKeyhole,
    Clock,
    PlugZap,
} from "lucide-react";

const ErrorMsg = ({
    icon: Icon = AlertCircle,
    title = "Something went wrong",
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative">
                <div
                    className={`rounded-full bg-red-500/10 p-6 mb-6 backdrop-blur-sm border border-white/10  shadow-2xl`}
                >
                    <Icon
                        size={35}
                        className={`drop-shadow-lg text-red-500/60`}
                        strokeWidth={1.5}
                    />
                </div>
            </div>

            <h3
                className={`text-base md:text-lg  mb-3 text-center max-w-md text-gray-400`}
            >
                {title}
            </h3>
        </div>
    );
};

export default ErrorMsg;
