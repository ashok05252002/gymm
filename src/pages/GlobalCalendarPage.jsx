import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getCalendarEvents, getUsers, getPrograms } from '../data/mockData';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarSidebar from '../components/calendar/CalendarSidebar';
import EventDetailsModal from '../components/calendar/EventDetailsModal';
import EventCreationModal from '../components/calendar/EventCreationModal';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';
import CalendarEventContent from '../components/calendar/CalendarEventContent';

const GlobalCalendarPage = ({ userRole }) => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('dayGridMonth');
    const calendarRef = useRef(null);

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [dateForNewEvent, setDateForNewEvent] = useState(null);
    const [draggedEventInfo, setDraggedEventInfo] = useState(null);

    useEffect(() => {
        setEvents(getCalendarEvents(userRole));
    }, [userRole]);

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setIsDetailsModalOpen(true);
    };

    const handleDateClick = (arg) => {
        setDateForNewEvent(arg.date);
        setIsCreateModalOpen(true);
    };

    const handleEventDrop = (dropInfo) => {
        setDraggedEventInfo(dropInfo);
        setIsConfirmModalOpen(true);
    };

    const confirmReschedule = () => {
        const { event } = draggedEventInfo;
        setEvents(prevEvents => prevEvents.map(e => e.id === event.id ? { ...e, start: event.start, end: event.end } : e));
        toast.success(`Event "${event.title}" rescheduled.`);
        setIsConfirmModalOpen(false);
        setDraggedEventInfo(null);
    };

    const cancelReschedule = () => {
        draggedEventInfo.revert();
        setIsConfirmModalOpen(false);
        setDraggedEventInfo(null);
    };

    const handleCreateEvent = (newEventData) => {
        setEvents([...events, newEventData]);
        toast.success(`Event "${newEventData.title}" created.`);
        setIsCreateModalOpen(false);
    };

    const handleUpdateEvent = (updatedEventData) => {
        setEvents(events.map(e => e.id === updatedEventData.id ? updatedEventData : e));
        toast.success(`Event "${updatedEventData.title}" updated.`);
        setIsDetailsModalOpen(false);
    };

    const handleDeleteEvent = (eventId) => {
        const eventToDelete = events.find(e => e.id === eventId);
        setEvents(events.filter(e => e.id !== eventId));
        toast.success(`Event "${eventToDelete.title}" deleted.`);
        setIsDetailsModalOpen(false);
    };

    const handleViewChange = (newView) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(newView);
        setView(newView);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col lg:flex-row gap-6 h-full"
            >
                {/* Main Calendar View */}
                <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col">
                    <CalendarHeader
                        calendarRef={calendarRef}
                        currentView={view}
                        onViewChange={handleViewChange}
                        onCreate={() => setIsCreateModalOpen(true)}
                    />
                    <div className="flex-1 min-h-0">
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={false}
                            initialView={view}
                            events={events}
                            editable={true}
                            selectable={true}
                            eventContent={(eventInfo) => <CalendarEventContent eventInfo={eventInfo} />}
                            eventClick={handleEventClick}
                            dateClick={handleDateClick}
                            eventDrop={handleEventDrop}
                            dayMaxEvents={true} // Important for clean UI
                            height="100%"
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <CalendarSidebar events={events} />
                </div>
            </motion.div>

            <EventDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                event={selectedEvent}
                onUpdate={handleUpdateEvent}
                onDelete={handleDeleteEvent}
            />
            
            <EventCreationModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateEvent}
                date={dateForNewEvent}
                users={getUsers()}
                programs={getPrograms()}
            />

            <ConfirmationDialog
                isOpen={isConfirmModalOpen}
                onClose={cancelReschedule}
                onConfirm={confirmReschedule}
                title="Confirm Reschedule"
                description={`Reschedule "${draggedEventInfo?.event.title}" to ${draggedEventInfo?.event.start.toLocaleDateString()}?`}
            />
        </>
    );
};

export default GlobalCalendarPage;
