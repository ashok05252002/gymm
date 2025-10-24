import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, HardDrive, BarChart2, Bell, HelpCircle, CheckSquare, Calendar, Wallet } from 'lucide-react';
import { getPendingFollowUpCount } from '../data/mockData';

const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Plans', path: '/admin/plans', icon: CreditCard },
    { name: 'Devices', path: '/admin/devices', icon: HardDrive },
    { name: 'Calendar', path: '/admin/calendar', icon: Calendar },
    { name: 'Reports', path: '/admin/reports', icon: BarChart2 },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
];

const receptionistNavItems = [
    { name: 'Dashboard', path: '/receptionist/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', path: '/receptionist/enquiries', icon: HelpCircle, badge: 'pendingFollowUps' },
    { name: 'Check-in', path: '/receptionist/check-in', icon: CheckSquare },
    { name: 'Calendar', path: '/receptionist/calendar', icon: Calendar },
    { name: 'Payments', path: '/receptionist/payments', icon: Wallet },
    { name: 'Reports', path: '/receptionist/reports', icon: BarChart2 },
    { name: 'Notifications', path: '/receptionist/notifications', icon: Bell },
];

const SubHeader = ({ userRole }) => {
    const navItems = userRole === 'Admin' ? adminNavItems : receptionistNavItems;
    const pendingFollowUps = userRole === 'Receptionist' ? getPendingFollowUpCount() : 0;

    const badgeData = {
        pendingFollowUps,
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6">
                <div className="flex items-center -mb-px">
                    {navItems.map((item) => {
                        const badgeCount = item.badge ? badgeData[item.badge] : 0;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 py-3 px-4 text-sm font-medium border-b-2 transition-colors relative ${
                                    isActive
                                        ? 'border-brand-red text-brand-red'
                                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                                    }`
                                }
                            >
                                <item.icon size={18} />
                                <span>{item.name}</span>
                                {badgeCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-brand-red rounded-full">
                                        {badgeCount}
                                    </span>
                                )}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default SubHeader;
