import React from 'react';
import { Bell } from 'lucide-react';
import { getMemberData } from '../../../data/mockData';

const MemberMobileHeader = () => {
    const { member } = getMemberData();
    const memberName = member ? member.name.split(' ')[0] : "Member";

    return (
        <header className="bg-brand-dark text-white sticky top-0 z-40 px-4 py-4 shadow-lg rounded-b-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400">Hi {memberName},</p>
                    <h1 className="text-xl font-bold font-display">Let's Train Today!</h1>
                </div>
                <div className="flex items-center gap-3">
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

export default MemberMobileHeader;
