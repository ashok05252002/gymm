import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { getDeviceLogs, generateNewLogEntry } from '../../data/mockData';

const LogStatusChip = ({ status }) => {
    const statusStyles = {
        Granted: 'bg-green-100 text-green-800',
        Blocked: 'bg-red-100 text-red-800',
        Expired: 'bg-yellow-100 text-yellow-800',
    };
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

const RealTimeAccessLog = () => {
    const [logs, setLogs] = useState(getDeviceLogs(10));
    const [blockedCount, setBlockedCount] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            const newLog = generateNewLogEntry();
            setLogs(prev => [newLog, ...prev].slice(0, 50));
            if (newLog.status === 'Blocked' || newLog.status === 'Expired') {
                setBlockedCount(prev => prev + 1);
            }
        }, 5000); // Refresh every 5 seconds

        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <AnimatePresence>
                {blockedCount > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mb-4 flex items-center gap-3"
                    >
                        <AlertTriangle className="h-5 w-5" />
                        <span className="block sm:inline">{blockedCount} member(s) blocked due to expired plan or other issues.</span>
                        <button onClick={() => setBlockedCount(0)} className="absolute top-0 bottom-0 right-0 px-4 py-3 font-bold">&times;</button>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                <AnimatePresence initial={false}>
                    {logs.map(log => (
                        <motion.div
                            key={log.id}
                            layout
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, type: 'spring' }}
                            className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-4">
                                <img src={`https://i.pravatar.cc/150?u=${log.userId}`} alt={log.memberName} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-gray-800">{log.memberName}</p>
                                    <p className="text-sm text-gray-500 font-mono">{log.deviceId}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <p className="text-sm text-gray-500 hidden sm:block">{new Date(log.timestamp).toLocaleTimeString()}</p>
                                <LogStatusChip status={log.status} />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RealTimeAccessLog;
