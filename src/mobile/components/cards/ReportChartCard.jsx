import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';

const ReportChartCard = ({ title, options }) => {
    return (
        <div className="bg-white p-4 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800">{title}</h3>
                <button onClick={() => toast('Exporting PDF (mock).')} className="text-gray-400 p-2 hover:bg-gray-100 rounded-full">
                    <Download size={18} />
                </button>
            </div>
            <ReactECharts option={options} style={{ height: '200px' }} />
        </div>
    );
};

export default ReportChartCard;
