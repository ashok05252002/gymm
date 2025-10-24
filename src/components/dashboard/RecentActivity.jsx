import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, RefreshCcw } from 'lucide-react';

const iconMap = {
    'User Login': <LogIn className="text-blue-500" size={20} />,
    'New Member': <UserPlus className="text-green-500" size={20} />,
    'Plan Renewal': <RefreshCcw className="text-purple-500" size={20} />,
};

const RecentActivity = ({ activities }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };
    
    return (
        <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
            <h3 className="text-lg font-bold text-gray-800 font-display mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                            {iconMap[activity.type] || <LogIn className="text-gray-500" size={20} />}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">{activity.description}</p>
                            <p className="text-sm text-gray-500">{activity.user}</p>
                        </div>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default RecentActivity;
