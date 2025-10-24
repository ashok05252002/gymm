import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLogsByUserId } from '../../../data/mockData';

const LogStatusBadge = ({ status }) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const statusClasses = {
        Granted: 'bg-green-100 text-green-800',
        Blocked: 'bg-red-100 text-red-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const UserAccessLog = ({ userId }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        setLogs(getLogsByUserId(userId));
    }, [userId]);

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
            <h3 className="text-xl font-bold text-gray-800 font-display mb-4">Access Log</h3>
            <div className="max-h-80 overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3">Device ID</th>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 ? logs.map(log => (
                            <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-mono">{log.deviceId}</td>
                                <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <LogStatusBadge status={log.status} />
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="text-center py-8 text-gray-500">No access logs found for this user.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default UserAccessLog;
