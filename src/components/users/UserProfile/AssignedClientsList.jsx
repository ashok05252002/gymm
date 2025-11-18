import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getTrainerClients } from '../../../data/mockData';
import StatusBadge from '../../shared/StatusBadge';

const AssignedClientsList = ({ trainerId }) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        setClients(getTrainerClients(trainerId));
    }, [trainerId]);

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 font-display mb-4">Assigned Clients</h3>
            <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                {clients.length > 0 ? clients.map(client => (
                    <Link to={`/admin/users/${client.id}`} key={client.id} className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-semibold text-gray-800">{client.name}</p>
                                    <p className="text-xs text-gray-500">{client.email}</p>
                                </div>
                            </div>
                            <StatusBadge status={client.status} />
                        </div>
                    </Link>
                )) : (
                    <p className="text-center text-gray-500 py-8">No clients assigned to this trainer.</p>
                )}
            </div>
        </motion.div>
    );
};

export default AssignedClientsList;
