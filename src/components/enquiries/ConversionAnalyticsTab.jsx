import React from 'react';
import ReactECharts from 'echarts-for-react';
import { getEnquiryAnalyticsData } from '../../data/mockData';
import ChartCard from '../dashboard/ChartCard';

const ConversionAnalyticsTab = ({ enquiries }) => {
    // In a real app, you'd compute this from the `enquiries` prop.
    // For now, we use mock data generator for simplicity.
    const analyticsData = getEnquiryAnalyticsData();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title={analyticsData.conversionBySource.title}>
                <ReactECharts 
                    option={analyticsData.conversionBySource.chartOptions} 
                    style={{ height: '300px' }}
                />
            </ChartCard>
            <ChartCard title={analyticsData.statusDistribution.title}>
                <ReactECharts 
                    option={analyticsData.statusDistribution.chartOptions} 
                    style={{ height: '300px' }}
                />
            </ChartCard>
        </div>
    );
};

export default ConversionAnalyticsTab;
