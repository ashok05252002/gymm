import React from 'react';
import { motion } from 'framer-motion';
import { getTrainerChartOptions } from '../../../data/mockData';
import ReportChartCard from '../../components/cards/ReportChartCard';
import MobileTabs from '../../components/shared/MobileTabs';

const TrainerReportsScreen = () => {
    const earningsOptions = getTrainerChartOptions('earnings');
    const sessionsOptions = getTrainerChartOptions('sessions');

    const tabs = [
        { label: 'Earnings', content: <ReportChartCard title="Monthly Earnings" options={earningsOptions} /> },
        { label: 'Sessions', content: <ReportChartCard title="Session History" options={sessionsOptions} /> },
        { label: 'Performance', content: (
            <div className="text-center p-8 bg-white rounded-3xl shadow-sm">
                <p className="text-gray-500">Performance metrics coming soon.</p>
            </div>
        )},
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
            <MobileTabs tabs={tabs} />
        </motion.div>
    );
};

export default TrainerReportsScreen;
