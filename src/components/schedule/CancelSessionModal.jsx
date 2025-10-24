import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const CancelSessionModal = ({ isOpen, onClose, onConfirm, session }) => {
    const [reason, setReason] = useState('Member Request');

    const handleSubmit = () => {
        if (!reason) {
            toast.error('Please select a reason for cancellation.');
            return;
        }
        onConfirm(reason);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Cancel Session">
            <div className="space-y-4">
                <p className="text-gray-600">
                    Are you sure you want to cancel the session for <strong>{session?.memberName}</strong> on {new Date(session?.dateTime).toLocaleDateString()}?
                </p>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reason for Cancellation</label>
                    <select value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option>Member Request</option>
                        <option>Trainer Unavailable</option>
                        <option>Illness</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Keep Session</button>
                    <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Confirm Cancellation</button>
                </div>
            </div>
        </Modal>
    );
};

export default CancelSessionModal;
