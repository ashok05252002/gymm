import React from 'react';
import Modal from '../shared/Modal';
import NotificationComposer from './NotificationComposer';

const AdminSendNotificationModal = ({ isOpen, onClose, onSend }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Send New Notification" size="2xl">
            <NotificationComposer onSend={onSend} />
        </Modal>
    );
};

export default AdminSendNotificationModal;
