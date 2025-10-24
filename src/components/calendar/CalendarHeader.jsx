import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react';

const CalendarHeader = ({ calendarRef, currentView, onViewChange, onCreate }) => {
    const title = calendarRef.current ? calendarRef.current.getApi().view.title : 'Calendar';

    const handleNav = (action) => {
        const api = calendarRef.current.getApi();
        api[action]();
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 p-2 mb-2">
            {/* Left group: Title and Nav */}
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 font-display hidden md:block">{title}</h2>
                <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                    <button onClick={() => handleNav('prev')} className="p-2 rounded-md hover:bg-white transition-colors"><ChevronLeft size={20} /></button>
                    <button onClick={() => handleNav('today')} className="px-4 py-1.5 text-sm font-medium rounded-md hover:bg-white border bg-white shadow-sm transition-colors">Today</button>
                    <button onClick={() => handleNav('next')} className="p-2 rounded-md hover:bg-white transition-colors"><ChevronRight size={20} /></button>
                </div>
            </div>

            {/* Right group: Views and Actions */}
            <div className="flex items-center gap-3">
                <div className="p-1 bg-gray-100 rounded-lg flex gap-1">
                    <button onClick={() => onViewChange('dayGridMonth')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${currentView === 'dayGridMonth' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}>Month</button>
                    <button onClick={() => onViewChange('timeGridWeek')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${currentView === 'timeGridWeek' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}>Week</button>
                    <button onClick={() => onViewChange('timeGridDay')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${currentView === 'timeGridDay' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}>Day</button>
                </div>
                <button className="p-2.5 rounded-lg hover:bg-gray-100 border transition-colors"><Filter size={18} /></button>
                <button onClick={onCreate} className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors">
                    <Plus size={18} /> Create Event
                </button>
            </div>
        </div>
    );
};

export default CalendarHeader;
