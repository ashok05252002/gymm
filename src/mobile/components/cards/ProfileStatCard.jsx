import React from 'react';

const ProfileStatCard = ({ label, value }) => {
    return (
        <div className="bg-white p-3 rounded-2xl text-center">
            <p className="font-bold text-base text-brand-red truncate">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
        </div>
    );
};

export default ProfileStatCard;
