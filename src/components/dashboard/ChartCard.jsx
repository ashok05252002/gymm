import React from 'react';
import { MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const ChartCard = ({ title, children }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };
    
    return (
        <motion.div 
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 font-display">{title}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                </button>
            </div>
            <div>{children}</div>
        </motion.div>
    );
};

export default ChartCard;
