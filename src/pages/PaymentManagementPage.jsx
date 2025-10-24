import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { getPayments, getUsers, getPlans } from '../data/mockData';
import FloatingActionButton from '../components/shared/FloatingActionButton';
import PaymentsTable from '../components/payments/PaymentsTable';
import AddPaymentModal from '../components/payments/AddPaymentModal';
import ReceiptModal from '../components/payments/ReceiptModal';

const PaymentManagementPage = () => {
    const [payments, setPayments] = useState(getPayments());
    const [users] = useState(getUsers());
    const [plans] = useState(getPlans());
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [activePayment, setActivePayment] = useState(null);

    const handleAddPayment = () => setIsAddModalOpen(true);

    const handleSavePayment = (paymentData) => {
        const newPayment = {
            id: `PAY-${Date.now()}`,
            ...paymentData,
            date: new Date(),
            status: 'Completed'
        };
        setPayments([newPayment, ...payments]);
        setIsAddModalOpen(false);
        toast.success('Payment recorded successfully.');
        
        setActivePayment(newPayment);
        setIsReceiptModalOpen(true);
    };

    const handleViewReceipt = (payment) => {
        setActivePayment(payment);
        setIsReceiptModalOpen(true);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <h1 className="text-3xl font-bold font-display text-gray-800">Payment Management</h1>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <PaymentsTable payments={payments} onViewReceipt={handleViewReceipt} />
                </div>

                <FloatingActionButton onClick={handleAddPayment}>
                    <Plus size={24} />
                </FloatingActionButton>
            </motion.div>

            <AddPaymentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSavePayment}
                members={users.filter(u => u.role === 'Member')}
                plans={plans}
            />

            <ReceiptModal
                isOpen={isReceiptModalOpen}
                onClose={() => setIsReceiptModalOpen(false)}
                payment={activePayment}
            />
        </>
    );
};

export default PaymentManagementPage;
