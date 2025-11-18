import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getMemberData, getPlans, getUsers, getMemberBookings } from '../../../data/mockData';
import { Zap, CalendarPlus, Calendar, Wallet } from 'lucide-react';
import BrowsePlansModal from '../../components/popups/BrowsePlansModal';
import MemberBookSessionModal from '../../components/popups/MemberBookSessionModal';
import toast from 'react-hot-toast';
import UpcomingSessionCard from '../../components/cards/UpcomingSessionCard';

const ShortcutButton = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center">
            <Icon size={24} />
        </div>
        <p className="text-xs font-semibold text-gray-700">{label}</p>
    </button>
);

const MemberHomeScreen = () => {
    const { member, activePlan } = getMemberData();
    const allPlans = getPlans();
    const trainers = getUsers().filter(u => u.role === 'Trainer');
    const navigate = useNavigate();

    const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const bookings = getMemberBookings();
    const nextSession = bookings
        .filter(b => b.status === 'Confirmed' && new Date(b.dateTime) > new Date())
        .sort((a,b) => new Date(a.dateTime) - new Date(b.dateTime))[0];

    const handleSaveBooking = (bookingData) => {
        console.log("New Member Booking:", bookingData);
        toast.success("Session booked successfully!");
        setIsBookingModalOpen(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };
    
    const sessionUsagePercentage = activePlan ? (activePlan.usedSessions / activePlan.totalSessions) * 100 : 0;

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                {nextSession && (
                    <motion.div variants={itemVariants}>
                        <UpcomingSessionCard session={nextSession} />
                    </motion.div>
                )}

                <motion.div variants={itemVariants} className="bg-white p-4 rounded-3xl shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 px-2">Quick Shortcuts</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <ShortcutButton icon={CalendarPlus} label="Book Session" onClick={() => setIsBookingModalOpen(true)} />
                        <ShortcutButton icon={Calendar} label="My Bookings" onClick={() => navigate('/mobile/member/bookings')} />
                        <ShortcutButton icon={Wallet} label="Payments" onClick={() => navigate('/mobile/member/payments')} />
                    </div>
                </motion.div>

                <motion.button 
                    variants={itemVariants} 
                    className="w-full bg-white p-5 rounded-3xl shadow-sm text-left"
                    onClick={() => setIsPlansModalOpen(true)}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Active Plan</p>
                            <p className="font-bold text-xl text-gray-800">{activePlan.planName}</p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between items-baseline mb-1">
                             <p className="text-sm text-gray-500">Session Balance</p>
                            <span className="text-sm font-semibold text-brand-dark">{activePlan.usedSessions} / {activePlan.totalSessions} sessions</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-brand-red h-2.5 rounded-full" 
                                style={{ width: `${sessionUsagePercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </motion.button>

            </motion.div>
            <BrowsePlansModal
                isOpen={isPlansModalOpen}
                onClose={() => setIsPlansModalOpen(false)}
                plans={allPlans}
            />
            <MemberBookSessionModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onSave={handleSaveBooking}
                trainers={trainers}
            />
        </>
    );
};

export default MemberHomeScreen;
