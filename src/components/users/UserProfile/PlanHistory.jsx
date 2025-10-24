import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const statusMap = {
    Active: { icon: CheckCircle, color: 'text-green-500' },
    Expired: { icon: Clock, color: 'text-yellow-500' },
    Cancelled: { icon: XCircle, color: 'text-red-500' },
};

const PlanHistory = ({ planHistory }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full"
        >
            <h3 className="text-xl font-bold text-gray-800 font-display mb-4">Plan History</h3>
            <div className="space-y-4">
                {planHistory.map((plan, index) => {
                    const StatusIcon = statusMap[plan.status]?.icon || Clock;
                    const statusColor = statusMap[plan.status]?.color || 'text-gray-500';
                    return (
                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className={`p-2 bg-white rounded-full border ${statusColor}`}>
                                <StatusIcon size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-800">{plan.planName} Plan</p>
                                    <p className={`text-sm font-medium ${statusColor}`}>{plan.status}</p>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default PlanHistory;
