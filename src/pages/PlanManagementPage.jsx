import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { getPlans, getUsers } from '../data/mockData';
import PlanCard from '../components/plans/PlanCard';
import PlanFormModal from '../components/plans/PlanFormModal';
import AssignPlanModal from '../components/plans/AssignPlanModal';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';
import FloatingActionButton from '../components/shared/FloatingActionButton';

const PlanManagementPage = () => {
    const [plans, setPlans] = useState(getPlans());
    const [users] = useState(getUsers()); // For assign modal
    
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const [editingPlan, setEditingPlan] = useState(null);
    const [assigningPlan, setAssigningPlan] = useState(null);
    const [deactivatingPlan, setDeactivatingPlan] = useState(null);

    const handleAddPlan = () => {
        setEditingPlan(null);
        setIsFormModalOpen(true);
    };

    const handleEditPlan = (plan) => {
        setEditingPlan(plan);
        setIsFormModalOpen(true);
    };

    const handleDeactivatePlan = (plan) => {
        setDeactivatingPlan(plan);
        setIsConfirmOpen(true);
    };
    
    const handleAssignPlan = (plan) => {
        setAssigningPlan(plan);
        setIsAssignModalOpen(true);
    };

    const confirmDeactivate = () => {
        const newStatus = deactivatingPlan.status === 'Active' ? 'Inactive' : 'Active';
        setPlans(plans.map(p => p.id === deactivatingPlan.id ? { ...p, status: newStatus } : p));
        toast.success(`Plan "${deactivatingPlan.name}" has been ${newStatus.toLowerCase()}.`);
        setIsConfirmOpen(false);
        setDeactivatingPlan(null);
    };

    const handleSavePlan = (planData) => {
        if (editingPlan) {
            // Edit
            setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...planData } : p));
            toast.success('Plan updated successfully.');
        } else {
            // Add
            const newPlan = { id: `PLN-${Date.now()}`, ...planData };
            setPlans([newPlan, ...plans]);
            toast.success('Plan added successfully.');
        }
        setIsFormModalOpen(false);
        setEditingPlan(null);
    };
    
    const handleSaveAssignment = (assignmentData) => {
        console.log("Assignment Data:", assignmentData);
        toast.success(`Plan "${assignmentData.planName}" assigned to ${assignmentData.memberName}.`);
        setIsAssignModalOpen(false);
        setAssigningPlan(null);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold font-display text-gray-800">Plan Management</h1>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {plans.map(plan => (
                    <PlanCard 
                        key={plan.id}
                        plan={plan}
                        onEdit={() => handleEditPlan(plan)}
                        onAssign={() => handleAssignPlan(plan)}
                        onDeactivate={() => handleDeactivatePlan(plan)}
                    />
                ))}
            </motion.div>

            <FloatingActionButton onClick={handleAddPlan}>
                <Plus size={24} />
            </FloatingActionButton>

            <PlanFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleSavePlan}
                plan={editingPlan}
            />

            <AssignPlanModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                onAssign={handleSaveAssignment}
                plan={assigningPlan}
                users={users.filter(u => u.role === 'Member')}
                plans={plans}
            />

            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDeactivate}
                title={`Confirm ${deactivatingPlan?.status === 'Active' ? 'Deactivation' : 'Activation'}`}
                description={`Are you sure you want to ${deactivatingPlan?.status === 'Active' ? 'deactivate' : 'activate'} the "${deactivatingPlan?.name}" plan?`}
            />
        </motion.div>
    );
};

export default PlanManagementPage;
