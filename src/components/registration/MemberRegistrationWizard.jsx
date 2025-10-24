import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import StepIndicator from './StepIndicator';
import PersonalDetailsStep from './PersonalDetailsStep';
import HealthInfoStep from './HealthInfoStep';
import MembershipInfoStep from './MembershipInfoStep';
import AccessSetupStep from './AccessSetupStep';
import ConfirmationStep from './ConfirmationStep';
import { getPlans, getUsers } from '../../data/mockData';

const steps = [
    { name: 'Personal' },
    { name: 'Health' },
    { name: 'Membership' },
    { name: 'Access' },
    { name: 'Confirm' },
];

const MemberRegistrationWizard = ({ isOpen, onClose, onSuccess, initialData, conversionData }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        personal: {},
        health: {},
        membership: {},
        access: {},
    });

    useEffect(() => {
        if (isOpen) {
            // Reset form when opening
            setCurrentStep(0);
            const initialPersonal = {
                name: initialData?.name || '',
                email: initialData?.email || '',
                contact: initialData?.contact || '',
                dob: '',
                gender: 'Male',
                address: '',
                emergencyContactName: '',
                emergencyContactPhone: '',
            };
            const initialMembership = {
                planId: conversionData?.planId || '',
                assignedTrainer: initialData?.assignedTrainer || 'None',
                startDate: new Date().toISOString().split('T')[0],
            };
            setFormData({
                personal: initialPersonal,
                health: { height: '', weight: '', level: 'Beginner', conditions: '', goals: initialData?.goal || '' },
                membership: initialMembership,
                access: { type: conversionData?.accessType || 'RFID', status: 'Active', notes: '' },
            });
        }
    }, [isOpen, initialData, conversionData]);

    const handleNext = (data) => {
        setFormData(prev => ({ ...prev, ...data }));
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleConfirm = () => {
        const newMember = {
            id: `USR-${Date.now()}`,
            ...formData,
        };
        onSuccess(newMember);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <PersonalDetailsStep data={formData.personal} onNext={handleNext} />;
            case 1:
                return <HealthInfoStep data={formData.health} onNext={handleNext} onBack={handleBack} />;
            case 2:
                const trainers = getUsers().filter(u => u.role === 'Trainer');
                const plans = getPlans();
                return <MembershipInfoStep data={formData.membership} onNext={handleNext} onBack={handleBack} trainers={trainers} plans={plans} />;
            case 3:
                return <AccessSetupStep data={formData.access} onNext={handleNext} onBack={handleBack} />;
            case 4:
                return <ConfirmationStep data={formData} onConfirm={handleConfirm} onBack={handleBack} />;
            default:
                return null;
        }
    };

    const backdropVariants = { visible: { opacity: 1 }, hidden: { opacity: 0 } };
    const modalVariants = {
        hidden: { y: "50px", opacity: 0 },
        visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
        exit: { y: "50px", opacity: 0 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    variants={backdropVariants} initial="hidden" animate="visible" exit="hidden"
                >
                    <motion.div
                        className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-3xl flex flex-col h-[90vh]"
                        variants={modalVariants} onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white rounded-t-xl">
                            <h3 className="text-xl font-bold font-display text-gray-800">New Member Registration</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition"><X size={24} /></button>
                        </div>
                        <div className="p-4 sm:p-6">
                            <StepIndicator steps={steps} currentStep={currentStep} />
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            {renderStep()}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MemberRegistrationWizard;
