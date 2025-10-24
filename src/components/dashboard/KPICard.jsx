import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

const colorSchemes = {
    blue: {
        bg: 'from-blue-500 to-blue-400',
        shadow: 'shadow-blue-200',
    },
    green: {
        bg: 'from-green-500 to-green-400',
        shadow: 'shadow-green-200',
    },
    orange: {
        bg: 'from-orange-500 to-orange-400',
        shadow: 'shadow-orange-200',
    },
    red: {
        bg: 'from-red-500 to-red-400',
        shadow: 'shadow-red-200',
    },
};

const KPICard = ({ title, value, icon: Icon, change, changeType, color = 'blue' }) => {
    const isIncrease = changeType === 'increase';
    const scheme = colorSchemes[color] || colorSchemes.blue;

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div 
            variants={itemVariants}
            className={`bg-gradient-to-br ${scheme.bg} p-6 rounded-2xl shadow-lg ${scheme.shadow} text-white flex flex-col justify-between relative overflow-hidden`}
        >
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-8 -left-2 w-32 h-32 bg-white/5 rounded-full"></div>

            <div className="flex justify-between items-start z-10">
                <div className="p-3 rounded-full bg-white/20">
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold bg-white/20 px-2 py-1 rounded-full">
                    {isIncrease ? (
                        <ArrowUp size={16} />
                    ) : (
                        <ArrowDown size={16} />
                    )}
                    <span>{change}</span>
                </div>
            </div>
            <div className="z-10 mt-4">
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-sm font-medium opacity-80">{title}</p>
            </div>
        </motion.div>
    );
};

export default KPICard;
