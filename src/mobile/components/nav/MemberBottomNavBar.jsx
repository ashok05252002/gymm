import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Wallet, User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import MemberBookSessionModal from '../popups/MemberBookSessionModal';
import { getUsers } from '../../../data/mockData';

const navItems = [
    { path: 'home', icon: Home, label: 'Home' },
    { path: 'bookings', icon: Calendar, label: 'Bookings' },
    { path: 'payments', icon: Wallet, label: 'Payments' },
    { path: 'profile', icon: User, label: 'Profile' },
];

const MemberBottomNavBar = () => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const trainers = getUsers().filter(u => u.role === 'Trainer');

    const handleSaveBooking = (bookingData) => {
        console.log("New Member Booking:", bookingData);
        toast.success("Session booked successfully!");
        setIsBookingModalOpen(false);
    };

    const NavItem = ({ item }) => (
        <NavLink
            to={`/mobile/member/${item.path}`}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center w-16 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <motion.div
                        animate={{ scale: isActive ? 1.1 : 1, y: isActive ? -2 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    </motion.div>
                    <span className="text-xs font-medium mt-1">{item.label}</span>
                </>
            )}
        </NavLink>
    );

    return (
        <>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md h-20 z-50">
                <div className="relative w-full h-full bg-brand-dark/80 backdrop-blur-lg rounded-3xl shadow-2xl flex justify-around items-center px-2">
                    {navItems.slice(0, 2).map(item => <NavItem key={item.path} item={item} />)}
                    <div className="w-16 h-16" /> {/* Spacer for the FAB */}
                    {navItems.slice(2, 4).map(item => <NavItem key={item.path} item={item} />)}
                </div>
                
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsBookingModalOpen(true)}
                    className="absolute left-1/2 -translate-x-1/2 -top-5 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-red"
                    aria-label="Book a Session"
                >
                    <Plus size={32} />
                </motion.button>
            </div>
            <MemberBookSessionModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onSave={handleSaveBooking}
                trainers={trainers}
            />
        </>
    );
};

export default MemberBottomNavBar;
