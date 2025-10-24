import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';
import { Mail, MessageSquare, Smartphone } from 'lucide-react';

const channels = [
    { id: 'Email', name: 'Email', icon: Mail },
    { id: 'SMS', name: 'SMS', icon: MessageSquare },
    { id: 'WhatsApp', name: 'WhatsApp', icon: Smartphone }, // Using Smartphone as proxy
    { id: 'App Push', name: 'App Push', icon: Smartphone },
];

const SendNotificationModal = ({ isOpen, onClose, onSend, users }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [targetGroup, setTargetGroup] = useState('All');
    const [specificUser, setSpecificUser] = useState('');
    const [selectedChannels, setSelectedChannels] = useState(['App Push']);
    const [scheduleTime, setScheduleTime] = useState('');

    const handleChannelToggle = (channelId) => {
        setSelectedChannels(prev =>
            prev.includes(channelId)
                ? prev.filter(id => id !== channelId)
                : [...prev, channelId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !message || selectedChannels.length === 0) {
            toast.error('Title, message, and at least one channel are required.');
            return;
        }

        let targetAudience = 'All Members';
        if (targetGroup === 'Specific Member' && specificUser) {
            targetAudience = users.find(u => u.id === specificUser)?.name || 'Specific Member';
        } else if (targetGroup === 'Specific Trainer' && specificUser) {
            targetAudience = users.find(u => u.id === specificUser)?.name || 'Specific Trainer';
        } else if (targetGroup !== 'All') {
            toast.error('Please select a specific person for the chosen target group.');
            return;
        }

        onSend({
            title,
            message,
            targetAudience,
            channels: selectedChannels,
            scheduleTime: scheduleTime || null,
        });
        // Reset form
        setTitle('');
        setMessage('');
        setTargetGroup('All');
        setSpecificUser('');
        setSelectedChannels(['App Push']);
        setScheduleTime('');
    };
    
    const getTargetUsers = () => {
        if (targetGroup === 'Specific Member') {
            return users.filter(u => u.role === 'Member');
        }
        if (targetGroup === 'Specific Trainer') {
            return users.filter(u => u.role === 'Trainer');
        }
        return [];
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Send Notification">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows="4" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Target Group</label>
                    <select value={targetGroup} onChange={e => { setTargetGroup(e.target.value); setSpecificUser(''); }} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                        <option value="All">All Members</option>
                        <option value="Specific Member">Specific Member</option>
                        <option value="Specific Trainer">Specific Trainer</option>
                    </select>
                </div>
                { (targetGroup === 'Specific Member' || targetGroup === 'Specific Trainer') && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Person</label>
                        <select value={specificUser} onChange={e => setSpecificUser(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                            <option value="" disabled>Select a person...</option>
                            {getTargetUsers().map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                        </select>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channels</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {channels.map(channel => (
                            <button key={channel.id} type="button" onClick={() => handleChannelToggle(channel.id)} className={`flex items-center justify-center gap-2 p-2 rounded-lg border-2 transition-all ${selectedChannels.includes(channel.id) ? 'bg-red-50 border-brand-red text-brand-red' : 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200'}`}>
                                <channel.icon size={16} />
                                <span className="font-medium text-xs">{channel.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Schedule (Optional)</label>
                    <input type="datetime-local" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">
                        {scheduleTime ? 'Schedule Notification' : 'Send Now'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default SendNotificationModal;
