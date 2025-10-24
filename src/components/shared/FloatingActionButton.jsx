import React from 'react';
import { motion } from 'framer-motion';

const FloatingActionButton = ({ onClick, children }) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-brand-red text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-40"
            aria-label="Add new item"
        >
            {children}
        </motion.button>
    );
};

export default FloatingActionButton;
