import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '../../shared/Modal';
import AssignPlanModal from '../../plans/AssignPlanModal';
import { Power, Check, Plus } from 'lucide-react';

const EditMemberModal = ({ isOpen, onClose, onSave, user, allPlans }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [planHistory, setPlanHistory] = useState([]);
    const [isAssignPlanModalOpen, setIsAssignPlanModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
            setPlanHistory(user.planHistory || []);
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDeactivatePlan = (planToDeactivate) => {
        const updatedHistory = planHistory.map(p =>
            p.startDate === planToDeactivate.startDate && p.planName === planToDeactivate.planName
                ? { ...p, status: 'Expired' }
                : p
        );
        setPlanHistory(updatedHistory);
        toast.success(`Plan "${planToDeactivate.planName}" deactivated.`);
    };

    const handleSetActivePlan = (planToActivate) => {
        // Deactivate any currently active plan and activate the selected one
        const updatedHistory = planHistory.map(p => {
            if (p.startDate === planToActivate.startDate && p.planName === planToActivate.planName) {
                return { ...p, status: 'Active' };
            }
            if (p.status === 'Active') {
                return { ...p, status: 'Expired' };
            }
            return p;
        });
        setPlanHistory(updatedHistory);
        toast.success(`Set "${planToActivate.planName}" as the active plan.`);
    };

    const handleAddNewPlan = (assignmentData) => {
        const newPlanEntry = {
            planName: assignmentData.planName,
            startDate: new Date(assignmentData.startDate),
            endDate: new Date(assignmentData.endDate),
            status: 'Expired', // Add as expired by default, can be activated
        };
        setPlanHistory([newPlanEntry, ...planHistory]);
        toast.success(`Added new plan "${assignmentData.planName}" to history.`);
        setIsAssignPlanModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, planHistory });
    };

    const activePlan = planHistory.find(p => p.status === 'Active');
    const inactivePlans = planHistory.filter(p => p.status !== 'Active');

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title={`Edit Member: ${user?.name}`} size="4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Details Section */}
                        <fieldset className="border border-gray-200 p-4 rounded-lg space-y-4">
                            <legend className="text-lg font-semibold px-2">Personal Details</legend>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                            </div>
                        </fieldset>

                        {/* Plan Management Section */}
                        <fieldset className="border border-gray-200 p-4 rounded-lg space-y-4 flex flex-col">
                            <legend className="text-lg font-semibold px-2">Plan Management</legend>
                            <div>
                                <h4 className="font-medium text-gray-800">Active Plan</h4>
                                {activePlan ? (
                                    <div className="mt-2 p-3 rounded-lg flex justify-between items-center bg-green-50 border border-green-200">
                                        <div>
                                            <p className="font-semibold">{activePlan.planName}</p>
                                            <p className="text-xs text-gray-500">{new Date(activePlan.startDate).toLocaleDateString()} - {new Date(activePlan.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeactivatePlan(activePlan)}
                                            className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                                        >
                                            <Power size={14} /> Deactivate
                                        </button>
                                    </div>
                                ) : (
                                    <p className="mt-2 text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">No active plan.</p>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col">
                                <h4 className="font-medium text-gray-800">Plan History (Inactive)</h4>
                                <div className="mt-2 flex-1 max-h-40 overflow-y-auto space-y-2 pr-2">
                                    {inactivePlans.length > 0 ? inactivePlans.map((plan, index) => (
                                        <div key={index} className="p-3 rounded-lg flex justify-between items-center bg-gray-50">
                                            <div>
                                                <p className="font-semibold">{plan.planName}</p>
                                                <p className="text-xs text-gray-500">{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleSetActivePlan(plan)}
                                                className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            >
                                                <Check size={14} /> Set Active
                                            </button>
                                        </div>
                                    )) : <p className="text-sm text-gray-400 text-center py-4">No inactive plans.</p>}
                                </div>
                            </div>
                            <button type="button" onClick={() => setIsAssignPlanModalOpen(true)} className="w-full text-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 mt-auto">
                                <Plus size={16} /> Add New Plan to History
                            </button>
                        </fieldset>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600">Save Changes</button>
                    </div>
                </form>
            </Modal>
            <AssignPlanModal
                isOpen={isAssignPlanModalOpen}
                onClose={() => setIsAssignPlanModalOpen(false)}
                onAssign={handleAddNewPlan}
                users={[user]}
                plans={allPlans}
            />
        </>
    );
};

export default EditMemberModal;
