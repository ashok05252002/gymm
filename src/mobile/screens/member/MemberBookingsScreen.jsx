import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getMemberBookings } from '../../../data/mockData';
import toast from 'react-hot-toast';
import CancelSessionConfirmationModal from '../../components/popups/CancelSessionConfirmationModal';

const sessionStatusColors = {
    Confirmed: 'border-green-500',
    Completed: 'border-gray-400',
    Cancelled: 'border-red-500',
};

const MemberBookingsScreen = () => {
    const [bookings, setBookings] = useState(getMemberBookings());
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);

    const handleCancelClick = (booking) => {
        setBookingToCancel(booking);
        setIsCancelConfirmOpen(true);
    };

    const confirmCancellation = () => {
        setBookings(prev => prev.map(b => b.id === bookingToCancel.id ? { ...b, status: 'Cancelled' } : b));
        toast.error("Session cancelled.");
        setIsCancelConfirmOpen(false);
        setBookingToCancel(null);
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
                                    <button onClick={() => handleCancelClick(booking)} className="text-xs font-medium text-red-500 hover:underline">
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </motion.div>
            <CancelSessionConfirmationModal
                isOpen={isCancelConfirmOpen}
                onClose={() => setIsCancelConfirmOpen(false)}
                onConfirm={confirmCancellation}
                booking={bookingToCancel}
            />
        </>
    );
};

export default MemberBookingsScreen;
