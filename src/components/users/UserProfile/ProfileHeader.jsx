import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Shield, Edit } from 'lucide-react';
import StatusBadge from '../../shared/StatusBadge';

const ProfileHeader = ({ user }) => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
            <div className="flex flex-col sm:flex-row gap-6">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                        <div>
                            <h1 className="text-3xl font-bold font-display text-gray-800">{user.name}</h1>
                            <div className="mt-1">
                                <StatusBadge status={user.status} />
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 mt-4 sm:mt-0 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                            <Edit size={16} /> Edit Profile
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-400" />
                            <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield size={16} className="text-gray-400" />
                            <span>{user.role}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span>Member since {new Date(user.memberSince).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileHeader;
