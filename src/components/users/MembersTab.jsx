import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { getUsers } from '../../data/mockData';
import UserToolbar from './UserToolbar';
import UserTable from './UserTable';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import BlockUserModal from './BlockUserModal';

const MembersTab = () => {
    const [allUsers, setAllUsers] = useState(getUsers());
    const memberUsers = useMemo(() => allUsers.filter(u => u.role === 'Member'), [allUsers]);

    const [filters, setFilters] = useState({ search: '', role: 'All', status: 'All' });
    
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [actionUser, setActionUser] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);
    
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

    const handleDeleteUser = (user) => {
        setActionUser(user);
        setConfirmAction('delete');
        setIsConfirmOpen(true);
    };

    const handleBlockUser = (user) => {
        setActionUser(user);
        if (user.status === 'Blocked') {
            setConfirmAction('unblock');
            setIsConfirmOpen(true);
            return;
        }

        const latestPlan = user.planHistory?.[0];
        if (latestPlan?.status !== 'Active') {
            setConfirmAction('block');
            setIsConfirmOpen(true);
        } else {
            setIsBlockModalOpen(true);
        }
    };

    const confirmActionHandler = (reason) => {
        if (!actionUser) return;

        if (confirmAction === 'delete') {
            setAllUsers(allUsers.filter(u => u.id !== actionUser.id));
            toast.success(`Member "${actionUser.name}" has been removed.`);
        } else if (confirmAction === 'block') {
            setAllUsers(allUsers.map(u => u.id === actionUser.id ? { ...u, status: 'Blocked' } : u));
            toast.success(`Member "${actionUser.name}" has been blocked. ${reason ? `Reason: ${reason}` : ''}`);
        } else if (confirmAction === 'unblock') {
            const latestPlan = actionUser.planHistory?.[0];
            const newStatus = latestPlan?.status === 'Active' ? 'Active' : 'Inactive';
            setAllUsers(allUsers.map(u => u.id === actionUser.id ? { ...u, status: newStatus } : u));
            toast.success(`Member "${actionUser.name}" has been unblocked.`);
        }
        
        setIsConfirmOpen(false);
        setIsBlockModalOpen(false);
        setActionUser(null);
        setConfirmAction(null);
    };

    const filteredUsers = useMemo(() => {
        return memberUsers.filter(user => {
            const searchLower = filters.search.toLowerCase();
            const nameMatch = user.name.toLowerCase().includes(searchLower);
            const emailMatch = user.email.toLowerCase().includes(searchLower);
            const statusMatch = filters.status === 'All' || user.status === filters.status;
            return (nameMatch || emailMatch) && statusMatch;
        });
    }, [memberUsers, filters]);

    const getConfirmationDialogProps = () => {
        switch (confirmAction) {
            case 'delete':
                return { title: 'Confirm Deletion', description: `Are you sure you want to remove member ${actionUser?.name}?` };
            case 'block':
                return { title: 'Confirm Block', description: `Are you sure you want to block ${actionUser?.name}?` };
            case 'unblock':
                return { title: 'Confirm Unblock', description: `Are you sure you want to unblock ${actionUser?.name}?` };
            default:
                return { title: '', description: '' };
        }
    };

    return (
        <div className="space-y-6">
            <UserToolbar filters={filters} onFilterChange={setFilters} />
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <UserTable 
                    users={filteredUsers} 
                    onEdit={() => {}} // Edit is handled via profile page for members
                    onDelete={handleDeleteUser}
                    onBlock={handleBlockUser}
                    isMembersTable={true}
                />
            </div>
            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmActionHandler}
                {...getConfirmationDialogProps()}
            />
            <BlockUserModal
                isOpen={isBlockModalOpen}
                onClose={() => setIsBlockModalOpen(false)}
                onConfirm={(reason) => confirmActionHandler(reason)}
                userName={actionUser?.name}
            />
        </div>
    );
};

export default MembersTab;
