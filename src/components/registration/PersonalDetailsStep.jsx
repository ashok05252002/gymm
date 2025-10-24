import React, { useState } from 'react';
import toast from 'react-hot-toast';

const PersonalDetailsStep = ({ data, onNext }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContinue = () => {
        if (!formData.name || !formData.contact || !formData.email || !formData.dob) {
            toast.error('Please fill all required fields.');
            return;
        }
        onNext({ personal: formData });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">1. Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                    <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                    <input type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
            </div>
            <div className="pt-4 flex justify-end">
                <button onClick={handleContinue} className="px-6 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save & Continue</button>
            </div>
        </div>
    );
};

export default PersonalDetailsStep;
