import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getTrainerData, getRecentClientActivity, getUsers } from '../../../data/mockData';
import HomeKpiCard from '../../components/cards/HomeKpiCard';
import TodaySessionCard from '../../components/cards/TodaySessionCard';
import { Dumbbell, Users, BarChart, CheckCircle, LogIn } from 'lucide-react';
import SessionDetailsModal from '../../components/popups/SessionDetailsModal';
import toast from 'react-hot-toast';

const activityIconMap = {
    'check-in': <LogIn size={18} className="text-blue-500" />,
    'session': <CheckCircle size={18} className="text-green-500" />,
};

const TrainerHomeScreen = () => {
    const { trainer, kpis } = getTrainerData();
    const [todaysSessions, setTodaysSessions] = useState(getTrainerData().todaysSessions);
    const [activityLog, setActivityLog] = useState(getRecentClientActivity(trainer.id));
    const users = getUsers();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const handleSessionClick = (session) => {
        setSelectedSession(session);
        setIsModalOpen(true);
    };

    const handleUpdateSessionStatus = (sessionId, status) => {
        setTodaysSessions(prevSessions =>
            prevSessions.map(s =>
                s.id === sessionId ? { ...s, status } : s
            )
        );
        toast.success(`Session marked as ${status}.`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
                    <HomeKpiCard icon={Dumbbell} label="Sessions" value={kpis.sessionsToday} color="red" />
                    <HomeKpiCard icon={Users} label="Attendance" value={kpis.attendance} color="green" />
                    <HomeKpiCard icon={BarChart} label="Income" value={`${kpis.monthlyIncome} OMR`} color="blue" />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Today's Sessions</h2>
                    <div className="space-y-3">
                        {todaysSessions.length > 0 ? (
                            todaysSessions.map(session => (
                                <TodaySessionCard 
                                    key={session.id} 
                                    session={session} 
                                    onClick={() => handleSessionClick(session)}
                                />
                            ))
                        ) : (
                            <div className="text-center py-10 bg-white rounded-3xl">
                                <p className="text-gray-500">No sessions scheduled for today.</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                 <motion.div variants={itemVariants}>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Client Activity</h2>
                    <div className="bg-white p-4 rounded-3xl shadow-sm space-y-4">
                        {activityLog.length > 0 ? (
                            activityLog.map(log => (
                                <div key={log.id} className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-100 rounded-full">
                                        {activityIconMap[log.type] || <LogIn size={18} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">{log.description}</p>
                                        <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                             <p className="text-center text-gray-500 py-4">No recent client activity.</p>
                        )}
                    </div>
                </motion.div>
            </motion.div>
            <SessionDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                session={selectedSession}
                member={users.find(u => u.id === selectedSession?.memberId)}
                onUpdateStatus={handleUpdateSessionStatus}
            />
        </>
    );
};

export default TrainerHomeScreen;
