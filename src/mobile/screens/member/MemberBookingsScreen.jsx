import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getMemberBookings, getUsers } from '../../../data/mockData';
import toast from 'react-hot-toast';
import MemberBookSessionModal from '../../components/popups/MemberBookSessionModal';

const sessionStatusColors = {
    Confirmed: 'border-green-500',
    Completed: 'border-gray-400',
    Cancelled: 'border-red-500',
};

const MemberBookingsScreen = () => {
    const [bookings, setBookings] = useState(getMemberBookings());
    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [sessionToReschedule, setSessionToReschedule] = useState(null);
    const trainers = getUsers().filter(u => u.role === 'Trainer');

    const handleCancel = (bookingId) => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
        toast.error("Session cancelled.");
    };

    const handleReschedule = (booking) => {
        setSessionToReschedule(booking);
        setIsRescheduleModalOpen(true);
    };
    
    const handleSaveReschedule = (rescheduleData) => {
        setBookings(prev => prev.map(b => 
            b.id === sessionToReschedule.id 
            ? { ...b, ...rescheduleData, dateTime: new Date(`${rescheduleData.date}T${rescheduleData.time}`) } 
            : b
        ));
        toast.success("Session rescheduled successfully!");
        setIsRescheduleModalOpen(false);
        setSessionToReschedule(null);
    };

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">My Bookings</h1>
                <div className="space-y-4">
                    {bookings.map(booking => (
                        <div key={booking.id} className={`bg-white p-4 rounded-3xl shadow-sm border-l-4 ${sessionStatusColors[booking.status]}`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold">{new Date(booking.dateTime).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                                    <p className="text-sm text-gray-500">{new Date(booking.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} with {booking.trainerName}</p>
                                </div>
                                <span className="text-xs font-semibold text-gray-600">{booking.sessionType}</span>
                            </div>
                            {booking.status === 'Confirmed' && (
                                <div className="text-right mt-2 flex gap-4 justify-end">
                                    <button onClick={() => handleReschedule(booking)} className="text-xs font-medium text-blue-500 hover:underline">
                                        Reschedule
                                    </button>
                                    <button onClick={() => handleCancel(booking.id)} className="text-xs font-medium text-red-500 hover:underline">
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
            <MemberBookSessionModal
                isOpen={isRescheduleModalOpen}
                onClose={() => setIsRescheduleModalOpen(false)}
                onSave={handleSaveReschedule}
                trainers={trainers}
                session={sessionToReschedule}
            />
        </>
    );
};

export default MemberBookingsScreen;
