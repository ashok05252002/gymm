import React from 'react';
import { motion } from 'framer-motion';
import Tabs from '../components/shared/Tabs';
import AllUsersTab from '../components/users/AllUsersTab';
import RolesPermissionsTab from '../components/users/RolesPermissionsTab';

const UserManagementPage = () => {
    const tabs = [
        { label: 'All Users', content: <AllUsersTab /> },
        { label: 'Roles & Permissions', content: <RolesPermissionsTab /> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold font-display text-gray-800">User Management</h1>
            <Tabs tabs={tabs} />
        </motion.div>
    );
};

export default UserManagementPage;
