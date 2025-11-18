import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, RefreshCcw, Dumbbell } from 'lucide-react';

const iconMap = {
    'Checked In': { icon: LogIn, color: 'text-blue-500', bg: 'bg-blue-100' },
    'Updated Profile': { icon: User, color: 'text-purple-500', bg: 'bg-purple-100' },
    'Renewed Plan': { icon: RefreshCcw, color: 'text-green-500', bg: 'bg-green-100' },
    'Joined Group Class': { icon: Dumbbell, color: 'text-orange-500', bg: 'bg-orange-100' },
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
                {activityLog.map(log => {
                    const activityType = iconMap[log.action] || { icon: LogIn, color: 'text-gray-500', bg: 'bg-gray-100' };
                    const Icon = activityType.icon;
                    return (
                        <div key={log.id} className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${activityType.bg}`}>
                                <Icon size={18} className={activityType.color} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-sm text-gray-700">{log.action}</p>
                                <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default ActivityFeed;
