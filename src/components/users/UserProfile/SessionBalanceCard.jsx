import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const SessionBalanceCard = ({ plan }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (!plan || !plan.totalSessions) {
        return null; // Don't render if it's not a session-based plan
    }
    
    const percentage = (plan.usedSessions / plan.totalSessions) * 100;

    return (
        <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
            <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 text-brand-red rounded-full">
                    <Zap size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 font-display">Session Balance</h3>
                    <p className="text-sm text-gray-500">For your active '{plan.planName}' plan.</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-baseline mb-1">
                    <span className="text-2xl font-bold text-brand-dark">{plan.usedSessions}</span>
                    <span className="text-sm text-gray-500">/ {plan.totalSessions} sessions used</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-brand-red h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </motion.div>
    );
};

export default SessionBalanceCard;
