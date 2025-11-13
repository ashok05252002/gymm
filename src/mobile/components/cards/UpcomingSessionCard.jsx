import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const UpcomingSessionCard = ({ session }) => {
    if (!session) {
        return (
            <div className="bg-white p-5 rounded-3xl shadow-sm text-center">
                <p className="font-semibold text-gray-700">No Upcoming Sessions</p>
                <p className="text-sm text-gray-500 mt-1">Book a new session to get started!</p>
            </div>
        );
    }

    const sessionDate = new Date(session.dateTime);

    return (
        <div className="bg-gradient-to-br from-brand-red to-orange-500 text-white p-5 rounded-3xl shadow-lg shadow-red-200">
            <p className="font-semibold text-sm opacity-80 mb-2">Next Upcoming Session</p>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="font-bold text-lg">{sessionDate.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span className="font-semibold">{sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-semibold">with {session.trainerName}</span>
                </div>
            </div>
        </div>
    );
};

export default UpcomingSessionCard;
