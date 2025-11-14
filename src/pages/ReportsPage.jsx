import React from 'react';
import { motion } from 'framer-motion';
import Tabs from '../components/shared/Tabs';
import AttendanceReportTab from '../components/reports/tabs/AttendanceReportTab';
import SessionAttendanceReportTab from '../components/reports/tabs/SessionAttendanceReportTab';
import MembershipSummaryReportTab from '../components/reports/tabs/MembershipSummaryReportTab';
import PaymentHistoryReportTab from '../components/reports/tabs/PaymentHistoryReportTab';

const ReportsPage = () => {
    const tabs = [
        { label: 'Attendance', content: <AttendanceReportTab /> },
        { label: 'Session Attendance', content: <SessionAttendanceReportTab /> },
        { label: 'Membership Summary', content: <MembershipSummaryReportTab /> },
        { label: 'Payment History', content: <PaymentHistoryReportTab /> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold font-display text-gray-800">Reports</h1>
            </div>
            
            <Tabs tabs={tabs} />
        </motion.div>
    );
};

export default ReportsPage;
