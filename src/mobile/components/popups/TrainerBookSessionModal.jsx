import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const TrainerBookSessionModal = ({ isOpen, onClose, onSave, clients, trainer }) => {
    const getTodayString = () => new Date().toISOString().split('T')[0];
    const getCurrentTimeString = () => {
        const now = new Date();
        now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30); // Round up to next 30 mins
        return now.toTimeString().slice(0, 5);
    };

    const getInitialState = () => ({
        clientId: clients.length > 0 ? clients[0].id : '',
        date: getTodayString(),
        time: getCurrentTimeString(),
        sessionType: 'Personal',
    });

    const [formData, setFormData] = useState(getInitialState());

    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialState());
        }
    }, [isOpen, clients]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.clientId || !formData.date || !formData.time) {
            toast.error("Please select a client, date, and time.");
            return;
        }
        const client = clients.find(c => c.id === formData.clientId);
        onSave({
            memberId: formData.clientId,
            memberName: client.name,
            trainerId: trainer.id,
            trainerName: trainer.name,
            dateTime: new Date(`${formData.date}T${formData.time}`),
            sessionType: formData.sessionType,
        });
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
                        className="bg-gray-50 w-full max-w-lg rounded-t-3xl h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                            <h2 className="text-lg font-bold text-gray-800">Book Session for Client</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><X size={20} /></button>
                        </div>
                        <div className="p-4 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Client</label>
                                <select name="clientId" value={formData.clientId} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white">
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Date & Time</label>
                                <div className="grid grid-cols-2 gap-4 mt-1">
                                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl" />
                                    <input type="time" name="time" value={formData.time} onChange={handleChange} step="1800" className="w-full p-3 border border-gray-300 rounded-xl" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Session Type</label>
                                <select name="sessionType" value={formData.sessionType} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white">
                                    <option>Personal</option>
                                    <option>Group</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 flex-shrink-0">
                            <button onClick={handleSubmit} className="w-full bg-brand-red text-white font-bold py-4 rounded-2xl">Confirm Booking</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TrainerBookSessionModal;
