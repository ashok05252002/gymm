import React, { useState } from 'react';
import ToggleSwitch from '../shared/ToggleSwitch';

const AccessSetupStep = ({ data, onNext, onBack }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (checked) => {
        setFormData(prev => ({ ...prev, status: checked ? 'Active' : 'Inactive' }));
    };

    const handleContinue = () => {
        onNext({ access: formData });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">4. Access Setup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Access Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option>RFID Card</option>
                        <option>QR Code</option>
                        <option>App Access</option>
                    </select>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <label className="block text-sm font-medium text-gray-700">Account Status</label>
                    <ToggleSwitch enabled={formData.status === 'Active'} setEnabled={handleToggle} />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
            </div>
            <div className="pt-4 flex justify-between">
                <button onClick={onBack} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Back</button>
                <button onClick={handleContinue} className="px-6 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save & Continue</button>
            </div>
        </div>
    );
};

export default AccessSetupStep;
