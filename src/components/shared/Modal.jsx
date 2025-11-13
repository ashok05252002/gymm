import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { y: "50px", opacity: 0 },
  };
  
  const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className={`bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size] || sizeClasses.lg}`}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold font-display text-gray-800">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
                {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
