import React, { useState } from 'react';
import { Users, UserCheck, DollarSign, CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import { getKpiData, getChartOptions, getRecentActivities } from '../data/mockData';

const AdminDashboard = () => {
    const [kpiData, setKpiData] = useState(getKpiData());
    const [activities, setActivities] = useState(getRecentActivities());

    const chartConfig = {
        revenue: getChartOptions('revenue'),
        attendance: getChartOptions('attendance'),
        growth: getChartOptions('growth'),
    };
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Members" value={kpiData.totalMembers} icon={Users} change="+5.2%" changeType="increase" color="blue" />
                <KPICard title="Active Trainers" value={kpiData.activeTrainers} icon={UserCheck} change="+2" changeType="increase" color="green" />
                <KPICard title="Monthly Revenue" value={`${kpiData.monthlyRevenue.toLocaleString()} OMR`} icon={DollarSign} change="-1.8%" changeType="decrease" color="orange" />
                <KPICard title="Pending Renewals" value={kpiData.pendingRenewals} icon={CalendarClock} change="+12" changeType="increase" color="red" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Monthly Revenue">
                    <ReactECharts option={chartConfig.revenue} style={{ height: '350px' }} notMerge={true} lazyUpdate={true} />
                </ChartCard>
                <ChartCard title="Attendance Trend">
                    <ReactECharts option={chartConfig.attendance} style={{ height: '350px' }} notMerge={true} lazyUpdate={true} />
                </ChartCard>
            </div>

            <div className="grid grid-cols-1 gap-6">
                 <ChartCard title="Member Growth">
                    <ReactECharts option={chartConfig.growth} style={{ height: '350px' }} notMerge={true} lazyUpdate={true} />
                </ChartCard>
            </div>

            {/* Recent Activity */}
            <RecentActivity activities={activities} />

            {/* TODO: Add Modals for "View Report" and "Export" */}
        </motion.div>
    );
};

export default AdminDashboard;
