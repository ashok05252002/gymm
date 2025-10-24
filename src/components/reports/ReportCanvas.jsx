import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ExportModal from './ExportModal';

const ReportCanvas = ({ reportData }) => {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    if (!reportData) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center h-full min-h-[400px]">
                <p className="text-gray-500">Select a report type and click "Generate Report" to view data.</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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

                <AnimatePresence mode="wait">
                    <motion.div
                        key={reportData.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ReactECharts
                            option={reportData.chartOptions}
                            style={{ height: '500px', width: '100%' }}
                            notMerge={true}
                            lazyUpdate={true}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
            <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
        </>
    );
};

export default ReportCanvas;
