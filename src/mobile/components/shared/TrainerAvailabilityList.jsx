import React from 'react';
import { isTrainerAvailable } from '../../../data/mockData';

const TrainerAvailabilityDropdown = ({ dateTime, trainers, selectedTrainerId, onSelectTrainer }) => {
    return (
        <div className="mt-2">
            <select
                value={selectedTrainerId}
                onChange={(e) => onSelectTrainer(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white appearance-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
            >
                <option value="" disabled>Select a trainer...</option>
                {trainers.map(trainer => {
                    const available = isTrainerAvailable(trainer.id, dateTime);
                    return (
                        <option key={trainer.id} value={trainer.id} disabled={!available} className={!available ? 'text-gray-400' : 'text-gray-800'}>
                            {trainer.name} ({available ? 'Available' : 'Unavailable'})
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default TrainerAvailabilityDropdown;
