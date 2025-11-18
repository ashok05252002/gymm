import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const EditMemberProfileModal = ({ isOpen, onClose, onSave, user }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.email) {
            toast.error("Name and email are required.");
            return;
        }
        onSave(formData);
    };

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
                        className="bg-gray-50 w-full max-w-lg rounded-t-3xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                            <h2 className="text-lg font-bold text-gray-800">Edit Profile</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><X size={20} /></button>
                        </div>
                        <div className="p-4 space-y-4 overflow-y-auto">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-300 rounded-xl" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-300 rounded-xl" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-300 rounded-xl" />
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 flex-shrink-0">
                            <button onClick={handleSubmit} className="w-full bg-brand-red text-white font-bold py-4 rounded-2xl">Save Changes</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditMemberProfileModal;
