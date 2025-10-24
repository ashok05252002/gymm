import React from 'react';
import { UserPlus } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

const AllPlansTab = ({ plans, onAssign }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Available Membership Plans</h3>
            <div className="space-y-3">
                {plans.map(plan => (
                    <div key={plan.id} className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center">
                        <div className="mb-3 sm:mb-0">
                            <div className="flex items-center gap-3">
                                <h4 className="font-bold text-gray-800">{plan.name}</h4>
                                <StatusBadge status={plan.status} />
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                {plan.price.toFixed(3)} OMR / {plan.duration}
                            </p>
                        </div>
                        <button
                            onClick={() => onAssign(plan)}
                            className="px-4 py-2 text-sm font-medium text-white bg-brand-green rounded-lg hover:bg-green-600 flex items-center gap-2 self-start sm:self-center"
                            disabled={plan.status !== 'Active'}
                        >
                            <UserPlus size={16} /> Assign Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPlansTab;
