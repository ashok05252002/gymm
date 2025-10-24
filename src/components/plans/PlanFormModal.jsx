import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';
import ToggleSwitch from '../shared/ToggleSwitch';

const PlanFormModal = ({ isOpen, onClose, onSave, plan }) => {
    const initialFormState = {
        name: '',
        duration: '30 Days',
        price: 0,
        accessType: 'Full Access',
        features: '',
        status: 'Active',
    };
    
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (plan) {
            setFormData({
                name: plan.name || '',
                duration: plan.duration || '30 Days',
                price: plan.price || 0,
                accessType: plan.accessType || 'Full Access',
                features: plan.features || '',
                status: plan.status || 'Active',
            });
        } else {
            setFormData(initialFormState);
        }
    }, [plan, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (checked) => {
        setFormData(prev => ({ ...prev, status: checked ? 'Active' : 'Inactive' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || formData.price <= 0 || !formData.duration) {
            toast.error('Plan Name, Price, and Duration are required.');
            return;
        }
        onSave(formData);
    };

    const isEditing = !!plan;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Plan' : 'Add New Plan'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration (e.g., 30 Days)</label>
                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price (OMR)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.001" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Access Type</label>
                    <select name="accessType" value={formData.accessType} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red">
                        <option>Full Access</option>
                        <option>Limited</option>
                        <option>Session-based</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
                    <textarea name="features" value={formData.features} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"></textarea>
                </div>
                
                <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <ToggleSwitch enabled={formData.status === 'Active'} setEnabled={handleToggle} />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save Plan</button>
                </div>
            </form>
        </Modal>
    );
};

export default PlanFormModal;
