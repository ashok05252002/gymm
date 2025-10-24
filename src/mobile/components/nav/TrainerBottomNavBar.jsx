import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Users, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { path: 'home', icon: Home, label: 'Home' },
    { path: 'schedule', icon: Calendar, label: 'Schedule' },
    { path: 'clients', icon: Users, label: 'Clients' },
    { path: 'profile', icon: User, label: 'Profile' },
];

const TrainerBottomNavBar = () => {
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
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md h-20 z-50">
            <div className="w-full h-full bg-brand-dark rounded-3xl shadow-2xl flex justify-around items-center px-2">
                {navItems.map(item => <NavItem key={item.path} item={item} />)}
            </div>
        </div>
    );
};

export default TrainerBottomNavBar;
