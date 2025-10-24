import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import ManualEntryModal from './ManualEntryModal';
import { getUsers } from '../../data/mockData';

const ManualEntryTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [members] = useState(getUsers().filter(u => u.role === 'Member'));

    const handleSave = (entryData) => {
        console.log("Manual Entry:", entryData);
        toast.success(`Manual entry for ${entryData.memberName} saved.`);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <h3 className="text-lg font-bold text-gray-800">Manual Member Entry</h3>
                <p className="text-gray-500 mt-2 mb-4">For cases where automated check-in fails or for guests.</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-red-600 text-sm font-medium mx-auto"
                >
                    <Plus size={18} /> Add Manual Entry
                </button>
            </div>
            <ManualEntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                members={members}
            />
        </>
    );
};

export default ManualEntryTab;
