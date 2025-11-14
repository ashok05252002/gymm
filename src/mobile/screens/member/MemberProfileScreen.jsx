import React from 'react';
import { motion } from 'framer-motion';
import { Edit, LogOut, Phone } from 'lucide-react';
import { getMemberData } from '../../../data/mockData';
import { useNavigate } from 'react-router-dom';
import MobileTabs from '../../components/shared/MobileTabs';

const MemberProfileScreen = () => {
    const { member } = getMemberData();
    const navigate = useNavigate();

    const PersonalInfoTab = () => (
        <div className="bg-white p-4 rounded-2xl space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Name:</span> <span className="font-semibold">{member.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Email:</span> <span className="font-semibold">{member.email}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Phone:</span> <span className="font-semibold">{member.phone}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Member Since:</span> <span className="font-semibold">{new Date(member.memberSince).toLocaleDateString()}</span></div>
        </div>
    );
    
    const SettingsTab = () => (
        <div className="bg-white p-2 rounded-2xl space-y-1">
            <p className="text-center text-sm text-gray-400 p-4">More settings coming soon.</p>
        </div>
    );

    const tabs = [
        { label: 'Personal', content: <PersonalInfoTab /> },
        { label: 'Settings', content: <SettingsTab /> },
    ];

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="relative">
                    <div className="h-24 bg-gray-200 rounded-3xl"></div>
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full border-4 border-gray-100" />
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-white/50 backdrop-blur-sm rounded-full">
                        <Edit size={18} />
                    </button>
                </div>

                <div className="pt-14 text-center">
                    <h1 className="text-2xl font-bold">{member.name}</h1>
                    <p className="text-gray-500">{member.role}</p>
                </div>

                <MobileTabs tabs={tabs} />

                <div className="bg-white p-4 rounded-2xl space-y-1">
                    <h4 className="font-bold text-gray-800 px-2 pb-1">Gym Contact</h4>
                    <div className="flex justify-between items-center text-sm p-2">
                        <span className="text-gray-500 flex items-center gap-2"><Phone size={16}/> Main Office</span>
                        <span className="font-semibold">+968 9123 4567</span>
                    </div>
                </div>

                <div className="pt-4">
                    <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 font-bold rounded-2xl">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default MemberProfileScreen;
