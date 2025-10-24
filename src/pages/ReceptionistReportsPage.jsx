import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import Tabs from '../components/shared/Tabs';
import ChartCard from '../components/dashboard/ChartCard';
import GenerateReportModal from '../components/receptionist/GenerateReportModal';
import { getChartOptions, getEnquiryAnalyticsData, getUsers } from '../data/mockData';

const ReceptionistReportsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const enquiryAnalytics = getEnquiryAnalyticsData();
    const attendanceChart = getChartOptions('attendance');
    const sessionUsageChart = getChartOptions('session_usage');
    const revenueChart = getChartOptions('receptionist_revenue');
    const trainers = getUsers().filter(u => u.role === 'Trainer');

    const tabs = [
        { label: 'Enquiry Conversion', content: (
            <ChartCard title="Conversion by Source">
                <ReactECharts option={enquiryAnalytics.conversionBySource.chartOptions} style={{ height: '350px' }} />
            </ChartCard>
        )},
        { label: 'Attendance Summary', content: (
            <ChartCard title="Weekly Attendance Summary">
                <ReactECharts option={attendanceChart} style={{ height: '350px' }} />
            </ChartCard>
        )},
        { label: 'Session Usage', content: (
            <ChartCard title="Weekly Session Usage">
                <ReactECharts option={sessionUsageChart} style={{ height: '350px' }} />
            </ChartCard>
        )},
        { label: 'Revenue Overview', content: (
            <ChartCard title="Monthly Revenue Recorded">
                <ReactECharts option={revenueChart} style={{ height: '350px' }} />
            </ChartCard>
        )},
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-display text-gray-800">Reports</h1>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-600 text-sm font-medium"
                    >
                        <Download size={16} /> Generate & Export
                    </button>
                </div>
                <Tabs tabs={tabs} />
            </motion.div>
            <GenerateReportModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                trainers={trainers}
            />
        </>
    );
};

export default ReceptionistReportsPage;
