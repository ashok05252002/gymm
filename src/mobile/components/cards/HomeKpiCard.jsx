import React from 'react';

const colorSchemes = {
    red: { bg: 'bg-red-50', text: 'text-brand-red' },
    green: { bg: 'bg-green-50', text: 'text-brand-green' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-500' },
};

const HomeKpiCard = ({ icon: Icon, label, value, color }) => {
    const scheme = colorSchemes[color] || colorSchemes.blue;

    return (
        <div className={`p-4 rounded-3xl ${scheme.bg} text-center`}>
            <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center bg-white ${scheme.text}`}>
                <Icon size={20} />
            </div>
            <p className="text-xs text-gray-500 mt-2">{label}</p>
            <p className="font-bold text-gray-800 text-sm mt-1 truncate">{value}</p>
        </div>
    );
};

export default HomeKpiCard;
