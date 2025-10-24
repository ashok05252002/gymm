import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';

const AddEnquiryModal = ({ isOpen, onClose, onSave, trainers, programs }) => {
    const initialFormState = {
        name: '',
        contact: '',
        email: '',
        selectedPrograms: [],
        goal: '',
        source: 'Walk-in',
        assignedTrainer: 'None',
        remarks: '',
    };
    
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormState);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProgramToggle = (programName) => {
        setFormData(prev => {
            const selected = prev.selectedPrograms;
            if (selected.includes(programName)) {
                return { ...prev, selectedPrograms: selected.filter(p => p !== programName) };
            }
            return { ...prev, selectedPrograms: [...selected, programName] };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.contact) {
            toast.error('Full Name and Contact Number are required.');
            return;
        }
        onSave({
            name: formData.name,
            contact: formData.contact,
            email: formData.email,
            programs: formData.selectedPrograms,
            goal: formData.goal,
            source: formData.source,
            assignedTrainer: formData.assignedTrainer,
            remarks: formData.remarks,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Enquiry">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Program(s)</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {programs.map(program => (
                            <label key={program.id} className={`flex items-center gap-2 p-2 rounded-md border-2 cursor-pointer transition-colors ${formData.selectedPrograms.includes(program.name) ? 'bg-red-50 border-brand-red' : 'bg-gray-50 border-gray-200'}`}>
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-brand-red focus:ring-brand-red"
                                    checked={formData.selectedPrograms.includes(program.name)}
                                    onChange={() => handleProgramToggle(program.name)}
                                />
                                <span className="text-sm font-medium text-gray-800">{program.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fitness Goal</label>
                    <textarea name="goal" value={formData.goal} onChange={handleChange} rows="2" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Source of Enquiry</label>
                        <select name="source" value={formData.source} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red">
                            <option>Walk-in</option>
                            <option>Phone</option>
                            <option>Social Media</option>
                            <option>Referral</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Assign Trainer (Optional)</label>
                        <select name="assignedTrainer" value={formData.assignedTrainer} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red">
                            <option>None</option>
                            {trainers.map(trainer => (
                                <option key={trainer.id} value={trainer.name}>{trainer.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Remarks</label>
                    <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="2" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red"></textarea>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save Enquiry</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddEnquiryModal;
