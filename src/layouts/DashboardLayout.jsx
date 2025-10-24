import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';

const DashboardLayout = ({ userRole }) => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} />
        <SubHeader userRole={userRole} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
