import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const RuleFormModal = ({ isOpen, onClose, onSave, rule, plans }) => {
    const initialFormState = {
        name: '',
        planId: '',
        maxSessions: 'Unlimited',
        startTime: '05:00',
        endTime: '23:00',
        behavior: 'Block',
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (rule) {
            const [startTime, endTime] = rule.timeWindow.split(' - ');
            setFormData({
                name: rule.name || '',
                planId: rule.planId || '',
                maxSessions: rule.maxSessions || 'Unlimited',
                startTime: startTime || '05:00',
                endTime: endTime || '23:00',
                behavior: rule.behavior || 'Block',
            });
        } else {
            setFormData({...initialFormState, planId: plans.length > 0 ? plans[0].id : ''});
        }
    }, [rule, isOpen, plans]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.planId) {
            toast.error('Rule Name and Linked Plan are required.');
            return;
        }
        onSave({ ...formData, timeWindow: `${formData.startTime} - ${formData.endTime}` });
    };

    const isEditing = !!rule;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Access Rule' : 'Add New Access Rule'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rule Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Linked Plan</label>
                    <select name="planId" value={formData.planId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required>
                        {plans.filter(p => p.status === 'Active').map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Max Sessions</label>
                        <input type="text" name="maxSessions" value={formData.maxSessions} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Behavior</label>
                        <select name="behavior" value={formData.behavior} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red">
                            <option>Block</option>
                            <option>Notify</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Time Restriction</label>
                    <div className="flex items-center gap-2 mt-1">
                        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
                        <span>to</span>
                        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
                    </div>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save Rule</button>
                </div>
            </form>
        </Modal>
    );
};

export default RuleFormModal;
