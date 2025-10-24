import React, { useState } from 'react';
import { Mail, MessageSquare, Smartphone, Send, Clock } from 'lucide-react';

const channels = [
    { id: 'Email', name: 'Email', icon: Mail },
    { id: 'SMS', name: 'SMS', icon: MessageSquare },
    { id: 'App Push', name: 'App Push', icon: Smartphone },
];

const NotificationComposer = ({ onSend }) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [targetAudience, setTargetAudience] = useState('All Members');
    const [selectedChannels, setSelectedChannels] = useState(['App Push']);
    const [scheduleTime, setScheduleTime] = useState('');

    const handleChannelToggle = (channelId) => {
        setSelectedChannels(prev =>
            prev.includes(channelId)
                ? prev.filter(id => id !== channelId)
                : [...prev, channelId]
        );
    };

    const handleSubmit = (isScheduled) => {
        const notificationData = {
            title,
            message,
            targetAudience,
            channels: selectedChannels,
            scheduleTime: isScheduled ? scheduleTime : null,
        };
        onSend(notificationData);
        // Reset form after sending
        setTitle('');
        setMessage('');
        setScheduleTime('');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 font-display mb-4">New Message</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Target Audience</label>
                    <select value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red">
                        <option>All Members</option>
                        <option>All Trainers</option>
                        <option>Gold & Silver Members</option>
                        <option>Pending Renewals</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channels</label>
                    <div className="flex gap-2">
                        {channels.map(channel => (
                            <button key={channel.id} onClick={() => handleChannelToggle(channel.id)} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${selectedChannels.includes(channel.id) ? 'bg-red-50 border-brand-red text-brand-red' : 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200'}`}>
                                <channel.icon size={20} />
                                <span className="font-medium text-sm">{channel.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Schedule Time (Optional)</label>
                    <input type="datetime-local" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
                </div>
                <div className="pt-2 flex justify-end gap-3">
                    <button onClick={() => handleSubmit(true)} disabled={!scheduleTime} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed">
                        <Clock size={18} /> Schedule
                    </button>
                    <button onClick={() => handleSubmit(false)} className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">
                        <Send size={18} /> Send Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationComposer;
