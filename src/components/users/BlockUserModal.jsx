import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const BlockUserModal = ({ isOpen, onClose, onConfirm, userName }) => {
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        if (!reason.trim()) {
            toast.error('A reason is required to block a user with an active plan.');
            return;
        }
        onConfirm(reason);
        setReason('');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Block User: ${userName}`}>
            <div className="space-y-4">
                <p className="text-gray-600">
                    This user has an active plan. Please provide a reason for blocking their account.
                </p>
                <div>
                    <label htmlFor="block-reason" className="block text-sm font-medium text-gray-700">
                        Reason for Blocking
                    </label>
                    <textarea
                        id="block-reason"
                        rows="4"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"
                        placeholder="e.g., Violation of gym policy..."
                    />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600"
                    >
                        Confirm Block
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default BlockUserModal;
