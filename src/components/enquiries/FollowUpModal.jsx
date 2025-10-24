import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const FollowUpModal = ({ isOpen, onClose, onSave, enquiry }) => {
    const getTodayString = () => new Date().toISOString().split('T')[0];
    const getCurrentTimeString = () => new Date().toTimeString().slice(0, 5);

    const [date, setDate] = useState(getTodayString());
    const [time, setTime] = useState(getCurrentTimeString());
    const [method, setMethod] = useState('Call');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (isOpen) {
            setDate(getTodayString());
            setTime(getCurrentTimeString());
            setMethod('Call');
            setNotes('');
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !time) {
            toast.error('Follow-up date and time are required.');
            return;
        }
        const followUpDateTime = new Date(`${date}T${time}`);
        onSave({
            nextFollowUp: followUpDateTime,
            followUpNotes: notes,
            followUpMethod: method,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Schedule Follow-up for ${enquiry?.name}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Method</label>
                    <select value={method} onChange={(e) => setMethod(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red">
                        <option>Call</option>
                        <option>WhatsApp</option>
                        <option>Email</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"></textarea>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save Reminder</button>
                </div>
            </form>
        </Modal>
    );
};

export default FollowUpModal;
