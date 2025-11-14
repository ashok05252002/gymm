import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { getNotificationHistory } from '../data/mockData';
import NotificationHistory from '../components/notifications/NotificationHistory';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';
import AdminSendNotificationModal from '../components/notifications/AdminSendNotificationModal';

const NotificationsPage = () => {
    const [history, setHistory] = useState(getNotificationHistory());
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [notificationToSend, setNotificationToSend] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSendOrSchedule = (notificationData) => {
        setNotificationToSend(notificationData);
        setIsModalOpen(false);
        setIsConfirmOpen(true);
    };

    const confirmSend = () => {
        const newNotification = {
            id: `NOTIF-${Date.now()}`,
            ...notificationToSend,
            timestamp: notificationToSend.scheduleTime || new Date(),
            status: notificationToSend.scheduleTime ? 'Scheduled' : 'Sent',
        };
        setHistory([newNotification, ...history]);
        toast.success(`Notification has been ${newNotification.status.toLowerCase()}.`);
        setIsConfirmOpen(false);
        setNotificationToSend(null);
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
                        <Plus size={16} /> Send New Notification
                    </button>
                </div>
                <NotificationHistory notifications={history} />
            </motion.div>

            <AdminSendNotificationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSend={handleSendOrSchedule}
            />

            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmSend}
                title={`Confirm ${notificationToSend?.scheduleTime ? 'Scheduling' : 'Send'}`}
                description={`Are you sure you want to ${notificationToSend?.scheduleTime ? 'schedule' : 'send'} this notification to "${notificationToSend?.targetAudience}"?`}
            />
        </>
    );
};

export default NotificationsPage;
