import React, { useState, useEffect, useMemo } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import ReportFilterBar from '../ReportFilterBar';
import ReportTable from '../ReportTable';
import ExportModal from '../ExportModal';
import { getMembershipSummaryReport, getUsers, getPlans } from '../../../data/mockData';

const MembershipSummaryReportTab = () => {
    const getToday = () => new Date().toISOString().split('T')[0];
    const getOneMonthAgo = () => {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return d.toISOString().split('T')[0];
    };

    const [filters, setFilters] = useState({
        search: '',
        dateFrom: getOneMonthAgo(),
        dateTo: getToday(),
        membershipType: 'All',
        status: [],
        trainer: [],
    });
    
    const [reportData, setReportData] = useState(null);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const handleGenerateReport = (currentFilters) => {
        const data = getMembershipSummaryReport(currentFilters);
        setReportData(data);
    };

    useEffect(() => {
        handleGenerateReport(filters);
    }, []);

    const trainers = useMemo(() => getUsers().filter(u => u.role === 'Trainer'), []);
    const plans = useMemo(() => getPlans(), []);

    return (
        <div className="space-y-6">
            <ReportFilterBar 
                filters={filters} 
                onFilterChange={setFilters} 
                onGenerate={handleGenerateReport}
                reportType="membership_summary"
                trainers={trainers}
                plans={plans}
            />
            
            {reportData ? (
                <motion.div 
                    key="report-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 font-display">{reportData.title}</h3>
                            <p className="text-sm text-gray-500">{reportData.description}</p>
                        </div>
                        <button 
                            onClick={() => setIsExportModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-600 text-sm font-medium"
                        >
                            <Download size={16} /> Export
                        </button>
                    </div>
                    <ReportTable columns={reportData.columns} rows={reportData.rows} />
                </motion.div>
            ) : (
                <div className="text-center py-12 text-gray-500">Loading report...</div>
            )}

            <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
        </div>
    );
};

export default MembershipSummaryReportTab;
