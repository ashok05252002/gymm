import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const eventTypes = [
    { id: 'session', label: 'Member Session' },
    { id: 'followUp', label: 'Enquiry Follow-Up' },
    { id: 'announcement', label: 'Announcement' },
];

const calendarColors = {
    session: '#00C853',
    followUp: '#FFC107',
    announcement: '#9C27B0',
};

// Define a function to generate the initial state, ensuring all fields are defined
const getInitialState = (initialDate, users) => {
    const dateStr = initialDate ? new Date(initialDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    const timeStr = initialDate ? new Date(initialDate).toTimeString().slice(0, 5) : '10:00';
    
    const members = users.filter(u => u.role === 'Member');
    const trainers = users.filter(u => u.role === 'Trainer');

    return {
        title: '',
        startDate: dateStr,
        startTime: timeStr,
        endDate: dateStr,
        endTime: timeStr,
        memberId: members.length > 0 ? members[0].id : '',
        trainerId: trainers.length > 0 ? trainers[0].id : '',
        description: '',
    };
};

const EventCreationModal = ({ isOpen, onClose, onCreate, date, users }) => {
    const [eventType, setEventType] = useState('session');
    // Initialize state with a complete object to avoid uncontrolled -> controlled warning
    const [formData, setFormData] = useState(getInitialState(date, users));

    const members = users.filter(u => u.role === 'Member');
    const trainers = users.filter(u => u.role === 'Trainer');

    useEffect(() => {
        if (isOpen) {
            // Reset form with potentially new date when modal re-opens
            setFormData(getInitialState(date, users));
        }
    }, [isOpen, date, users]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title) {
            toast.error('Event title is required.');
            return;
        }

        const start = new Date(`${formData.startDate}T${formData.startTime}`);
        const end = new Date(`${formData.endDate}T${formData.endTime}`);

        const newEvent = {
            id: `evt-${Date.now()}`,
            title: formData.title,
            start,
            end,
            color: calendarColors[eventType],
            extendedProps: {
                type: eventType,
                description: formData.description,
                ...(eventType === 'session' && { 
                    memberId: formData.memberId,
                    memberName: users.find(u => u.id === formData.memberId)?.name,
                    trainerId: formData.trainerId,
                    trainerName: users.find(u => u.id === formData.trainerId)?.name,
                }),
            }
        };

        onCreate(newEvent);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Calendar Event">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Event Type</label>
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        {eventTypes.map(et => <option key={et.id} value={et.id}>{et.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                
                {eventType === 'session' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Member</label>
                            <select name="memberId" value={formData.memberId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Trainer</label>
                            <select name="trainerId" value={formData.trainerId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                                {trainers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                    </>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>

                {eventType === 'announcement' && (
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                    </div>
                )}

                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save Event</button>
                </div>
            </form>
        </Modal>
    );
};

export default EventCreationModal;
