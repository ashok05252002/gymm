import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { getTrainerClients, getTrainerData } from '../../../data/mockData';
import MemberCard from '../../components/cards/MemberCard';
import MemberActionsModal from '../../components/popups/MemberActionsModal';

const TrainerClientsScreen = () => {
    const { trainer } = getTrainerData();
    const [clients] = useState(getTrainerClients(trainer.id));
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const handleClientClick = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-800">My Clients</h1>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 bg-white rounded-2xl focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red outline-none"
                    />
                </div>
                <div className="space-y-3">
                    {filteredClients.map(client => (
                        <MemberCard key={client.id} member={client} onClick={() => handleClientClick(client)} />
                    ))}
                </div>
            </motion.div>
            <MemberActionsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                member={selectedClient}
            />
        </>
    );
};

export default TrainerClientsScreen;
