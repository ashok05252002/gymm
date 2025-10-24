import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, HelpCircle, Bell, CalendarClock, UserPlus } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import { getReceptionistKpiData } from '../data/mockData';
import MemberRegistrationWizard from '../components/registration/MemberRegistrationWizard';

const ReceptionistDashboard = () => {
    const [kpiData, setKpiData] = useState(getReceptionistKpiData());
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const handleRegistrationSuccess = (newMember) => {
        console.log("New member registered:", newMember);
        // In a real app, you would update a global state of users
        setIsWizardOpen(false);
        navigate(`/receptionist/members/${newMember.id}`);
    };

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                <h1 className="text-3xl font-bold font-display text-gray-800">Receptionist Dashboard</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard title="Today's Check-ins" value={kpiData.todaysCheckIns} icon={CheckSquare} change="+10%" changeType="increase" color="blue" />
                    <KPICard title="New Enquiries" value={kpiData.newEnquiries} icon={HelpCircle} change="+3" changeType="increase" color="green" />
                    <KPICard title="Pending Follow-ups" value={kpiData.pendingFollowUps} icon={Bell} change="+5" changeType="increase" color="orange" />
                    <KPICard title="Upcoming Renewals" value={kpiData.upcomingRenewals} icon={CalendarClock} change="-1" changeType="decrease" color="red" />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 font-display">Quick Actions</h3>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                         <button onClick={() => navigate('/receptionist/check-in')} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors">
                            <CheckSquare className="w-8 h-8 mb-2 text-blue-500" />
                            <p className="font-semibold text-gray-700">Member Check-in</p>
                        </button>
                        <button onClick={() => navigate('/receptionist/enquiries')} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors">
                            <HelpCircle className="w-8 h-8 mb-2 text-green-500" />
                            <p className="font-semibold text-gray-700">Add Enquiry</p>
                        </button>
                        <button onClick={() => setIsWizardOpen(true)} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors">
                            <UserPlus className="w-8 h-8 mb-2 text-brand-red" />
                            <p className="font-semibold text-gray-700">Register Member</p>
                        </button>
                         <button onClick={() => navigate('/receptionist/schedule')} className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors">
                            <CalendarClock className="w-8 h-8 mb-2 text-orange-500" />
                            <p className="font-semibold text-gray-700">View Schedule</p>
                        </button>
                    </div>
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

export default ReceptionistDashboard;
