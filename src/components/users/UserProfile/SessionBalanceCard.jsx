import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const SessionBalanceCard = ({ plan }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (!plan || !plan.totalSessions) {
        return null;
    }
    
    const percentage = (plan.usedSessions / plan.totalSessions) * 100;

    return (
        <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
            <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 text-brand-red rounded-full">
                    <Zap size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 font-display">Session Balance</h3>
                    <p className="text-sm text-gray-500">For your active '{plan.planName}' plan.</p>
                </div>
            </div>
            <div className="mt-4 flex items-end gap-4">
                <p className="text-5xl font-bold text-brand-dark leading-none">{plan.usedSessions}</p>
                <div className="flex-1 pb-2">
                     <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-brand-red h-2.5 rounded-full" 
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
                <p className="text-lg text-gray-500 font-medium pb-1">/ {plan.totalSessions} sessions used</p>
            </div>
        </motion.div>
    );
};

export default SessionBalanceCard;
