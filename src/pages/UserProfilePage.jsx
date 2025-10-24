import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getUserById } from '../data/mockData';
import ProfileHeader from '../components/users/UserProfile/ProfileHeader';
import PlanHistory from '../components/users/UserProfile/PlanHistory';
import ActivityFeed from '../components/users/UserProfile/ActivityFeed';
import UserAccessLog from '../components/users/UserProfile/UserAccessLog';

const UserProfilePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // In a real app, you'd fetch this data from an API
        const userData = getUserById(userId);
        setUser(userData);
    }, [userId]);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading user profile...</p>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div>
                <Link to="/admin/users" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-red">
                    <ArrowLeft size={18} />
                    Back to User List
                </Link>
            </div>
            
            <ProfileHeader user={user} />

            <motion.div 
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="lg:col-span-2 space-y-6">
                    <PlanHistory planHistory={user.planHistory} />
                    <UserAccessLog userId={user.id} />
                </div>
                <div className="lg:col-span-1">
                    <ActivityFeed activityLog={user.activityLog} />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default UserProfilePage;
