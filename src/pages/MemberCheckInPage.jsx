import React from 'react';
import { motion } from 'framer-motion';
import Tabs from '../components/shared/Tabs';
import RealTimeAccessLog from '../components/checkin/RealTimeAccessLog';
import ManualEntryTab from '../components/checkin/ManualEntryTab';

const MemberCheckInPage = () => {
    const tabs = [
        { label: 'Real-Time Access', content: <RealTimeAccessLog /> },
        { label: 'Manual Entry', content: <ManualEntryTab /> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold font-display text-gray-800">Attendance / Access Control</h1>
            <Tabs tabs={tabs} />
        </motion.div>
    );
};

export default MemberCheckInPage;
