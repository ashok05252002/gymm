import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.label}
                            onClick={() => setActiveTab(index)}
                            className={`${
                                activeTab === index
                                    ? 'border-brand-red text-brand-red'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm relative`}
                        >
                            {tab.label}
                            {activeTab === index && (
                                <motion.div
                                    className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-brand-red"
                                    layoutId="underline"
                                />
                            )}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="mt-6">
                {tabs[activeTab] && tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;
