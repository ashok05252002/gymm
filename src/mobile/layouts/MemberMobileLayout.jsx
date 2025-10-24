import React from 'react';
import { Outlet } from 'react-router-dom';
import MemberBottomNavBar from '../components/nav/MemberBottomNavBar';
import MemberMobileHeader from '../components/nav/MemberMobileHeader';

const MemberMobileLayout = () => {
    return (
        <div className="bg-gray-100 font-sans w-full min-h-screen flex flex-col">
            <MemberMobileHeader />
            <main className="flex-1 overflow-y-auto pb-28 px-4 pt-4">
                <Outlet />
            </main>
            <MemberBottomNavBar />
        </div>
    );
};

export default MemberMobileLayout;
