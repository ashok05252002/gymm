import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getEnquiries, getUsers, getPrograms, getPlans } from '../data/mockData';
import Tabs from '../components/shared/Tabs';
import FloatingActionButton from '../components/shared/FloatingActionButton';
import EnquiriesTab from '../components/enquiries/EnquiriesTab';
import AddEnquiryModal from '../components/enquiries/AddEnquiryModal';
import FollowUpTrackerTab from '../components/enquiries/FollowUpTrackerTab';
import ConversionAnalyticsTab from '../components/enquiries/ConversionAnalyticsTab';
import FollowUpModal from '../components/enquiries/FollowUpModal';
import ConvertModal from '../components/enquiries/ConvertModal';
import ConfirmationDialog from '../components/shared/ConfirmationDialog';
import MemberRegistrationWizard from '../components/registration/MemberRegistrationWizard';

const EnquiryManagementPage = () => {
    const [enquiries, setEnquiries] = useState(getEnquiries());
    const navigate = useNavigate();
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
    const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const [activeEnquiry, setActiveEnquiry] = useState(null);
    const [conversionData, setConversionData] = useState(null);
    const [actionToConfirm, setActionToConfirm] = useState(null);

    const trainers = getUsers().filter(u => u.role === 'Trainer');
    const programs = getPrograms();
    const plans = getPlans();

    const handleAddEnquiry = () => setIsAddModalOpen(true);

    const handleScheduleFollowUp = (enquiry) => {
        setActiveEnquiry(enquiry);
        setIsFollowUpModalOpen(true);
    };

    const handleConvertToMember = (enquiry) => {
        setActiveEnquiry(enquiry);
        setIsConvertModalOpen(true);
    };

    const handleDeleteEnquiry = (enquiry) => {
        setActiveEnquiry(enquiry);
        setActionToConfirm('delete');
        setIsConfirmOpen(true);
    };

    const handleSaveEnquiry = (enquiryData) => {
        const newEnquiry = {
            id: `ENQ-${Date.now()}`,
            ...enquiryData,
            date: new Date(),
            status: 'New',
            nextFollowUp: null,
        };
        setEnquiries([newEnquiry, ...enquiries]);
        setIsAddModalOpen(false);
        toast.success('Enquiry saved successfully.');
    };

    const handleSaveFollowUp = (followUpData) => {
        setEnquiries(enquiries.map(enq => 
            enq.id === activeEnquiry.id 
            ? { ...enq, ...followUpData, status: 'Follow-up' } 
            : enq
        ));
        setIsFollowUpModalOpen(false);
        setActiveEnquiry(null);
        toast.success('Follow-up scheduled successfully.');
    };

    const handleSaveConversion = (data) => {
        setConversionData(data);
        setIsConvertModalOpen(false);
        setIsWizardOpen(true); // Open the registration wizard
    };

    const handleRegistrationSuccess = (newMember) => {
        toast.success(`Member ${newMember.personal.name} registered successfully!`);
        setEnquiries(enquiries.map(enq => 
            enq.id === activeEnquiry.id 
            ? { ...enq, status: 'Converted' } 
            : enq
        ));
        setIsWizardOpen(false);
        setActiveEnquiry(null);
        setConversionData(null);
        // Navigate to the new member's profile
        navigate(`/receptionist/members/${newMember.id}`);
    };

    const confirmAction = () => {
        if (actionToConfirm === 'delete') {
            setEnquiries(enquiries.filter(enq => enq.id !== activeEnquiry.id));
            toast.success('Enquiry deleted successfully.');
        }
        setIsConfirmOpen(false);
        setActiveEnquiry(null);
        setActionToConfirm(null);
    };

    const tabs = [
        { label: 'All Enquiries', content: <EnquiriesTab enquiries={enquiries} onSchedule={handleScheduleFollowUp} onConvert={handleConvertToMember} onDelete={handleDeleteEnquiry} /> },
        { label: 'Follow-up Tracker', content: <FollowUpTrackerTab enquiries={enquiries.filter(e => e.status === 'Follow-up' || e.status === 'New')} onSchedule={handleScheduleFollowUp} /> },
        { label: 'Conversion Analytics', content: <ConversionAnalyticsTab enquiries={enquiries} /> },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <h1 className="text-3xl font-bold font-display text-gray-800">Enquiry Management</h1>
                <Tabs tabs={tabs} />

                <FloatingActionButton onClick={handleAddEnquiry}>
                    <Plus size={24} />
                </FloatingActionButton>
            </motion.div>

            <AddEnquiryModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveEnquiry}
                trainers={trainers}
                programs={programs}
            />

            <FollowUpModal
                isOpen={isFollowUpModalOpen}
                onClose={() => setIsFollowUpModalOpen(false)}
                onSave={handleSaveFollowUp}
                enquiry={activeEnquiry}
            />
            
            <ConvertModal
                isOpen={isConvertModalOpen}
                onClose={() => setIsConvertModalOpen(false)}
                onSave={handleSaveConversion}
                enquiry={activeEnquiry}
                plans={plans}
            />

            <ConfirmationDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmAction}
                title="Confirm Deletion"
                description={`Are you sure you want to delete the enquiry for "${activeEnquiry?.name}"?`}
            />

            <MemberRegistrationWizard
                isOpen={isWizardOpen}
                onClose={() => setIsWizardOpen(false)}
                onSuccess={handleRegistrationSuccess}
                initialData={activeEnquiry}
                conversionData={conversionData}
            />
        </>
    );
};

export default EnquiryManagementPage;
