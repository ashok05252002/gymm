import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';
import ToggleSwitch from '../shared/ToggleSwitch';

const ManualEntryModal = ({ isOpen, onClose, onSave, members }) => {
    const getCurrentTimeString = () => new Date().toTimeString().slice(0, 5);

    const initialFormState = {
        memberId: '',
        timeIn: getCurrentTimeString(),
        timeOut: '',
        notes: '',
        override: false,
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                ...initialFormState,
                memberId: members.length > 0 ? members[0].id : '',
            });
        }
    }, [isOpen, members]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (checked) => {
        setFormData(prev => ({ ...prev, override: checked }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.memberId) {
            toast.error('Please select a member.');
            return;
        }
        const member = members.find(m => m.id === formData.memberId);
        onSave({ ...formData, memberName: member.name });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Manual Member Entry">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Member Search</label>
                    <select name="memberId" value={formData.memberId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                        {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time In</label>
                        <input type="time" name="timeIn" value={formData.timeIn} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Time Out</label>
                        <input type="time" name="timeOut" value={formData.timeOut} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Override Access</label>
                        <p className="text-xs text-gray-500">Allow entry even if plan is expired/blocked.</p>
                    </div>
                    <ToggleSwitch enabled={formData.override} setEnabled={handleToggle} />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save Entry</button>
                </div>
            </form>
        </Modal>
    );
};

export default ManualEntryModal;
