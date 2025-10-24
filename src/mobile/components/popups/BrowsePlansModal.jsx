import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

const BrowsePlansModal = ({ isOpen, onClose, plans, onSelectPlan }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "100%" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-gray-50 w-full max-w-lg rounded-t-3xl h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                            <h2 className="text-lg font-bold text-gray-800">Browse & Renew Plans</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><X size={20} /></button>
                        </div>
                        <div className="p-4 space-y-4 overflow-y-auto flex-1">
                            {plans.filter(p => p.status === 'Active').map(plan => (
                                <div key={plan.id} className="bg-white p-4 rounded-2xl shadow-sm border-2 border-transparent hover:border-brand-red transition-colors">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-gray-800">{plan.name}</h3>
                                        <p className="font-bold text-lg text-brand-red">{plan.price.toFixed(3)} OMR</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{plan.duration}</p>
                                    <ul className="mt-3 space-y-1 text-xs text-gray-600">
                                        {plan.features.split(',').map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckCircle size={14} className="text-green-500" />
                                                <span>{feature.trim()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button 
                                        onClick={() => onSelectPlan(plan)}
                                        className="w-full mt-4 bg-red-50 text-brand-red font-bold py-2.5 rounded-xl"
                                    >
                                        Choose Plan
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BrowsePlansModal;
