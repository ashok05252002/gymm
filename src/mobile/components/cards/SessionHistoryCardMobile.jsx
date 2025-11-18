import React from 'react';
import { motion } from 'framer-motion';

const SessionStatusBadge = ({ status }) => {
    const statusClasses = {
        Confirmed: 'bg-green-100 text-green-800',
        Completed: 'bg-gray-100 text-gray-800',
        Cancelled: 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>{status}</span>;
};

const SessionHistoryCardMobile = ({ sessions }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div variants={itemVariants} className="bg-white p-4 rounded-3xl shadow-sm">
            <h3 className="font-bold text-lg mb-3 px-1">Session History</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {sessions.map(session => (
                    <div key={session.id} className="p-3 rounded-2xl bg-gray-50 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm">{new Date(session.dateTime).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">with {session.trainerName}</p>
                        </div>
                        <SessionStatusBadge status={session.status} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default SessionHistoryCardMobile;
