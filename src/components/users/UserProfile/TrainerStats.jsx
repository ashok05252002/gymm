import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Dumbbell } from 'lucide-react';
import { getTrainerClients, getSessionsByTrainer } from '../../../data/mockData';

const TrainerStats = ({ trainerId }) => {
    const [stats, setStats] = useState({ clientCount: 0, sessionCount: 0 });

    useEffect(() => {
        const clients = getTrainerClients(trainerId);
        const sessions = getSessionsByTrainer(trainerId);
        setStats({
            clientCount: clients.length,
            sessionCount: sessions.length
        });
    }, [trainerId]);

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                    <Users size={24} />
                </div>
                <div>
                    <p className="text-3xl font-bold text-gray-800">{stats.clientCount}</p>
                    <p className="text-sm text-gray-500">Assigned Clients</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-full">
                    <Dumbbell size={24} />
                </div>
                <div>
                    <p className="text-3xl font-bold text-gray-800">{stats.sessionCount}</p>
                    <p className="text-sm text-gray-500">Total Sessions Conducted</p>
                </div>
            </div>
        </motion.div>
    );
};

export default TrainerStats;
