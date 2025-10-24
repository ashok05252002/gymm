import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getNotificationHistory, getUsers } from '../data/mockData';
import NotificationHistory from '../components/notifications/NotificationHistory';
import NotificationComposer from '../components/notifications/NotificationComposer';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';

const NotificationsPage = () => {
    const [history, setHistory] = useState(getNotificationHistory());
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [notificationToSend, setNotificationToSend] = useState(null);

    const handleSendOrSchedule = (notificationData) => {
        setNotificationToSend(notificationData);
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold font-display text-gray-800">Notifications</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <NotificationComposer onSend={handleSendOrSchedule} />
                </div>
                <div className="lg:col-span-1">
                    <NotificationHistory notifications={history} />
                </div>
            </div>

            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmSend}
                title={`Confirm ${notificationToSend?.scheduleTime ? 'Scheduling' : 'Send'}`}
                description={`Are you sure you want to ${notificationToSend?.scheduleTime ? 'schedule' : 'send'} this notification to "${notificationToSend?.targetAudience}"?`}
            />
        </motion.div>
    );
};

export default NotificationsPage;
