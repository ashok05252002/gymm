import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Shield, Edit } from 'lucide-react';
import StatusBadge from '../../shared/StatusBadge';

const ProfileHeader = ({ user, onEdit }) => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative"
        >
            {onEdit && (
                 <button 
                    onClick={onEdit}
                    className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600 text-sm font-medium"
                >
                    <Edit size={16} /> Edit Profile
                </button>
            )}
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl font-bold font-display text-gray-800">{user.name}</h1>
                    <div className="mt-2">
                        <StatusBadge status={user.status} />
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                            <Mail size={16} className="text-gray-400" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                            <Phone size={16} className="text-gray-400" />
                            <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                            <Shield size={16} className="text-gray-400" />
                            <span>{user.role}</span>
                        </div>
                    </div>
                     <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 justify-center sm:justify-start">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{user.role === 'Member' ? 'Member' : 'Staff'} since {new Date(user.memberSince).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileHeader;
