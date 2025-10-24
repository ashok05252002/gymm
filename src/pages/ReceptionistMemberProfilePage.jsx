import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getUserById } from '../data/mockData';
import ProfileHeader from '../components/users/UserProfile/ProfileHeader';
import PlanHistory from '../components/users/UserProfile/PlanHistory';
import Tabs from '../components/shared/Tabs';

const ReceptionistMemberProfilePage = () => {
    const { memberId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = getUserById(memberId);
        setUser(userData);
    }, [memberId]);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading member profile...</p>
            </div>
        );
    }
    
    const tabs = [
        { label: 'Profile Details', content: <div className="p-6 bg-white rounded-lg">Profile details form will be here.</div> },
        { label: 'Attendance', content: <div className="p-6 bg-white rounded-lg">Attendance log will be here.</div> },
        { label: 'Payments', content: <div className="p-6 bg-white rounded-lg">Payment history will be here.</div> },
        { label: 'Sessions', content: <div className="p-6 bg-white rounded-lg">Booked sessions will be here.</div> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <Link to="/receptionist/enquiries" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-red">
                    <ArrowLeft size={18} />
                    Back to Enquiries
                </Link>
            </div>
            
            <ProfileHeader user={user} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Tabs tabs={tabs} />
                </div>
                <div className="lg:col-span-1">
                    <PlanHistory planHistory={user.planHistory} />
                </div>
            </div>
        </motion.div>
    );
};

export default ReceptionistMemberProfilePage;
