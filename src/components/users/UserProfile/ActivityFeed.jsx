import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, RefreshCcw, Dumbbell } from 'lucide-react';

const iconMap = {
    'Checked In': <LogIn size={18} className="text-blue-500" />,
    'Updated Profile': <User size={18} className="text-purple-500" />,
    'Renewed Plan': <RefreshCcw size={18} className="text-green-500" />,
    'Joined Group Class': <Dumbbell size={18} className="text-orange-500" />,
};

const ActivityFeed = ({ activityLog }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full"
        >
            <h3 className="text-xl font-bold text-gray-800 font-display mb-4">Activity Feed</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {activityLog.map(log => (
                    <div key={log.id} className="flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full">
                            {iconMap[log.action] || <LogIn size={18} className="text-gray-500" />}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm text-gray-700">{log.action}</p>
                            <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ActivityFeed;
