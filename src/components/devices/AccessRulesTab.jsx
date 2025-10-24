import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getAccessRules, getPlans } from '../../data/mockData';
import RuleFormModal from './RuleFormModal';
import ConfirmationDialog from '../shared/ConfirmationDialog';

const AccessRulesTab = () => {
    const [rules, setRules] = useState(getAccessRules());
    const [plans] = useState(getPlans());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deletingRule, setDeletingRule] = useState(null);

    const handleAdd = () => {
        setEditingRule(null);
        setIsModalOpen(true);
    };

    const handleEdit = (rule) => {
        setEditingRule(rule);
        setIsModalOpen(true);
    };

    const handleDelete = (rule) => {
        setDeletingRule(rule);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        setRules(rules.filter(r => r.id !== deletingRule.id));
        toast.success(`Rule "${deletingRule.name}" has been deleted.`);
        setIsConfirmOpen(false);
        setDeletingRule(null);
    };

    const handleSave = (ruleData) => {
        const linkedPlan = plans.find(p => p.id === ruleData.planId);
        const dataWithPlanName = { ...ruleData, planName: linkedPlan ? linkedPlan.name : 'N/A' };

        if (editingRule) {
            setRules(rules.map(r => r.id === editingRule.id ? dataWithPlanName : r));
            toast.success('Rule updated successfully.');
        } else {
            const newRule = { id: `RULE-${Date.now()}`, ...dataWithPlanName };
            setRules([newRule, ...rules]);
            toast.success('Rule added successfully.');
        }
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Defined Access Rules</h3>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-600 text-sm font-medium">
                    <Plus size={18} /> Add Rule
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Rule Name</th>
                            <th scope="col" className="px-6 py-3">Linked Plan</th>
                            <th scope="col" className="px-6 py-3">Time Window</th>
                            <th scope="col" className="px-6 py-3">Behavior</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rules.map(rule => (
                            <tr key={rule.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{rule.name}</td>
                                <td className="px-6 py-4">{rule.planName}</td>
                                <td className="px-6 py-4">{rule.timeWindow}</td>
                                <td className="px-6 py-4">{rule.behavior}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <button onClick={() => handleEdit(rule)} title="Edit Rule" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(rule)} title="Delete Rule" className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <RuleFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} rule={editingRule} plans={plans} />
            <ConfirmationDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={confirmDelete} title="Confirm Deletion" description={`Are you sure you want to delete the rule "${deletingRule?.name}"?`} />
        </div>
    );
};

export default AccessRulesTab;
