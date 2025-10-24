import React from 'react';
import { Bell, Search } from 'lucide-react';

const MobileHeader = () => {
    // This is a placeholder. In a real app, you'd get the trainer's name from auth context.
    const trainerName = "Alex"; 

    return (
        <header className="bg-brand-dark text-white sticky top-0 z-40 px-4 py-4 shadow-lg rounded-b-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400">Good Morning,</p>
                    <h1 className="text-xl font-bold font-display">{trainerName}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-gray-300 hover:text-white p-2">
                        <Search size={22} />
                    </button>
                    <button className="relative text-gray-300 hover:text-white p-2">
                        <Bell size={22} />
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                        </span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default MobileHeader;
