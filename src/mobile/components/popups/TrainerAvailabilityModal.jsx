import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const mockAvailability = {
    Mon: ['09:00', '11:00', '14:00', '16:00'],
    Tue: ['10:00', '12:00', '15:00'],
    Wed: ['09:00', '11:00', '17:00', '18:00'],
    Thu: ['10:00', '14:00'],
    Fri: ['09:00', '11:00', '13:00', '15:00'],
    Sat: ['10:00', '12:00'],
    Sun: [],
};

const TrainerAvailabilityModal = ({ isOpen, onClose, trainerName }) => {
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
                        className="bg-white w-full max-w-md rounded-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-md font-bold text-gray-800">{trainerName}'s Availability</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={20} /></button>
                        </div>
                        <div className="p-4 space-y-3">
                            {Object.entries(mockAvailability).map(([day, times]) => (
                                <div key={day} className="grid grid-cols-4 gap-2 items-start">
                                    <p className="col-span-1 font-semibold text-sm text-gray-700">{day}</p>
                                    <div className="col-span-3 flex flex-wrap gap-2">
                                        {times.length > 0 ? times.map(time => (
                                            <span key={time} className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-md">
                                                {time}
                                            </span>
                                        )) : (
                                            <span className="text-xs text-gray-400">Unavailable</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TrainerAvailabilityModal;
