import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getMemberData, getPlans, getUsers, getMemberBookings } from '../../../data/mockData';
import { Zap, CalendarPlus, Calendar, Wallet, QrCode } from 'lucide-react';
import BrowsePlansModal from '../../components/popups/BrowsePlansModal';
import MemberBookSessionModal from '../../components/popups/MemberBookSessionModal';
import QrCodeModal from '../../components/popups/QrCodeModal';
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
    const { member, activePlan, kpis } = getMemberData();
    const allPlans = getPlans();
    const trainers = getUsers().filter(u => u.role === 'Trainer');
    const navigate = useNavigate();

    const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

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
                    <div className="grid grid-cols-4 gap-2">
                        <ShortcutButton icon={CalendarPlus} label="Book Session" onClick={() => setIsBookingModalOpen(true)} />
                        <ShortcutButton icon={Calendar} label="My Bookings" onClick={() => navigate('/mobile/member/bookings')} />
                        <ShortcutButton icon={Wallet} label="Payments" onClick={() => navigate('/mobile/member/payments')} />
                        <ShortcutButton icon={QrCode} label="Access QR" onClick={() => setIsQrModalOpen(true)} />
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
                    <p className="text-sm text-gray-500 mt-2">Expires on: {new Date(activePlan.endDate).toLocaleDateString()}</p>
                </motion.button>

                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-3xl shadow-sm flex flex-col items-center justify-center">
                        <div className="relative w-20 h-20">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    className="text-gray-200"
                                    strokeWidth="3" stroke="currentColor" fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-brand-green"
                                    strokeWidth="3" strokeDasharray={`${kpis.attendanceProgress}, 100`} strokeLinecap="round" stroke="currentColor" fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className="text-xl font-bold">{kpis.attendanceProgress}%</span>
                            </div>
                        </div>
                         <p className="font-bold text-gray-800 mt-2 text-center">Attendance</p>
                    </div>
                     <div className="bg-white p-5 rounded-3xl shadow-sm flex flex-col items-center justify-center">
                        <div className="w-20 h-20 flex items-center justify-center bg-red-50 rounded-full">
                            <Zap size={40} className="text-brand-red" />
                        </div>
                        <p className="font-bold text-gray-800 mt-2 text-center">Sessions Left</p>
                        <p className="text-3xl font-bold text-brand-red">{kpis.sessionsRemaining}</p>
                    </div>
                </motion.div>

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
            <QrCodeModal
                isOpen={isQrModalOpen}
                onClose={() => setIsQrModalOpen(false)}
                title="Your Access QR"
                value={member.id}
            />
        </>
    );
};

export default MemberHomeScreen;
