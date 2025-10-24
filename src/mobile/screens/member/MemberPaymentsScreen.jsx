import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getMemberData, getPayments, getPlans } from '../../../data/mockData';
import toast from 'react-hot-toast';
import BrowsePlansModal from '../../components/popups/BrowsePlansModal';

const PaymentStatusBadge = ({ status }) => {
    const statusClasses = {
        Completed: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Failed: 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>{status}</span>;
};

const MemberPaymentsScreen = () => {
    const { activePlan } = getMemberData();
    const payments = getPayments().slice(0, 5); // Mock: get payments for this member
    const allPlans = getPlans();
    const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);

    const handleSelectPlan = (plan) => {
        console.log("Selected Plan:", plan);
        toast.success(`Proceeding to payment for ${plan.name} plan.`);
        setIsPlansModalOpen(false);
        // Here you would navigate to a payment gateway or a confirmation screen
    };

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Payments</h1>

                <div className="bg-white p-5 rounded-3xl shadow-sm">
                    <p className="text-gray-500 text-sm">Current Plan</p>
                    <div className="flex justify-between items-center mt-1">
                        <p className="font-bold text-xl text-gray-800">{activePlan.planName}</p>
                        <p className="text-sm text-gray-500">Expires: {new Date(activePlan.endDate).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => setIsPlansModalOpen(true)} className="w-full mt-4 bg-brand-red text-white font-bold py-3 rounded-2xl">
                        Renew / Browse Plans
                    </button>
                </div>

                <div>
                    <h2 className="font-bold text-lg mb-3">Payment History</h2>
                    <div className="space-y-3">
                        {payments.map(payment => (
                            <div key={payment.id} className="bg-white p-4 rounded-2xl flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{payment.planName} Plan</p>
                                    <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{payment.amount.toFixed(3)} OMR</p>
                                    <PaymentStatusBadge status={payment.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
            <BrowsePlansModal
                isOpen={isPlansModalOpen}
                onClose={() => setIsPlansModalOpen(false)}
                plans={allPlans}
                onSelectPlan={handleSelectPlan}
            />
        </>
    );
};

export default MemberPaymentsScreen;
