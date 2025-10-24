import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SessionDetailsModal from '../popups/SessionDetailsModal';

const sessionStatusColors = {
    Confirmed: 'bg-blue-500',
    Completed: 'bg-brand-green',
    Cancelled: 'bg-brand-red',
};

const WeeklyScroller = ({ sessions, users, onUpdateSessionStatus }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const handleSessionClick = (session) => {
        setSelectedSession(session);
        setIsModalOpen(true);
    };

    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(selectedDate.getDate() - selectedDate.getDay() + i);
        return date;
    });

    const sessionsByDate = sessions.filter(s => {
        const sessionDate = new Date(s.dateTime);
        return sessionDate.toDateString() === selectedDate.toDateString();
    }).sort((a, b) => a.dateTime - b.dateTime);

    return (
        <>
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">
                            {selectedDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {dates.map(date => {
                            const isSelected = date.toDateString() === selectedDate.toDateString();
                            return (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => setSelectedDate(date)}
                                    className={`p-2 rounded-xl text-center transition-colors ${
                                        isSelected ? 'bg-brand-red text-white' : 'bg-white text-gray-800'
                                    }`}
                                >
                                    <p className="text-xs">{date.toLocaleString('en-US', { weekday: 'short' })}</p>
                                    <p className="font-bold text-lg">{date.getDate()}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 mb-3">
                        {selectedDate.toDateString() === new Date().toDateString() ? "Today's" : `On ${selectedDate.toLocaleDateString()}`} Sessions
                    </h3>
                    <div className="space-y-3">
                        {sessionsByDate.length > 0 ? sessionsByDate.map(session => (
                            <motion.div
                                key={session.id}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSessionClick(session)}
                                className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4"
                            >
                                <div className={`w-1.5 h-12 rounded-full ${sessionStatusColors[session.status] || 'bg-gray-400'}`}></div>
                                <div>
                                    <p className="font-bold text-gray-800">{session.memberName}</p>
                                    <p className="text-sm text-gray-500">{session.sessionType} Training</p>
                                </div>
                                <p className="ml-auto text-sm font-semibold text-gray-700">
                                    {new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </motion.div>
                        )) : (
                            <p className="text-center text-gray-500 py-8">No sessions for this day.</p>
                        )}
                    </div>
                </div>
            </div>
            <SessionDetailsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                session={selectedSession}
                member={users.find(u => u.id === selectedSession?.memberId)}
                onUpdateStatus={onUpdateSessionStatus}
            />
        </>
    );
};

export default WeeklyScroller;
