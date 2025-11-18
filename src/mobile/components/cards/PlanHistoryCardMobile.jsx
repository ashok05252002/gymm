import React from 'react';
import { motion } from 'framer-motion';

const PlanHistoryCardMobile = ({ plans }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (plans.length === 0) return null;

    return (
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-3xl shadow-sm">
            <h3 className="font-bold text-lg mb-3 px-1">Past Plans</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {plans.map((plan, index) => (
                    <div key={index} className="p-3 rounded-2xl bg-gray-50 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm">{plan.planName}</p>
                            <p className="text-xs text-gray-500">Expired: {new Date(plan.endDate).toLocaleDateString()}</p>
                        </div>
                        <span className="text-xs font-medium text-gray-500">Expired</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default PlanHistoryCardMobile;
