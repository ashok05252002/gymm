import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const BookSessionModal = ({ isOpen, onClose, onSave, members, trainers }) => {
    const getTodayString = () => new Date().toISOString().split('T')[0];
    const getCurrentTimeString = () => new Date().toTimeString().slice(0, 5);

    const initialFormState = {
        memberId: '',
        trainerId: '',
        date: getTodayString(),
        time: getCurrentTimeString(),
        sessionType: 'Personal',
        remarks: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                ...initialFormState,
                memberId: members.length > 0 ? members[0].id : '',
                trainerId: trainers.length > 0 ? trainers[0].id : '',
            });
        }
    }, [isOpen, members, trainers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.memberId || !formData.trainerId || !formData.date || !formData.time) {
            toast.error('Please fill all required fields.');
            return;
        }
        const member = members.find(m => m.id === formData.memberId);
        const trainer = trainers.find(t => t.id === formData.trainerId);
        
        onSave({
            memberId: formData.memberId,
            memberName: member.name,
            trainerId: formData.trainerId,
            trainerName: trainer.name,
            dateTime: new Date(`${formData.date}T${formData.time}`),
            sessionType: formData.sessionType,
            remarks: formData.remarks,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Book New Session">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Member</label>
                    <select name="memberId" value={formData.memberId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                        {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Trainer</label>
                    <select name="trainerId" value={formData.trainerId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                        {trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input type="time" name="time" value={formData.time} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Session Type</label>
                    <select name="sessionType" value={formData.sessionType} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option>Personal</option>
                        <option>Group</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Remarks</label>
                    <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="2" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Book Session</button>
                </div>
            </form>
        </Modal>
    );
};

export default BookSessionModal;
