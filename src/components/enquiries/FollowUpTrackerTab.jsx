import React from 'react';
import FollowUpTable from './FollowUpTable';

const FollowUpTrackerTab = ({ enquiries, onSchedule }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Follow-up Tracker</h3>
                {/* Filters can be added here */}
            </div>
            <FollowUpTable enquiries={enquiries} onSchedule={onSchedule} />
        </div>
    );
};

export default FollowUpTrackerTab;
