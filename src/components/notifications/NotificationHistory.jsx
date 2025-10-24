import React from 'react';
import { Mail, MessageSquare, Smartphone, Clock, CheckCircle } from 'lucide-react';

const channelIconMap = {
    Email: <Mail size={16} className="text-blue-500" />,
    SMS: <MessageSquare size={16} className="text-green-500" />,
    'App Push': <Smartphone size={16} className="text-purple-500" />,
};

const statusIconMap = {
    Sent: <CheckCircle size={16} className="text-brand-green" />,
    Scheduled: <Clock size={16} className="text-yellow-500" />,
};

const NotificationHistory = ({ notifications }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
            <h3 className="text-xl font-bold text-gray-800 font-display mb-4">History</h3>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {notifications.map(notif => (
                    <div key={notif.id} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex justify-between items-start">
                            <p className="font-semibold text-gray-800">{notif.title}</p>
                            <div className="flex items-center gap-1.5" title={notif.status}>
                                {statusIconMap[notif.status]}
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">To: {notif.target}</p>
                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-2">
                                {notif.channels.map(channel => (
                                    <div key={channel} title={channel} className="p-1.5 bg-white rounded-full border">
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
        </div>
    );
};

export default NotificationHistory;
