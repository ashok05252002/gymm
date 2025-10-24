import React from 'react';
import { Outlet } from 'react-router-dom';
import TrainerBottomNavBar from '../components/nav/TrainerBottomNavBar';
import MobileHeader from '../components/nav/MobileHeader';

const TrainerMobileLayout = () => {
    return (
        <div className="bg-gray-100 font-sans w-full min-h-screen flex flex-col">
            <MobileHeader />
            <main className="flex-1 overflow-y-auto pb-28 px-4 pt-4">
                <Outlet />
            </main>
            <TrainerBottomNavBar />
        </div>
    );
};

export default TrainerMobileLayout;
