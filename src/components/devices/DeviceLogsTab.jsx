import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { getDeviceLogs } from '../../data/mockData';
import toast from 'react-hot-toast';

const LogStatusBadge = ({ status }) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const statusClasses = {
        Granted: 'bg-green-100 text-green-800',
        Blocked: 'bg-red-100 text-red-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};


const DeviceLogsTab = () => {
    const [logs, setLogs] = useState(getDeviceLogs(15));
    
    const handleRefresh = () => {
        setLogs(getDeviceLogs(15));
        toast.success("Logs refreshed!");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Recent Device Logs</h3>
                <button onClick={handleRefresh} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium">
                    <RefreshCw size={18} /> Refresh
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Member Name</th>
                            <th scope="col" className="px-6 py-3">Device ID</th>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{log.memberName}</td>
                                <td className="px-6 py-4 font-mono">{log.deviceId}</td>
                                <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <LogStatusBadge status={log.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeviceLogsTab;
