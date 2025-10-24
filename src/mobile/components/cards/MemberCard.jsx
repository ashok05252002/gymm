import React from 'react';
import { motion } from 'framer-motion';

const MemberCard = ({ member, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-4 rounded-3xl shadow-sm flex items-center gap-4"
        >
            <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
                <p className="font-bold text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-500">Last session: {new Date(member.lastSession).toLocaleDateString()}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
                {member.planHistory[0]?.planName}
            </span>
        </motion.div>
    );
};

export default MemberCard;
