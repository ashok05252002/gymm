import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavBar from '../components/nav/BottomNavBar';
import MobileHeader from '../components/nav/MobileHeader';

const MobileLayout = () => {
    return (
        <div className="bg-gray-100 font-sans w-full min-h-screen flex flex-col">
            <MobileHeader />
            <main className="flex-1 overflow-y-auto pb-28 px-4 pt-4">
                <Outlet />
            </main>
            <BottomNavBar />
        </div>
    );
};

export default MobileLayout;
