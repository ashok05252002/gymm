import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const QrCodeModal = ({ isOpen, onClose, title, value }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-white w-full max-w-xs rounded-3xl p-6 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={20} /></button>
                        </div>
                        <div className="p-4 bg-white rounded-xl inline-block">
                            <QRCodeSVG value={value} size={200} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} includeMargin={false} />
                        </div>
                        <p className="mt-4 text-sm text-gray-500">Scan this code for gym access.</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QrCodeModal;
