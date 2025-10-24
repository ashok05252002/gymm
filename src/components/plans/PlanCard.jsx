import React from 'react';
import { motion } from 'framer-motion';
import { Edit, UserPlus, Power } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

const PlanCard = ({ plan, onEdit, onAssign, onDeactivate }) => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const isInactive = plan.status === 'Inactive';

    return (
        <motion.div 
            variants={itemVariants}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden transition-all ${isInactive ? 'opacity-60' : ''}`}
        >
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold font-display text-gray-800">{plan.name}</h3>
                    <StatusBadge status={plan.status} />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-brand-dark">{plan.price.toFixed(3)}</span>
                    <span className="text-gray-500 text-xl font-semibold">OMR</span>
                    <span className="text-gray-500">/ {plan.duration}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{plan.accessType}</p>
                
                <ul className="mt-6 space-y-2 text-sm text-gray-600">
                    {plan.features.split(',').map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>{feature.trim()}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                <button onClick={onEdit} className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2">
                    <Edit size={16} /> Edit
                </button>
                <button onClick={onAssign} className="px-3 py-2 text-sm font-medium text-white bg-brand-green rounded-lg hover:bg-green-600 flex items-center gap-2">
                    <UserPlus size={16} /> Assign
                </button>
                <button onClick={onDeactivate} className={`px-3 py-2 text-sm font-medium text-white rounded-lg flex items-center gap-2 ${plan.status === 'Active' ? 'bg-brand-red hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                    <Power size={16} /> {plan.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
            </div>
        </motion.div>
    );
};

export default PlanCard;
