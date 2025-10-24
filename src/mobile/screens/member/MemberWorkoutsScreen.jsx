import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import MobileTabs from '../../components/shared/MobileTabs';
import { getMemberWorkouts } from '../../../data/mockData';

const WorkoutList = ({ workouts }) => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheck = (workoutId, exerciseIndex) => {
        const key = `${workoutId}-${exerciseIndex}`;
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-4">
            {workouts.map(workout => (
                <div key={workout.id} className="bg-white p-4 rounded-3xl shadow-sm">
                    <h3 className="font-bold text-lg mb-3">{workout.title}</h3>
                    <div className="space-y-3">
                        {workout.exercises.map((ex, index) => {
                            const isChecked = checkedItems[`${workout.id}-${index}`] || ex.done;
                            return (
                                <div key={index} className="flex items-center gap-3">
                                    <button 
                                        onClick={() => handleCheck(workout.id, index)}
                                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                                            isChecked ? 'bg-brand-green border-brand-green' : 'border-gray-300'
                                        }`}
                                    >
                                        {isChecked && <Check size={16} className="text-white" />}
                                    </button>
                                    <p className={`flex-1 font-medium ${isChecked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{ex.name}</p>
                                    <p className="text-sm text-gray-500">{ex.sets} sets, {ex.reps} reps</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const MemberWorkoutsScreen = () => {
    const allWorkouts = getMemberWorkouts();
    const todaysPlan = allWorkouts.slice(0, 1);

    const tabs = [
        { label: "Today's Plan", content: <WorkoutList workouts={todaysPlan} /> },
        { label: "All Workouts", content: <WorkoutList workouts={allWorkouts} /> },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">My Workouts</h1>
            <MobileTabs tabs={tabs} />
        </motion.div>
    );
};

export default MemberWorkoutsScreen;
