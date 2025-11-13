import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MemberRegistrationWizard from '../components/registration/MemberRegistrationWizard';

const RegistrationPage = () => {
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegistrationSuccess = (newMember) => {
        toast.success(`Member ${newMember.personal.name} registered successfully!`);
        setIsWizardOpen(false);
        navigate(`/receptionist/members/${newMember.id}`);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-display text-gray-800">Member Registration</h1>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Register a New Gym Member</h2>
                    <p className="text-gray-500 mt-2 mb-6 max-w-lg mx-auto">
                        Use the registration wizard to capture all necessary details for a new member, including personal information, health data, and membership plans.
                    </p>
                    <button
                        onClick={() => setIsWizardOpen(true)}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
                    >
                        <UserPlus size={20} />
                        Register New Member
                    </button>
                </div>
            </motion.div>
            <MemberRegistrationWizard
                isOpen={isWizardOpen}
                onClose={() => setIsWizardOpen(false)}
                onSuccess={handleRegistrationSuccess}
            />
        </>
    );
};

export default RegistrationPage;
