import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const RoleFormModal = ({ isOpen, onClose, onSave, role, allPermissions }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    useEffect(() => {
        if (role) {
            setName(role.name || '');
            setDescription(role.description || '');
            setSelectedPermissions(role.permissions || []);
        } else {
            setName('');
            setDescription('');
            setSelectedPermissions([]);
        }
    }, [role, isOpen]);

    const handlePermissionChange = (permissionId) => {
        setSelectedPermissions(prev =>
            prev.includes(permissionId)
                ? prev.filter(id => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('Role name is required.');
            return;
        }
        onSave({ name, description, permissions: selectedPermissions });
    };

    const isEditing = !!role;
    const isProtected = isEditing && (role.name === 'Admin' || role.name === 'Member');

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? `Edit Role: ${role.name}` : 'Create New Role'}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red disabled:bg-gray-100" required disabled={isProtected} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                        {Object.entries(allPermissions).map(([category, permissions]) => (
                            <div key={category}>
                                <h4 className="font-semibold text-gray-600 text-sm mb-2">{category}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                    {permissions.map(p => (
                                        <label key={p.id} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-brand-red focus:ring-brand-red disabled:opacity-50"
                                                checked={selectedPermissions.includes(p.id)}
                                                onChange={() => handlePermissionChange(p.id)}
                                                disabled={isProtected}
                                            />
                                            <span className="text-sm text-gray-700">{p.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    {!isProtected && (
                        <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save Role</button>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default RoleFormModal;
