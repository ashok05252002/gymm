import React, { useState } from 'react';
import toast from 'react-hot-toast';

const MembershipInfoStep = ({ data, onNext, onBack, trainers, plans }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContinue = () => {
        if (!formData.planId || !formData.startDate) {
            toast.error('Please select a plan and start date.');
            return;
        }
        onNext({ membership: formData });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">3. Membership Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Selected Plan</label>
                    <select name="planId" value={formData.planId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                        <option value="" disabled>Select a plan</option>
                        {plans.filter(p => p.status === 'Active').map(p => (
                            <option key={p.id} value={p.id}>{p.name} - {p.price.toFixed(3)} OMR</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned Trainer</label>
                    <select name="assignedTrainer" value={formData.assignedTrainer} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option>None</option>
                        {trainers.map(trainer => (
                            <option key={trainer.id} value={trainer.name}>{trainer.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="pt-4 flex justify-between">
                <button onClick={onBack} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Back</button>
                <button onClick={handleContinue} className="px-6 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save & Continue</button>
            </div>
        </div>
    );
};

export default MembershipInfoStep;
