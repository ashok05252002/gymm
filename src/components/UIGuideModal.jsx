import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ColorSwatch = ({ name, hex, className }) => (
    <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg ${className}`}></div>
        <div>
            <p className="font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-500 font-mono">{hex}</p>
        </div>
    </div>
);

const TypographySample = ({ name, className, fontClass }) => (
    <div>
        <p className={`text-sm text-gray-500 mb-1 ${fontClass}`}>{name}</p>
        <p className={className}>Aa Bb Cc</p>
    </div>
);

const RadiusSample = ({ name, className }) => (
    <div className="flex flex-col items-center gap-2">
        <div className={`w-16 h-16 bg-gray-100 border-2 border-gray-300 ${className}`}></div>
        <p className="text-xs text-gray-600 font-mono">{name}</p>
    </div>
);

const UIGuideModal = ({ isOpen, onClose }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { y: "50px", opacity: 0 },
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
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold font-display text-gray-800">UI Design System Guide</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-8 overflow-y-auto">
                {/* Colors Section */}
                <section>
                    <h4 className="text-lg font-bold font-display mb-4">Colors</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <ColorSwatch name="Brand Red" hex="#FF3B30" className="bg-brand-red" />
                        <ColorSwatch name="Brand Green" hex="#00C853" className="bg-brand-green" />
                        <ColorSwatch name="Brand Dark" hex="#1a1a1a" className="bg-brand-dark" />
                        <ColorSwatch name="Gray 100" hex="#F3F4F6" className="bg-gray-100 border" />
                        <ColorSwatch name="Gray 500" hex="#6B7280" className="bg-gray-500" />
                        <ColorSwatch name="Gray 800" hex="#1F2937" className="bg-gray-800" />
                    </div>
                </section>

                {/* Typography Section */}
                <section>
                    <h4 className="text-lg font-bold font-display mb-4">Typography</h4>
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="font-semibold">Display Font: Poppins</p>
                            <p className="font-display text-3xl mt-2">The quick brown fox</p>
                        </div>
                         <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="font-semibold">Body Font: Inter</p>
                            <p className="font-sans text-base mt-2">The quick brown fox jumps over the lazy dog.</p>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                            <TypographySample name="text-xs" className="text-xs" />
                            <TypographySample name="text-sm" className="text-sm" />
                            <TypographySample name="text-base" className="text-base" />
                            <TypographySample name="text-lg" className="text-lg" />
                            <TypographySample name="text-xl" className="text-xl" />
                            <TypographySample name="text-2xl" className="text-2xl" />
                        </div>
                    </div>
                </section>

                {/* Spacing & Radius Section */}
                <section>
                    <h4 className="text-lg font-bold font-display mb-4">Border Radius (Curves)</h4>
                    <div className="flex items-end justify-around gap-4 p-6 bg-gray-50 rounded-lg">
                        <RadiusSample name="rounded-lg" className="rounded-lg" />
                        <RadiusSample name="rounded-xl" className="rounded-xl" />
                        <RadiusSample name="rounded-2xl" className="rounded-2xl" />
                        <RadiusSample name="rounded-3xl" className="rounded-3xl" />
                        <RadiusSample name="rounded-full" className="rounded-full" />
                    </div>
                </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UIGuideModal;
