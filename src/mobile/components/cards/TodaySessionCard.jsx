import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { getUserById } from '../../../data/mockData';

const TodaySessionCard = ({ session, onClick }) => {
    const member = getUserById(session.memberId);
    if (!member) return null;

    const sessionTime = new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white p-4 rounded-3xl shadow-sm flex items-center gap-4 text-left"
        >
            <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
                <p className="font-bold text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-500">{session.sessionType} Training</p>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-brand-red font-semibold">
                <Clock size={16} />
                <span>{sessionTime}</span>
            </div>
        </motion.button>
    );
};

export default TodaySessionCard;
