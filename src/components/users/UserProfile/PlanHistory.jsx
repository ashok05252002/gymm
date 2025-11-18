import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

const statusMap = {
    Active: { icon: CheckCircle, textColor: 'text-green-600', bgColor: 'bg-green-100' },
    Expired: { icon: Clock, textColor: 'text-yellow-600', bgColor: 'bg-yellow-100' },
};

const PlanHistory = ({ planHistory }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };
    
    const activePlan = planHistory.find(p => p.status === 'Active');
    const inactivePlans = planHistory.filter(p => p.status !== 'Active');

    const PlanItem = ({ plan }) => {
        const statusInfo = statusMap[plan.status] || statusMap.Expired;
        return (
            <div className={`p-4 rounded-lg flex items-start gap-4 ${statusInfo.bgColor}`}>
                <div className={`p-2 bg-white rounded-full border ${statusInfo.textColor}`}>
                    <statusInfo.icon size={20} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-800">{plan.planName} Plan</p>
                        <p className={`text-sm font-medium ${statusInfo.textColor}`}>{plan.status}</p>
                    </div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full"
        >
            <h3 className="text-xl font-bold text-gray-800 font-display mb-4">Plan History</h3>
            <div className="space-y-4">
                {activePlan && (
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2">Active Plan</p>
                        <PlanItem plan={activePlan} />
                    </div>
                )}

                {inactivePlans.length > 0 && (
                    <div>
                        <p className="text-sm font-semibold text-gray-500 mb-2 mt-4">Past Plans</p>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {inactivePlans.map((plan, index) => (
                                <PlanItem key={index} plan={plan} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default PlanHistory;
