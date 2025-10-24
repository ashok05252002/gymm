import React from 'react';
import ReactECharts from 'echarts-for-react';
import { getCalendarData } from '../../data/mockData';

const BookingCalendarTab = ({ sessions }) => {
    const calendarData = getCalendarData(sessions);

    const option = {
        tooltip: {
            formatter: function (params) {
                const session = params.data[2];
                return `<b>${session.memberName}</b><br/>Trainer: ${session.trainerName}<br/>Time: ${new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br/>Status: ${session.status}`;
            }
        },
        visualMap: {
            show: false,
            min: 1,
            max: 3,
            inRange: {
                color: ['#FF3B30', '#CCCCCC', '#00C853'] // 1: Cancelled (Red), 2: Completed (Gray), 3: Confirmed (Green)
            }
        },
        calendar: {
            top: 30,
            left: 30,
            right: 30,
            cellSize: ['auto', 20],
            range: calendarData.range,
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: { show: false }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: calendarData.data
        },
        responsive: true,
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <ReactECharts option={option} style={{ height: '400px' }} />
        </div>
    );
};

export default BookingCalendarTab;
