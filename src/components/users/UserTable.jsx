import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Ban } from 'lucide-react';
import StatusBadge from '../shared/StatusBadge';

const UserTable = ({ users, onEdit, onDelete, onBlock }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Role</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3">
                                <img className="w-10 h-10 rounded-full" src={user.avatar} alt={`${user.name} avatar`} />
                                <div>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-gray-500">{user.email}</div>
                                </div>
                            </th>
                            <td className="px-6 py-4">{user.role}</td>
                            <td className="px-6 py-4">
                                <StatusBadge status={user.status} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                    <Link to={`/admin/users/${user.id}`} title="View Details" className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors">
                                        <Eye size={18} />
                                    </Link>
                                    <button onClick={() => onEdit(user)} title="Edit User" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => onBlock(user)} title={user.status === 'Blocked' ? 'Unblock User' : 'Block User'} className="p-2 text-orange-500 hover:bg-orange-100 rounded-full transition-colors">
                                        <Ban size={18} />
                                    </button>
                                    <button onClick={() => onDelete(user)} title="Delete User" className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {users.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No users found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default UserTable;
