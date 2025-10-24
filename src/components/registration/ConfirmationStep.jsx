import React from 'react';
import { getPlans } from '../../data/mockData';
import { CheckCircle } from 'lucide-react';

const ConfirmationStep = ({ data, onConfirm, onBack }) => {
    const plans = getPlans();
    const selectedPlan = plans.find(p => p.id === data.membership.planId);

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">5. Confirm & Finish</h3>
            <div className="p-6 bg-white rounded-lg border border-gray-200 space-y-4">
                <h4 className="text-xl font-bold text-gray-800 font-display">Registration Summary</h4>
                
                <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-semibold mb-2">Personal Details</h5>
                    <p><strong>Name:</strong> {data.personal.name}</p>
                    <p><strong>Email:</strong> {data.personal.email}</p>
                    <p><strong>Contact:</strong> {data.personal.contact}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-semibold mb-2">Membership Details</h5>
                    <p><strong>Plan:</strong> {selectedPlan?.name || 'N/A'}</p>
                    <p><strong>Start Date:</strong> {new Date(data.membership.startDate).toLocaleDateString()}</p>
                    <p><strong>Payment Due:</strong> {selectedPlan?.price.toFixed(3) || '0.000'} OMR</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-semibold mb-2">Access Details</h5>
                    <p><strong>Type:</strong> {data.access.type}</p>
                    <p><strong>Status:</strong> {data.access.status}</p>
                </div>
            </div>
            <div className="pt-4 flex justify-between">
                <button onClick={onBack} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Back</button>
                <button onClick={onConfirm} className="px-8 py-3 bg-brand-green text-white rounded-lg hover:bg-green-600 flex items-center gap-2 text-lg font-semibold">
                    <CheckCircle size={22} /> Confirm Registration
                </button>
            </div>
        </div>
    );
};

export default ConfirmationStep;
