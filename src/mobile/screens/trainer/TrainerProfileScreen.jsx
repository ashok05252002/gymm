import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, Edit, QrCode } from 'lucide-react';
import { getTrainerData } from '../../../data/mockData';
import { useNavigate } from 'react-router-dom';
import QrCodeModal from '../../components/popups/QrCodeModal';

const TrainerProfileScreen = () => {
    const { trainer } = getTrainerData();
    const navigate = useNavigate();
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);

    const stats = [
        { label: 'Total Clients', value: 15 },
        { label: 'Sessions This Month', value: 42 },
    ];

    const actions = [
        { label: 'Edit Info', icon: Edit, action: () => {} },
        { label: 'Show Access QR', icon: QrCode, action: () => setIsQrModalOpen(true) },
        { label: 'Settings', icon: Settings, action: () => {} },
        { label: 'Logout', icon: LogOut, action: () => navigate('/login'), color: 'text-red-500' },
    ];

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col items-center text-center relative">
                    <button className="absolute top-0 right-0 p-2 text-gray-500 hover:text-brand-red">
                        <Edit size={20} />
                    </button>
                    <img src={trainer.avatar} alt={trainer.name} className="w-24 h-24 rounded-full shadow-lg" />
                    <h1 className="text-2xl font-bold mt-4">{trainer.name}</h1>
                    <p className="text-gray-500 bg-gray-200 px-3 py-1 rounded-full text-xs mt-2 font-medium">Lead Trainer</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {stats.map(stat => (
                        <div key={stat.label} className="bg-white p-4 rounded-3xl text-center">
                            <p className="font-bold text-lg text-brand-red">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl p-2 space-y-1">
                    {actions.map(action => (
                        <button
                            key={action.label}
                            onClick={action.action}
                            className={`w-full flex items-center gap-4 p-3 rounded-2xl text-left transition-colors hover:bg-gray-100 ${action.color || 'text-gray-700'}`}
                        >
                            <action.icon size={22} />
                            <span className="font-semibold">{action.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
            <QrCodeModal 
                isOpen={isQrModalOpen}
                onClose={() => setIsQrModalOpen(false)}
                title="Trainer Access QR"
                value={trainer.id}
            />
        </>
    );
};

export default TrainerProfileScreen;
