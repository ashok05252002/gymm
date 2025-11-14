import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Bell, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ userRole }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Mock logout
        navigate('/login');
    };
    
    const notificationPath = userRole === 'Admin' ? '/admin/notifications' : '/receptionist/notifications';

    return (
        <header className="bg-white shadow-sm w-full py-4 px-6 flex items-center justify-between z-10">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <Dumbbell className="h-8 w-8 text-brand-red" />
                    <h1 className="text-2xl font-display font-bold text-brand-dark hidden sm:block">GymPro</h1>
                </div>
            </div>

            {/* Middle Section - Search */}
            <div className="relative flex-1 max-w-xl hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search members, plans..."
                    className="w-full pl-12 pr-4 py-2.5 border bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none transition-all"
                />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <Link to={notificationPath} className="relative text-gray-500 hover:text-brand-red transition-colors">
                    <Bell size={24} />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </Link>

                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="text-gray-600" />
                        </div>
                        <div className="hidden lg:block">
                            <p className="font-semibold text-sm text-gray-800">John Doe</p>
                            <p className="text-xs text-gray-500">{userRole}</p>
                        </div>
                        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 overflow-hidden"
                            >
                                <ul>
                                    <li className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
                                        <Settings size={18} className="text-gray-600" />
                                        <span className="text-sm font-medium text-gray-700">Settings</span>
                                    </li>
                                    <li onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer border-t border-gray-100">
                                        <LogOut size={18} className="text-brand-red" />
                                        <span className="text-sm font-medium text-brand-red">Logout</span>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Header;
