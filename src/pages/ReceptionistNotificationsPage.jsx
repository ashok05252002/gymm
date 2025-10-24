import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { getNotificationHistory, getUsers } from '../data/mockData';
import NotificationHistory from '../components/notifications/NotificationHistory';
import SendNotificationModal from '../components/receptionist/SendNotificationModal';

const ReceptionistNotificationsPage = () => {
    const [history, setHistory] = useState(getNotificationHistory());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const users = getUsers();

    const handleSend = (notificationData) => {
        const newNotification = {
            id: `NOTIF-${Date.now()}`,
            ...notificationData,
            timestamp: notificationData.scheduleTime || new Date(),
            status: notificationData.scheduleTime ? 'Scheduled' : 'Sent',
        };
        setHistory([newNotification, ...history]);
        toast.success(`Notification has been ${newNotification.status.toLowerCase()}.`);
        setIsModalOpen(false);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-display text-gray-800">Notifications</h1>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600 text-sm font-medium"
                    >
                        <Plus size={16} /> Send Notification
                    </button>
                </div>
                <NotificationHistory notifications={history} />
            </motion.div>
            <SendNotificationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSend={handleSend}
                users={users}
            />
        </>
    );
};

export default ReceptionistNotificationsPage;
