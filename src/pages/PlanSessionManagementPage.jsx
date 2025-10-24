import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { getPlans, getUsers, getSessions } from '../data/mockData';
import Tabs from '../components/shared/Tabs';
import FloatingActionButton from '../components/shared/FloatingActionButton';
import AllPlansTab from '../components/schedule/AllPlansTab';
import SessionsTab from '../components/schedule/SessionsTab';
import BookingCalendarTab from '../components/schedule/BookingCalendarTab';
import AssignPlanModal from '../components/plans/AssignPlanModal';
import BookSessionModal from '../components/schedule/BookSessionModal';
import CancelSessionModal from '../components/schedule/CancelSessionModal';

const PlanSessionManagementPage = () => {
    const [plans] = useState(getPlans());
    const [users] = useState(getUsers());
    const [sessions, setSessions] = useState(getSessions());

    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const [activePlan, setActivePlan] = useState(null);
    const [activeSession, setActiveSession] = useState(null);

    const handleOpenAssignModal = (plan) => {
        setActivePlan(plan);
        setIsAssignModalOpen(true);
    };

    const handleOpenBookModal = () => {
        setIsBookModalOpen(true);
    };

    const handleOpenCancelModal = (session) => {
        setActiveSession(session);
        setIsCancelModalOpen(true);
    };

    const handleSaveAssignment = (assignmentData) => {
        console.log("Assignment Data:", assignmentData);
        toast.success(`Plan "${assignmentData.planName}" assigned to ${assignmentData.memberName}.`);
        setIsAssignModalOpen(false);
        setActivePlan(null);
    };

    const handleSaveBooking = (bookingData) => {
        const newSession = {
            id: `SESS-${Date.now()}`,
            ...bookingData,
            status: 'Confirmed',
        };
        setSessions([newSession, ...sessions].sort((a,b) => a.dateTime - b.dateTime));
        toast.success('Session booked successfully.');
        setIsBookModalOpen(false);
    };

    const handleConfirmCancel = (reason) => {
        setSessions(sessions.map(s => 
            s.id === activeSession.id ? { ...s, status: 'Cancelled', cancellationReason: reason } : s
        ));
        toast.success('Session has been cancelled.');
        setIsCancelModalOpen(false);
        setActiveSession(null);
    };

    const activeSessions = sessions.filter(s => s.status === 'Confirmed' || s.status === 'Completed');
    const cancelledSessions = sessions.filter(s => s.status === 'Cancelled');

    const tabs = [
        { label: 'All Plans', content: <AllPlansTab plans={plans} onAssign={handleOpenAssignModal} /> },
        { label: 'Active Sessions', content: <SessionsTab sessions={activeSessions} onCancel={handleOpenCancelModal} /> },
        { label: 'Cancelled Sessions', content: <SessionsTab sessions={cancelledSessions} /> },
        { label: 'Booking Calendar', content: <BookingCalendarTab sessions={sessions} /> },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <h1 className="text-3xl font-bold font-display text-gray-800">Plan & Session Management</h1>
                <Tabs tabs={tabs} />

                <FloatingActionButton onClick={handleOpenBookModal}>
                    <Plus size={24} />
                </FloatingActionButton>
            </motion.div>

            <AssignPlanModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                onAssign={handleSaveAssignment}
                plan={activePlan}
                users={users.filter(u => u.role === 'Member')}
                plans={plans}
            />

            <BookSessionModal
                isOpen={isBookModalOpen}
                onClose={() => setIsBookModalOpen(false)}
                onSave={handleSaveBooking}
                members={users.filter(u => u.role === 'Member')}
                trainers={users.filter(u => u.role === 'Trainer')}
            />

            <CancelSessionModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={handleConfirmCancel}
                session={activeSession}
            />
        </>
    );
};

export default PlanSessionManagementPage;
