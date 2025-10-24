import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Users, User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import WorkoutTemplateModal from '../popups/WorkoutTemplateModal';
import toast from 'react-hot-toast';

const navItems = [
    { path: 'home', icon: Home, label: 'Home' },
    { path: 'schedule', icon: Calendar, label: 'Schedule' },
    { path: 'members', icon: Users, label: 'Members' },
    { path: 'profile', icon: User, label: 'Profile' },
];

const BottomNavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveWorkout = (workoutData) => {
        console.log("New Workout Template:", workoutData);
        toast.success("Workout template saved successfully.");
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
                <div className="relative w-full h-full bg-brand-dark rounded-3xl shadow-2xl flex justify-between items-center px-6">
                    <div className="flex items-center gap-x-6">
                        {navItems.slice(0, 2).map(item => <NavItem key={item.path} item={item} />)}
                    </div>
                    <div className="flex items-center gap-x-6">
                        {navItems.slice(2, 4).map(item => <NavItem key={item.path} item={item} />)}
                    </div>
                </div>
                
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsModalOpen(true)}
                    className="absolute left-1/2 -translate-x-1/2 -top-5 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-red"
                >
                    <Plus size={32} />
                </motion.button>
            </div>
            <WorkoutTemplateModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveWorkout}
            />
        </>
    );
};

export default BottomNavBar;
