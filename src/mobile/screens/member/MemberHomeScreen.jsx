import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getMemberData, getPlans } from '../../../data/mockData';
import { MessageSquare, Zap } from 'lucide-react';
import BrowsePlansModal from '../../components/popups/BrowsePlansModal';
import toast from 'react-hot-toast';

const MemberHomeScreen = () => {
    const { member, activePlan, trainer, kpis } = getMemberData();
    const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
    const allPlans = getPlans();

    const handleSelectPlan = (plan) => {
        console.log("Selected Plan:", plan);
        toast.success(`Proceeding to payment for ${plan.name} plan.`);
        setIsPlansModalOpen(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                <motion.button 
                    variants={itemVariants} 
                    className="w-full bg-white p-5 rounded-3xl shadow-sm text-left"
                    onClick={() => setIsPlansModalOpen(true)}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Active Plan</p>
                            <p className="font-bold text-xl text-gray-800">{activePlan.planName}</p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Expires on: {new Date(activePlan.endDate).toLocaleDateString()}</p>
                </motion.button>

                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-3xl shadow-sm flex flex-col items-center justify-center">
                        <div className="relative w-20 h-20">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    className="text-gray-200"
                                    strokeWidth="3" stroke="currentColor" fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-brand-green"
                                    strokeWidth="3" strokeDasharray={`${kpis.attendanceProgress}, 100`} strokeLinecap="round" stroke="currentColor" fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className="text-xl font-bold">{kpis.attendanceProgress}%</span>
                            </div>
                        </div>
                         <p className="font-bold text-gray-800 mt-2 text-center">Attendance</p>
                    </div>
                     <div className="bg-white p-5 rounded-3xl shadow-sm flex flex-col items-center justify-center">
                        <div className="w-20 h-20 flex items-center justify-center bg-red-50 rounded-full">
                            <Zap size={40} className="text-brand-red" />
                        </div>
                        <p className="font-bold text-gray-800 mt-2 text-center">Sessions Left</p>
                        <p className="text-3xl font-bold text-brand-red">{kpis.sessionsRemaining}</p>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={trainer.avatar} alt={trainer.name} className="w-12 h-12 rounded-full" />
                        <div>
                            <p className="text-sm text-gray-500">Your Trainer</p>
                            <p className="font-bold text-gray-800">{trainer.name}</p>
                        </div>
                    </div>
                    <button className="p-3 bg-red-50 rounded-full text-brand-red">
                        <MessageSquare size={22} />
                    </button>
                </motion.div>
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

export default MemberHomeScreen;
