import React from "react";

const StatCard = ({ icon: Icon, label, value, gradient }) => {
    return (
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
};

export default StatCard;
