import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, Smartphone, Clock, CheckCircle } from 'lucide-react';
import { getNotificationHistory } from '../../../data/mockData';

const channelIconMap = {
    Email: <Mail size={16} className="text-blue-500" />,
    SMS: <MessageSquare size={16} className="text-green-500" />,
    'App Push': <Smartphone size={16} className="text-purple-500" />,
};

const statusIconMap = {
    Sent: <CheckCircle size={16} className="text-brand-green" />,
    Scheduled: <Clock size={16} className="text-yellow-500" />,
};

const NotificationsScreen = () => {
    const navigate = useNavigate();
    const notifications = getNotificationHistory();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold">Notifications</h1>
            </div>
            <div className="space-y-3">
                {notifications.map(notif => (
                    <div key={notif.id} className="bg-white p-4 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-start">
                            <p className="font-bold text-gray-800">{notif.title}</p>
                            <div className="flex items-center gap-1.5" title={notif.status}>
                                {statusIconMap[notif.status]}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">To: {notif.target}</p>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-2">
                                {notif.channels.map(channel => (
                                    <div key={channel} title={channel} className="p-1.5 bg-gray-100 rounded-full border">
                                        {channelIconMap[channel]}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400">
                                {new Date(notif.timestamp).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default NotificationsScreen;
