import React, { useState } from 'react';

const HealthInfoStep = ({ data, onNext, onBack }) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContinue = () => {
        onNext({ health: formData });
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">2. Health Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                    <input type="number" name="height" value={formData.height} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fitness Level</label>
                    <select name="level" value={formData.level} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Medical Conditions (if any)</label>
                <textarea name="conditions" value={formData.conditions} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., Asthma, previous injuries..."></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Fitness Goals</label>
                <textarea name="goals" value={formData.goals} onChange={handleChange} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., Lose weight, build muscle..."></textarea>
            </div>
            <div className="pt-4 flex justify-between">
                <button onClick={onBack} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Back</button>
                <button onClick={handleContinue} className="px-6 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save & Continue</button>
            </div>
        </div>
    );
};

export default HealthInfoStep;
