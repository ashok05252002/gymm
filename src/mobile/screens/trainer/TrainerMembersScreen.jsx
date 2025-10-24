import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { getTrainerMembers } from '../../../data/mockData';
import MemberCard from '../../components/cards/MemberCard';
import MemberActionsModal from '../../components/popups/MemberActionsModal';

const TrainerMembersScreen = () => {
    const [members] = useState(getTrainerMembers());
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 bg-white rounded-2xl focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none"
                    />
                </div>
                <div className="space-y-3">
                    {filteredMembers.map(member => (
                        <MemberCard key={member.id} member={member} onClick={() => handleMemberClick(member)} />
                    ))}
                </div>
            </motion.div>
            <MemberActionsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                member={selectedMember}
            />
        </>
    );
};

export default TrainerMembersScreen;
