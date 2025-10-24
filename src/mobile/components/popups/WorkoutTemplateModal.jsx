import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const WorkoutTemplateModal = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('Beginner');
    const [duration, setDuration] = useState('');
    const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '' }]);

    const handleExerciseChange = (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index][field] = value;
        setExercises(newExercises);
    };

    const addExercise = () => {
        setExercises([...exercises, { name: '', sets: '', reps: '' }]);
    };

    const removeExercise = (index) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!title || !duration || exercises.some(ex => !ex.name)) {
            toast.error("Please fill all required fields.");
            return;
        }
        onSave({ title, level, duration, exercises });
        // Reset form
        setTitle('');
        setLevel('Beginner');
        setDuration('');
        setExercises([{ name: '', sets: '', reps: '' }]);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-gray-50 w-full max-w-lg rounded-t-3xl h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                            <h2 className="text-lg font-bold text-gray-800">Add Workout Template</h2>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200"><X size={20} /></button>
                        </div>
                        <div className="p-4 space-y-4 overflow-y-auto flex-1">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Workout Title</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full mt-1 p-3 border border-gray-300 rounded-xl" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Level</label>
                                    <select value={level} onChange={e => setLevel(e.target.value)} className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white">
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Duration (mins)</label>
                                    <input type="number" value={duration} onChange={e => setDuration(e.target.value)} className="w-full mt-1 p-3 border border-gray-300 rounded-xl" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Exercises</label>
                                <div className="space-y-2 mt-1">
                                    {exercises.map((ex, index) => (
                                        <div key={index} className="grid grid-cols-8 gap-2 items-center">
                                            <input type="text" placeholder="Name" value={ex.name} onChange={e => handleExerciseChange(index, 'name', e.target.value)} className="col-span-4 p-2 border rounded-lg" />
                                            <input type="text" placeholder="Sets" value={ex.sets} onChange={e => handleExerciseChange(index, 'sets', e.target.value)} className="col-span-1 p-2 border rounded-lg text-center" />
                                            <input type="text" placeholder="Reps" value={ex.reps} onChange={e => handleExerciseChange(index, 'reps', e.target.value)} className="col-span-2 p-2 border rounded-lg text-center" />
                                            <button onClick={() => removeExercise(index)} className="col-span-1 text-red-500 hover:bg-red-100 p-2 rounded-full"><Trash2 size={16} /></button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={addExercise} className="mt-2 text-sm font-semibold text-brand-red flex items-center gap-1"><Plus size={16} /> Add Exercise</button>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 flex-shrink-0">
                            <button onClick={handleSubmit} className="w-full bg-brand-red text-white font-bold py-4 rounded-2xl">Save Workout</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WorkoutTemplateModal;
