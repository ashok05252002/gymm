import React from 'react';
import Modal from '../shared/Modal';
import { User, Calendar, Clock, Edit, Trash2, Info } from 'lucide-react';

const eventColors = {
    session: 'bg-green-100 text-green-800',
    followUp: 'bg-yellow-100 text-yellow-800',
    payment: 'bg-red-100 text-red-800',
    announcement: 'bg-purple-100 text-purple-800',
};

const SessionDetails = ({ event }) => (
    <>
        <div className="flex items-center gap-2">
            <User size={16} /> Member: <strong>{event.extendedProps.memberName}</strong>
        </div>
        <div className="flex items-center gap-2">
            <User size={16} /> Trainer: <strong>{event.extendedProps.trainerName}</strong>
        </div>
        <div className="flex items-center gap-2">
            <Info size={16} /> Type: <strong>{event.extendedProps.sessionType}</strong>
        </div>
    </>
);

const FollowUpDetails = ({ event }) => (
    <>
        <div className="flex items-center gap-2">
            <User size={16} /> Client: <strong>{event.extendedProps.name}</strong>
        </div>
        <div className="flex items-center gap-2">
            <Info size={16} /> Source: <strong>{event.extendedProps.source}</strong>
        </div>
    </>
);

const PaymentDetails = ({ event }) => (
     <div className="flex items-center gap-2">
        <User size={16} /> Member: <strong>{event.extendedProps.name}</strong>
    </div>
);

const AnnouncementDetails = ({ event }) => (
    <p>{event.extendedProps.description}</p>
);

const EventDetailsModal = ({ isOpen, onClose, event, onUpdate, onDelete }) => {
    if (!event) return null;

    const { type } = event.extendedProps;
    const colorClass = eventColors[type] || 'bg-gray-100 text-gray-800';

    const renderDetails = () => {
        switch (type) {
            case 'session': return <SessionDetails event={event} />;
            case 'followUp': return <FollowUpDetails event={event} />;
            case 'payment': return <PaymentDetails event={event} />;
            case 'announcement': return <AnnouncementDetails event={event} />;
            default: return <p>No details available.</p>;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Event Details">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold font-display text-gray-800">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>{type}</span>
                </div>
                
                <div className="text-gray-600 space-y-2 text-sm border-t border-b py-4">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} /> 
                        Date: <strong>{new Date(event.start).toLocaleDateString()}</strong>
                    </div>
                    {!event.allDay && (
                        <div className="flex items-center gap-2">
                            <Clock size={16} /> 
                            Time: <strong>{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                        </div>
                    )}
                    {renderDetails()}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button onClick={() => onDelete(event.id)} className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                        <Trash2 size={16} /> Delete
                    </button>
                    <button onClick={() => { /* onUpdate(event) - TODO: Implement edit flow */ }} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        <Edit size={16} /> Edit
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EventDetailsModal;
