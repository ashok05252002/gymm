import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, LogOut } from 'lucide-react';
import { getMemberData, getMemberBookings } from '../../../data/mockData';
import { useNavigate } from 'react-router-dom';
import EditMemberProfileModal from '../../components/popups/EditMemberProfileModal';
import toast from 'react-hot-toast';
import SessionBalanceCardMobile from '../../components/cards/SessionBalanceCardMobile';
import SessionHistoryCardMobile from '../../components/cards/SessionHistoryCardMobile';
import PlanHistoryCardMobile from '../../components/cards/PlanHistoryCardMobile';

const MemberProfileScreen = () => {
    const [memberData, setMemberData] = useState(getMemberData());
    const [bookings] = useState(getMemberBookings());
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const { member, activePlan } = memberData;
    const navigate = useNavigate();

    const handleSaveProfile = (updatedData) => {
        setMemberData(prev => ({
            ...prev,
            member: { ...prev.member, ...updatedData }
        }));
        toast.success("Profile updated successfully!");
        setIsEditModalOpen(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <>
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="relative">
                    <div className="h-24 bg-gray-200 rounded-3xl"></div>
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full border-4 border-gray-100" />
                    </div>
                    <button onClick={() => setIsEditModalOpen(true)} className="absolute top-3 right-3 p-2 bg-white/50 backdrop-blur-sm rounded-full">
                        <Edit size={18} />
                    </button>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-14 text-center">
                    <h1 className="text-2xl font-bold">{member.name}</h1>
                    <p className="text-gray-500">{member.email}</p>
                </motion.div>

                {/* Session Balance */}
                {activePlan && <SessionBalanceCardMobile plan={activePlan} />}

                {/* Session History */}
                <SessionHistoryCardMobile sessions={bookings} />

                {/* Past Plans */}
                <PlanHistoryCardMobile plans={member.planHistory.filter(p => p.status !== 'Active')} />

                {/* Logout Button */}
                <motion.div variants={itemVariants} className="pt-4">
                    <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 text-red-600 font-bold rounded-2xl">
                        <LogOut size={20} />
                        Logout
                    </button>
                </motion.div>
            </motion.div>
            <EditMemberProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveProfile}
                user={member}
            />
        </>
    );
};

export default MemberProfileScreen;
