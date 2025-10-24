import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import WeeklyScroller from '../../components/shared/WeeklyScroller';
import { getSessionsByTrainer, getUsers, getTrainerData } from '../../../data/mockData';

const TrainerScheduleScreen = () => {
    const { trainer } = getTrainerData();
    const [sessions, setSessions] = useState(getSessionsByTrainer(trainer.id)); 
    const users = getUsers();

    const handleUpdateSessionStatus = (sessionId, status) => {
        setSessions(prevSessions =>
            prevSessions.map(s =>
                s.id === sessionId ? { ...s, status } : s
            )
        );
        toast.success(`Session marked as ${status}.`);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">My Schedule</h1>
            <WeeklyScroller 
                sessions={sessions} 
                users={users}
                onUpdateSessionStatus={handleUpdateSessionStatus}
            />
        </motion.div>
    );
};

export default TrainerScheduleScreen;
