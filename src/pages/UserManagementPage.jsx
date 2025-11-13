import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Tabs from '../components/shared/Tabs';
import StaffTab from '../components/users/StaffTab';
import MembersTab from '../components/users/MembersTab';
import RolesPermissionsTab from '../components/users/RolesPermissionsTab';
import FloatingActionButton from '../components/shared/FloatingActionButton';
import UserFormModal from '../components/users/UserFormModal';
import MemberRegistrationWizard from '../components/registration/MemberRegistrationWizard';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UserManagementPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [isMemberWizardOpen, setIsMemberWizardOpen] = useState(false);
    const navigate = useNavigate();

    const handleFabClick = () => {
        if (activeTab === 0) { // Staff tab
            setIsStaffModalOpen(true);
        } else if (activeTab === 1) { // Members tab
            setIsMemberWizardOpen(true);
        }
    };
    
    const handleMemberRegistrationSuccess = (newMember) => {
        toast.success(`Member ${newMember.personal.name} registered successfully!`);
        setIsMemberWizardOpen(false);
        // In a real app, you'd update a global state. For now, we navigate.
        navigate(`/admin/users/${newMember.id}`);
    };

    const tabs = [
        { label: 'Staff', content: <StaffTab /> },
        { label: 'Members', content: <MembersTab /> },
        { label: 'Role Management', content: <RolesPermissionsTab /> },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <h1 className="text-3xl font-bold font-display text-gray-800">User & Role Management</h1>
                
                <Tabs tabs={tabs} onTabChange={setActiveTab} />
                
                {(activeTab === 0 || activeTab === 1) && (
                    <FloatingActionButton onClick={handleFabClick}>
                        <Plus size={24} />
                    </FloatingActionButton>
                )}
            </motion.div>
            
            <UserFormModal
                isOpen={isStaffModalOpen}
                onClose={() => setIsStaffModalOpen(false)}
                onSave={() => {
                    toast.success("Staff member saved. (Refresh to see changes in mock data)");
                    setIsStaffModalOpen(false);
                }}
                user={null}
            />

            <MemberRegistrationWizard
                isOpen={isMemberWizardOpen}
                onClose={() => setIsMemberWizardOpen(false)}
                onSuccess={handleMemberRegistrationSuccess}
            />
        </>
    );
};

export default UserManagementPage;
