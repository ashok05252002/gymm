import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, User, Calendar, Clock, Check, Repeat } from 'lucide-react';

const SessionDetailsModal = ({ isOpen, onClose, session, member, onUpdateStatus }) => {
    if (!session || !member) return null;

    const handleMarkComplete = () => {
        onUpdateStatus(session.id, 'Completed');
        onClose();
    };
    
    const handleReschedule = () => {
        // In a real app, this would open another modal or navigate
        onUpdateStatus(session.id, 'Rescheduled'); // Mock action
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "100%" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-white w-full max-w-lg rounded-t-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800">Session Details</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full" />
                                <div>
                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                    <p className="text-gray-500">{member.planHistory[0]?.planName} Plan</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <User size={16} className="text-gray-500" />
                                    <span>{session.sessionType} Training</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <Calendar size={16} className="text-gray-500" />
                                    <span>{new Date(session.dateTime).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <Clock size={16} className="text-gray-500" />
                                    <span>{new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <Check size={16} className="text-gray-500" />
                                    <span>Status: {session.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-3">
                            <button 
                                onClick={handleReschedule} 
                                className="w-full bg-gray-200 text-gray-800 font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
                                disabled={session.status !== 'Confirmed'}
                            >
                                <Repeat size={20} /> Reschedule
                            </button>
                            <button 
                                onClick={handleMarkComplete} 
                                className="w-full bg-brand-green text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 disabled:bg-green-300"
                                disabled={session.status !== 'Confirmed'}
                            >
                                <Check size={20} /> Mark as Completed
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SessionDetailsModal;
