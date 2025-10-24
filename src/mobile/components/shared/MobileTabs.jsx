import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MobileTabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="p-1 bg-gray-200 rounded-full flex items-center">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(index)}
                        className="w-full py-2.5 text-sm font-semibold rounded-full relative transition-colors"
                        style={{
                            color: activeTab === index ? '#fff' : '#374151',
                        }}
                    >
                        {activeTab === index && (
                            <motion.div
                                layoutId="mobile-tab-underline"
                                className="absolute inset-0 bg-brand-red rounded-full z-0"
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div className="mt-6">
                {tabs[activeTab] && tabs[activeTab].content}
            </div>
        </div>
    );
};

export default MobileTabs;
