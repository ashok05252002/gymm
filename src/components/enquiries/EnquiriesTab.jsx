import React from 'react';
import EnquiriesTable from './EnquiriesTable';

const EnquiriesTab = ({ enquiries, onSchedule, onConvert, onDelete }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">All Enquiries</h3>
                {/* Filters can be added here */}
            </div>
            <EnquiriesTable 
                enquiries={enquiries}
                onSchedule={onSchedule}
                onConvert={onConvert}
                onDelete={onDelete}
            />
        </div>
    );
};

export default EnquiriesTab;
