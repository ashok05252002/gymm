import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const AssignPlanModal = ({ isOpen, onClose, onAssign, plan, users, plans }) => {
    const getTodayString = () => new Date().toISOString().split('T')[0];

    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedPlanId, setSelectedPlanId] = useState('');
    const [startDate, setStartDate] = useState(getTodayString());
    const [endDate, setEndDate] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (isOpen) {
            setSelectedPlanId(plan?.id || (plans.length > 0 ? plans[0].id : ''));
            setSelectedUserId(users.length > 0 ? users[0].id : '');
            setStartDate(getTodayString());
            setEndDate('');
            setNotes('');
        }
    }, [isOpen, plan, plans, users]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedUserId || !selectedPlanId || !startDate || !endDate) {
            toast.error('Please fill all required fields.');
            return;
        }
        const selectedUser = users.find(u => u.id === selectedUserId);
        const assignedPlan = plans.find(p => p.id === selectedPlanId);

        onAssign({
            userId: selectedUserId,
            memberName: selectedUser.name,
            planId: selectedPlanId,
            planName: assignedPlan.name,
            startDate,
            endDate,
            notes,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Assign Plan to Member">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Member</label>
                    <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Plan</label>
                    <select value={selectedPlanId} onChange={(e) => setSelectedPlanId(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required>
                        {plans.filter(p => p.status === 'Active').map(p => (
                            <option key={p.id} value={p.id}>{p.name} - {p.price.toFixed(3)} OMR</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-600">Assign Plan</button>
                </div>
            </form>
        </Modal>
    );
};

export default AssignPlanModal;
