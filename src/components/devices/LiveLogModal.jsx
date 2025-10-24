import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { generateNewLogEntry } from '../../data/mockData';
import ToggleSwitch from '../shared/ToggleSwitch';

const LogStatusBadge = ({ status }) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const statusClasses = {
        Granted: 'bg-green-100 text-green-800',
        Blocked: 'bg-red-100 text-red-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const LiveLogModal = ({ isOpen, onClose }) => {
    const [logs, setLogs] = useState([]);
    const [isLive, setIsLive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const intervalRef = useRef(null);
    const logContainerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setLogs(Array.from({ length: 10 }, generateNewLogEntry).sort((a, b) => b.timestamp - a.timestamp));
        } else {
            setIsLive(false); // Turn off live feed when closing
        }
    }, [isOpen]);

    useEffect(() => {
        if (isLive) {
            intervalRef.current = setInterval(() => {
                setLogs(prevLogs => [generateNewLogEntry(), ...prevLogs].slice(0, 50)); // Keep max 50 logs
                if (logContainerRef.current) {
                    logContainerRef.current.scrollTop = 0;
                }
            }, 2000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isLive]);

    const filteredLogs = logs.filter(log =>
        log.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.deviceId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col h-[80vh]"
                        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h3 className="text-xl font-bold font-display text-gray-800">Live Access Log</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition"><X size={24} /></button>
                        </div>
                        
                        <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-b border-gray-200">
                            <div className="relative w-full sm:w-auto flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by member or device..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700">Real-time Refresh</span>
                                <ToggleSwitch enabled={isLive} setEnabled={setIsLive} />
                            </div>
                        </div>

                        <div ref={logContainerRef} className="flex-1 overflow-y-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Member</th>
                                        <th scope="col" className="px-6 py-3">Device ID</th>
                                        <th scope="col" className="px-6 py-3">Timestamp</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <AnimatePresence initial={false}>
                                        {filteredLogs.map(log => (
                                            <motion.tr
                                                key={log.id}
                                                layout
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-3 font-medium text-gray-900">{log.memberName}</td>
                                                <td className="px-6 py-3 font-mono">{log.deviceId}</td>
                                                <td className="px-6 py-3">{new Date(log.timestamp).toLocaleTimeString()}</td>
                                                <td className="px-6 py-3"><LogStatusBadge status={log.status} /></td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LiveLogModal;
