import React from 'react';
import { motion } from 'framer-motion';

const eventColors = {
    session: 'bg-green-500',
    followUp: 'bg-yellow-500',
    payment: 'bg-red-500',
    announcement: 'bg-purple-500',
};

const CalendarSidebar = ({ events }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todaysEvents = events
        .filter(event => {
            const eventStart = new Date(event.start);
            eventStart.setHours(0, 0, 0, 0);
            return eventStart.getTime() === today.getTime();
        })
        .sort((a, b) => new Date(a.start) - new Date(b.start));

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col"
        >
            <h3 className="text-lg font-bold text-gray-800 font-display mb-4">Today's Focus</h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {todaysEvents.length > 0 ? (
                    todaysEvents.map(event => (
                        <div key={event.id} className="flex items-start gap-3">
                            <div className={`w-1.5 h-10 rounded-full ${eventColors[event.extendedProps.type] || 'bg-gray-400'}`}></div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                                <p className="text-xs text-gray-500">
                                    {event.allDay ? 'All Day' : new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-sm text-gray-500">No events scheduled for today.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default CalendarSidebar;
