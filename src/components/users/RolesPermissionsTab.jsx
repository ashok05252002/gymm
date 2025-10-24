import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getRoles, getPermissions } from '../../data/mockData';
import RoleFormModal from './RoleFormModal';
import ConfirmationDialog from '../shared/ConfirmationDialog';

const RolesPermissionsTab = () => {
    const [roles, setRoles] = useState(getRoles());
    const [permissions] = useState(getPermissions());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deletingRole, setDeletingRole] = useState(null);

    const handleAdd = () => {
        setEditingRole(null);
        setIsModalOpen(true);
    };

    const handleEdit = (role) => {
        setEditingRole(role);
        setIsModalOpen(true);
    };

    const handleDelete = (role) => {
        if (role.name === 'Admin' || role.name === 'Member') {
            toast.error(`The "${role.name}" role cannot be deleted.`);
            return;
        }
        setDeletingRole(role);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        setRoles(roles.filter(r => r.id !== deletingRole.id));
        toast.success(`Role "${deletingRole.name}" has been deleted.`);
        setIsConfirmOpen(false);
        setDeletingRole(null);
    };

    const handleSave = (roleData) => {
        if (editingRole) {
            setRoles(roles.map(r => r.id === editingRole.id ? { ...r, ...roleData } : r));
            toast.success('Role updated successfully.');
        } else {
            const newRole = { id: `role-${Date.now()}`, ...roleData };
            setRoles([...roles, newRole]);
            toast.success('Role created successfully.');
        }
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Available Roles</h3>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600 text-sm font-medium">
                    <Plus size={18} /> Add Role
                </button>
            </div>
            <div className="space-y-4">
                {roles.map(role => (
                    <motion.div
                        key={role.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center"
                    >
                        <div className="mb-4 sm:mb-0">
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-800">{role.name}</h4>
                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{role.permissions.length} permissions</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => handleEdit(role)} title="Edit Role" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"><Edit size={18} /></button>
                            <button onClick={() => handleDelete(role)} title="Delete Role" className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={role.name === 'Admin' || role.name === 'Member'}><Trash2 size={18} /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <RoleFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                role={editingRole}
                allPermissions={permissions}
            />

            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                description={`Are you sure you want to delete the role "${deletingRole?.name}"? This cannot be undone.`}
            />
        </div>
    );
};

export default RolesPermissionsTab;
