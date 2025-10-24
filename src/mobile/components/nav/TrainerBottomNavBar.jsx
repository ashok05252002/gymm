import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Users, User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import TrainerBookSessionModal from '../popups/TrainerBookSessionModal';
import { getTrainerClients, getTrainerData } from '../../../data/mockData';

const navItems = [
    { path: 'home', icon: Home, label: 'Home' },
    { path: 'schedule', icon: Calendar, label: 'Schedule' },
    { path: 'clients', icon: Users, label: 'Clients' },
    { path: 'profile', icon: User, label: 'Profile' },
];

const TrainerBottomNavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { trainer } = getTrainerData();
    const clients = getTrainerClients(trainer.id);

    const handleSaveBooking = (bookingData) => {
        console.log("New Session Booked by Trainer:", bookingData);
        toast.success("Session booked successfully for client.");
        setIsModalOpen(false);
    };

    const NavItem = ({ item }) => (
        <NavLink
            to={`/mobile/trainer/${item.path}`}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center w-16 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <motion.div
                        animate={{ scale: isActive ? 1.1 : 1 }}
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
                <div className="relative w-full h-full bg-brand-dark rounded-3xl shadow-2xl flex justify-around items-center px-2">
                    {navItems.slice(0, 2).map(item => <NavItem key={item.path} item={item} />)}
                    <div className="w-16 h-16" /> {/* Spacer for the FAB */}
                    {navItems.slice(2, 4).map(item => <NavItem key={item.path} item={item} />)}
                </div>
                
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsModalOpen(true)}
                    className="absolute left-1/2 -translate-x-1/2 -top-5 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-red"
                    aria-label="Add New Session"
                >
                    <Plus size={32} />
                </motion.button>
            </div>
            <TrainerBookSessionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveBooking}
                clients={clients}
                trainer={trainer}
            />
        </>
    );
};

export default TrainerBottomNavBar;
