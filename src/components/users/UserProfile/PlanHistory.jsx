import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const statusMap = {
    Active: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    Expired: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    Cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
};

const PlanHistory = ({ planHistory }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };
    
    const activePlan = planHistory.find(p => p.status === 'Active');
    const inactivePlans = planHistory.filter(p => p.status !== 'Active');

    return (
        <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full"
        >
            <h3 className="text-xl font-bold text-gray-800 font-display mb-4">Plan History</h3>
            <div className="space-y-4">
                {activePlan && (
                    <div className="relative">
                        <p className="text-sm font-semibold text-gray-500 mb-2">Active Plan</p>
                        <div className={`w-full text-left p-4 rounded-lg flex items-start gap-4 ${statusMap.Active.bg}`}>
                            <div className={`p-2 bg-white rounded-full border ${statusMap.Active.color}`}>
                                <statusMap.Active.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-800">{activePlan.planName} Plan</p>
                                    <p className={`text-sm font-medium ${statusMap.Active.color}`}>{activePlan.status}</p>
                                </div>
                                <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                    <Calendar size={14} />
                                    <span>{new Date(activePlan.startDate).toLocaleDateString()} - {new Date(activePlan.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {inactivePlans.length > 0 && (
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2 mt-4">Past Plans</p>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {inactivePlans.map((plan, index) => {
                                const StatusIcon = statusMap[plan.status]?.icon || Clock;
                                const statusColor = statusMap[plan.status]?.color || 'text-gray-500';
                                const statusBg = statusMap[plan.status]?.bg || 'bg-gray-50';
                                return (
                                    <div key={index} className={`flex items-start gap-4 p-3 rounded-lg ${statusBg}`}>
                                        <div className={`p-1.5 bg-white rounded-full border ${statusColor}`}>
                                            <StatusIcon size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <p className="font-medium text-sm text-gray-700">{plan.planName} Plan</p>
                                                <p className={`text-xs font-medium ${statusColor}`}>{plan.status}</p>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                                <Calendar size={12} />
                                                <span>{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default PlanHistory;
