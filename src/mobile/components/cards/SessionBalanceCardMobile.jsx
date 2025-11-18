import React from 'react';
import { motion } from 'framer-motion';

const SessionBalanceCardMobile = ({ plan }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (!plan) return null;

    const percentage = (plan.usedSessions / plan.totalSessions) * 100;

    return (
        <motion.div variants={itemVariants} className="bg-white p-5 rounded-3xl shadow-sm">
            <div>
                <p className="text-gray-500 text-sm">Active Plan</p>
                <p className="font-bold text-xl text-gray-800">{plan.planName}</p>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-baseline mb-1">
                    <p className="text-sm text-gray-500">Session Balance</p>
                    <span className="text-sm font-semibold text-brand-dark">{plan.usedSessions} / {plan.totalSessions} sessions</span>
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

export default SessionBalanceCardMobile;
