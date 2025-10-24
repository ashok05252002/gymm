import React from 'react';
import toast from 'react-hot-toast';
import Modal from '../shared/Modal';
import { FileText, FileSpreadsheet, FileType } from 'lucide-react';

const ExportModal = ({ isOpen, onClose }) => {
    const handleExport = (format) => {
        toast.success(`Exporting report as ${format}...`);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Export Report">
            <div className="space-y-4">
                <p className="text-gray-600">Choose the format for your report:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                        onClick={() => handleExport('PDF')}
                        className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border-2 border-transparent hover:border-brand-red hover:bg-red-50 transition-all"
                    >
                        <FileText size={32} className="text-brand-red mb-2" />
                        <span className="font-semibold text-gray-700">PDF</span>
                    </button>
                    <button
                        onClick={() => handleExport('Excel')}
                        className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border-2 border-transparent hover:border-brand-green hover:bg-green-50 transition-all"
                    >
                        <FileSpreadsheet size={32} className="text-brand-green mb-2" />
                        <span className="font-semibold text-gray-700">Excel (XLSX)</span>
                    </button>
                    <button
                        onClick={() => handleExport('CSV')}
                        className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg border-2 border-transparent hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                        <FileType size={32} className="text-blue-500 mb-2" />
                        <span className="font-semibold text-gray-700">CSV</span>
                    </button>
                </div>
                <div className="pt-4 flex justify-end">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
                </div>
            </div>
        </Modal>
    );
};

export default ExportModal;
