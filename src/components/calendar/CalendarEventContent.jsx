import React from 'react';

const eventColors = {
    session: 'bg-green-500',
    followUp: 'bg-yellow-500',
    payment: 'bg-red-500',
    announcement: 'bg-purple-500',
};

const CalendarEventContent = ({ eventInfo }) => {
    const eventType = eventInfo.event.extendedProps.type;
    const colorClass = eventColors[eventType] || 'bg-gray-400';

    return (
        <div className="flex items-center gap-2 p-1 w-full overflow-hidden text-xs">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${colorClass}`}></span>
            <span className="truncate font-medium">{eventInfo.event.title}</span>
        </div>
    );
};

export default CalendarEventContent;
