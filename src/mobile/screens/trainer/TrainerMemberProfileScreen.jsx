import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getUserById, getSessions } from '../../../data/mockData';
import MobileTabs from '../../components/shared/MobileTabs';
import ProfileStatCard from '../../components/cards/ProfileStatCard';

const TrainerMemberProfileScreen = () => {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const client = getUserById(memberId);
    
    if (!client) {
        return <div className="text-center p-8">Client not found.</div>;
    }

    const clientSessions = getSessions().filter(s => s.memberId === memberId).sort((a,b) => b.dateTime - a.dateTime);

    const OverviewTab = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
                <ProfileStatCard label="Plan" value={client.planHistory[0]?.planName || 'N/A'} />
                <ProfileStatCard label="Status" value={client.status} />
                <ProfileStatCard label="Total Sessions" value={clientSessions.length} />
            </div>
            <div className="bg-white p-4 rounded-2xl">
                <h4 className="font-bold mb-2">Fitness Goals</h4>
                <p className="text-sm text-gray-600">
                    {client.activityLog[0]?.action || 'No recent goals defined.'}
                </p>
            </div>
        </div>
    );

    const SessionsTab = () => (
        <div className="space-y-3">
            {clientSessions.map(session => (
                <div key={session.id} className="bg-white p-4 rounded-2xl flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{new Date(session.dateTime).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">{session.trainerName}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${session.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {session.status}
                    </span>
                </div>
            ))}
        </div>
    );

    const tabs = [
        { label: 'Overview', content: <OverviewTab /> },
        { label: 'Sessions', content: <SessionsTab /> },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white">
                    <ArrowLeft size={20} />
                </button>
                <img src={client.avatar} alt={client.name} className="w-12 h-12 rounded-full" />
                <div>
                    <h1 className="text-xl font-bold">{client.name}</h1>
                    <p className="text-sm text-gray-500">{client.email}</p>
                </div>
            </div>
            <MobileTabs tabs={tabs} />
        </motion.div>
    );
};

export default TrainerMemberProfileScreen;
