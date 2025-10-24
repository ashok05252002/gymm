import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { getUsers } from '../../data/mockData';
import UserToolbar from './UserToolbar';
import UserTable from './UserTable';
import UserFormModal from './UserFormModal';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import FloatingActionButton from '../shared/FloatingActionButton';
import BlockUserModal from './BlockUserModal';

const AllUsersTab = () => {
    const [users, setUsers] = useState(getUsers());
    const [filters, setFilters] = useState({ search: '', role: 'All', status: 'All' });
    
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [actionUser, setActionUser] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null); // 'delete', 'block', 'unblock'
    
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

    const handleAddUser = () => {
        setEditingUser(null);
        setIsFormModalOpen(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsFormModalOpen(true);
    };

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
            setUsers(users.filter(u => u.id !== actionUser.id));
            toast.success(`User "${actionUser.name}" has been removed.`);
        } else if (confirmAction === 'block') {
            setUsers(users.map(u => u.id === actionUser.id ? { ...u, status: 'Blocked' } : u));
            toast.success(`User "${actionUser.name}" has been blocked. ${reason ? `Reason: ${reason}` : ''}`);
        } else if (confirmAction === 'unblock') {
            const latestPlan = actionUser.planHistory?.[0];
            const newStatus = latestPlan?.status === 'Active' ? 'Active' : 'Inactive';
            setUsers(users.map(u => u.id === actionUser.id ? { ...u, status: newStatus } : u));
            toast.success(`User "${actionUser.name}" has been unblocked.`);
        }
        
        // Reset states
        setIsConfirmOpen(false);
        setIsBlockModalOpen(false);
        setActionUser(null);
        setConfirmAction(null);
    };

    const handleSaveUser = (userData) => {
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
            toast.success('User updated successfully.');
        } else {
            const newUser = { 
                id: `USR-${Date.now()}`, 
                ...userData, 
                avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
                memberSince: new Date(),
                planHistory: [],
                activityLog: [],
            };
            setUsers([newUser, ...users]);
            toast.success('User added successfully.');
        }
        setIsFormModalOpen(false);
        setEditingUser(null);
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const searchLower = filters.search.toLowerCase();
            const nameMatch = user.name.toLowerCase().includes(searchLower);
            const emailMatch = user.email.toLowerCase().includes(searchLower);
            const roleMatch = filters.role === 'All' || user.role === filters.role;
            const statusMatch = filters.status === 'All' || user.status === filters.status;
            return (nameMatch || emailMatch) && roleMatch && statusMatch;
        });
    }, [users, filters]);

    const getConfirmationDialogProps = () => {
        switch (confirmAction) {
            case 'delete':
                return { title: 'Confirm Deletion', description: `Are you sure you want to remove ${actionUser?.name}? This action cannot be undone.` };
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
                    onEdit={handleEditUser} 
                    onDelete={handleDeleteUser}
                    onBlock={handleBlockUser}
                />
            </div>

            <FloatingActionButton onClick={handleAddUser}>
                <Plus size={24} />
            </FloatingActionButton>

            <UserFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleSaveUser}
                user={editingUser}
            />

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

export default AllUsersTab;
