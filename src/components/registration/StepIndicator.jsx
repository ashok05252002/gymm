import React from 'react';
import { motion } from 'framer-motion';

const StepIndicator = ({ steps, currentStep }) => {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`}>
                        <div className="flex items-center">
                            <span className="flex-shrink-0">
                                {stepIdx < currentStep ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red"
                                    >
                                        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                        </svg>
                                    </motion.div>
                                ) : stepIdx === currentStep ? (
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-red">
                                        <span className="text-brand-red">{`0${stepIdx + 1}`}</span>
                                    </span>
                                ) : (
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                                        <span className="text-gray-500">{`0${stepIdx + 1}`}</span>
                                    </span>
                                )}
                            </span>
                            <span className="ml-4 hidden sm:flex min-w-0 flex-col">
                                <span className={`text-sm font-medium ${stepIdx <= currentStep ? 'text-brand-red' : 'text-gray-500'}`}>{step.name}</span>
                            </span>
                        </div>

                        {stepIdx !== steps.length - 1 && (
                            <div className="absolute inset-0 left-4 top-4 -z-10 hidden h-full w-full sm:block" aria-hidden="true">
                                <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                                    <path d="M0.5 0v80" stroke="currentColor" vectorEffect="non-scaling-stroke" />
                                </svg>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default StepIndicator;
