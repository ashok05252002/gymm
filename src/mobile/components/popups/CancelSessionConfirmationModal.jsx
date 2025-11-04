import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

const CancelSessionConfirmationModal = ({ isOpen, onClose, onConfirm, booking }) => {
    if (!booking) return null;

    const timeUntilSession = new Date(booking.dateTime) - new Date();
    const isPenaltyFree = timeUntilSession > 1 * 60 * 60 * 1000; // More than 1 hour away

    const message = isPenaltyFree
        ? "Are you sure you want to cancel this session? This can be done without penalty."
        : "This session is less than 1 hour away. Cancelling now will still deduct the session from your plan. Do you wish to proceed?";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white w-full max-w-sm rounded-3xl p-6 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${isPenaltyFree ? 'bg-yellow-100' : 'bg-red-100'}`}>
                            <AlertTriangle className={`h-6 w-6 ${isPenaltyFree ? 'text-yellow-600' : 'text-red-600'}`} aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mt-4">Confirm Cancellation</h3>
                        <p className="text-sm text-gray-500 mt-2">{message}</p>
                        
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                onClick={onClose}
                                className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-xl"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={onConfirm}
                                className="w-full bg-brand-red text-white font-bold py-3 rounded-xl"
                            >
                                Cancel Session
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CancelSessionConfirmationModal;
