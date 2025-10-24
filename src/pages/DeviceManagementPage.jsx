import React from 'react';
import { motion } from 'framer-motion';
import Tabs from '../components/shared/Tabs';
import AccessRulesTab from '../components/devices/AccessRulesTab';
import DeviceLogsTab from '../components/devices/DeviceLogsTab';

const DeviceManagementPage = () => {
    const tabs = [
        { label: 'Access Rules', content: <AccessRulesTab /> },
        { label: 'Device Logs', content: <DeviceLogsTab /> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold font-display text-gray-800">Device & Access Control</h1>
            <Tabs tabs={tabs} />
        </motion.div>
    );
};

export default DeviceManagementPage;
