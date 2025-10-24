import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageSquare, CheckCircle, FileText, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MemberActionsModal = ({ isOpen, onClose, member }) => {
    const navigate = useNavigate();
    if (!member) return null;

    const handleViewProfile = () => {
        navigate(`/mobile/trainer/clients/${member.id}`);
        onClose();
    };

    const actions = [
        { label: 'View Full Profile', icon: User, action: handleViewProfile },
        { label: 'Send Message', icon: MessageSquare, action: () => toast('Message sent (mock).') },
        { label: 'Mark Attendance', icon: CheckCircle, action: () => toast.success('Attendance marked.') },
        { label: 'Add Note', icon: FileText, action: () => toast('Note added (mock).') },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "100%" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-gray-50 w-full max-w-lg rounded-t-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 flex items-center justify-center relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><X size={20} /></button>
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">{member.name}</h2>
                        </div>
                        <div className="p-4 space-y-2">
                            {actions.map(action => (
                                <button
                                    key={action.label}
                                    onClick={() => { action.action(); }}
                                    className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl text-left"
                                >
                                    <action.icon size={22} className="text-brand-red" />
                                    <span className="font-semibold text-gray-700">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MemberActionsModal;
