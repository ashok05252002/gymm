import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Calendar, Shield, LogIn, RefreshCcw, Dumbbell, User, CheckCircle, Clock, XCircle } from 'lucide-react';
import { getUserById } from '../../../data/mockData';
import StatusBadge from '../../../components/shared/StatusBadge';

const iconMap = {
    'Checked In': <LogIn size={18} className="text-blue-500" />,
    'Updated Profile': <User size={18} className="text-purple-500" />,
    'Renewed Plan': <RefreshCcw size={18} className="text-green-500" />,
    'Joined Group Class': <Dumbbell size={18} className="text-orange-500" />,
};

const statusMap = {
    Active: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    Expired: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    Cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
};

const TrainerMemberProfileScreen = () => {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const client = getUserById(memberId);
    
    if (!client) {
        return <div className="text-center p-8">Client not found.</div>;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
        >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-2">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white shadow-sm">
                    <ArrowLeft size={20} />
                </button>
            </motion.div>

            {/* Profile Header */}
            <motion.div variants={itemVariants} className="bg-white p-4 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4">
                    <img src={client.avatar} alt={client.name} className="w-16 h-16 rounded-full" />
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">{client.name}</h1>
                        <StatusBadge status={client.status} />
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-600 border-t pt-4">
                    <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /><span>{client.email}</span></div>
                    <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /><span>{client.phone}</span></div>
                    <div className="flex items-center gap-2"><Shield size={14} className="text-gray-400" /><span>{client.role}</span></div>
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-gray-400" /><span>Member since {new Date(client.memberSince).toLocaleDateString()}</span></div>
                </div>
            </motion.div>

            {/* Plan History */}
            <motion.div variants={itemVariants} className="bg-white p-4 rounded-3xl shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Plan History</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                    {client.planHistory.map((plan, index) => {
                        const StatusIcon = statusMap[plan.status]?.icon || Clock;
                        const statusColor = statusMap[plan.status]?.color || 'text-gray-500';
                        return (
                            <div key={index} className="p-3 rounded-xl bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-sm text-gray-700">{plan.planName} Plan</p>
                                    <p className={`text-xs font-medium ${statusColor}`}>{plan.status}</p>
                                </div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                    <Calendar size={12} />
                                    <span>{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div variants={itemVariants} className="bg-white p-4 rounded-3xl shadow-sm">
                 <h3 className="text-lg font-bold text-gray-800 mb-3">Activity Feed</h3>
                 <div className="space-y-3 max-h-48 overflow-y-auto">
                    {client.activityLog.filter(log => log.action === 'Checked In').map(log => (
                        <div key={log.id} className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full">
                                {iconMap[log.action] || <LogIn size={16} className="text-gray-500" />}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-sm text-gray-700">{log.action}</p>
                                <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </motion.div>
        </motion.div>
    );
};

export default TrainerMemberProfileScreen;
