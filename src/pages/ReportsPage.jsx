import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ReportFilterBar from '../components/reports/ReportFilterBar';
import ReportCanvas from '../components/reports/ReportCanvas';
import { getReportData } from '../data/mockData';

const ReportsPage = () => {
    const getToday = () => new Date().toISOString().split('T')[0];
    const getOneMonthAgo = () => {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return d.toISOString().split('T')[0];
    };

    const [filters, setFilters] = useState({
        reportType: 'attendance_overview',
        startDate: getOneMonthAgo(),
        endDate: getToday(),
    });
    
    // activeReport determines which report is actually displayed
    const [activeReport, setActiveReport] = useState(null);

    const handleGenerateReport = (newFilters) => {
        setActiveReport(newFilters);
    };

    const reportData = useMemo(() => 
        activeReport ? getReportData(activeReport.reportType, activeReport) : null
    , [activeReport]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold font-display text-gray-800">Reports & Analytics</h1>
            </div>
            
            <ReportFilterBar 
                filters={filters} 
                onFilterChange={setFilters} 
                onGenerate={handleGenerateReport} 
            />
            
            <ReportCanvas reportData={reportData} />

        </motion.div>
    );
};

export default ReportsPage;
