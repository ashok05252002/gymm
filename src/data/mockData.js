import { faker } from '@faker-js/faker';

// --- PERMISSIONS & ROLES ---
const permissionsByCategory = {
    'User Management': [
        { id: 'users:view', label: 'View Users' },
        { id: 'users:create', label: 'Create Users' },
        { id: 'users:edit', label: 'Edit Users' },
        { id: 'users:delete', label: 'Delete Users' },
        { id: 'users:block', label: 'Block/Unblock Users' },
    ],
    'Role Management': [
        { id: 'roles:view', label: 'View Roles' },
        { id: 'roles:create', label: 'Create Roles' },
        { id: 'roles:edit', label: 'Edit Roles & Permissions' },
        { id: 'roles:delete', label: 'Delete Roles' },
    ],
    'Plan Management': [
        { id: 'plans:view', label: 'View Plans' },
        { id: 'plans:create', label: 'Create Plans' },
        { id: 'plans:edit', label: 'Edit Plans' },
        { id: 'plans:assign', label: 'Assign Plans to Members' },
    ],
    'Device & Access': [
        { id: 'devices:view', label: 'View Devices & Logs' },
        { id: 'devices:rules', label: 'Manage Access Rules' },
    ],
    'Reporting': [
        { id: 'reports:view', label: 'View Reports' },
        { id: 'reports:export', label: 'Export Reports' },
    ],
    'Notifications': [
        { id: 'notifications:send', label: 'Send Notifications' },
    ],
    'Enquiry Management': [
        { id: 'enquiries:view', label: 'View Enquiries' },
        { id: 'enquiries:create', label: 'Create Enquiries' },
        { id: 'enquiries:manage', label: 'Manage Follow-ups' },
    ],
    'Calendar Management': [
        { id: 'calendar:view', label: 'View Global Calendar' },
        { id: 'calendar:create', label: 'Create Calendar Events' },
        { id: 'calendar:edit', label: 'Edit All Calendar Events' },
    ],
};

export const getPermissions = () => permissionsByCategory;

const allPermissionIds = Object.values(permissionsByCategory).flat().map(p => p.id);

const generatedRoles = [
    { id: 'role-admin', name: 'Admin', description: 'Has all access.', permissions: allPermissionIds },
    { id: 'role-receptionist', name: 'Receptionist', description: 'Manages members and basic check-ins.', permissions: ['users:view', 'users:create', 'users:edit', 'plans:assign', 'devices:view', 'enquiries:view', 'enquiries:create', 'enquiries:manage', 'calendar:view', 'calendar:create'] },
    { id: 'role-trainer', name: 'Trainer', description: 'Views assigned members and their progress.', permissions: ['users:view', 'calendar:view'] },
    { id: 'role-member', name: 'Member', description: 'Basic app access.', permissions: [] },
];

export const getRoles = () => generatedRoles;


// --- USER DATA ---
const createPlanHistory = (isActive = true) => {
    const plans = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, (_, i) => {
        const startDate = faker.date.past({ years: 2 });
        // Make the first plan (most recent) active or expired based on param
        const endDate = (i === 0 && isActive) ? faker.date.future({ years: 1 }) : faker.date.past({ years: 1 });
        const status = (i === 0 && isActive) ? 'Active' : 'Expired';

        return {
            planName: faker.helpers.arrayElement(['Gold', 'Silver', 'Bronze']),
            startDate,
            endDate,
            status,
        };
    });
    return plans.sort((a, b) => b.startDate - a.startDate);
};

const createActivityLog = () => {
    return Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, () => ({
        id: faker.string.uuid(),
        action: faker.helpers.arrayElement(['Checked In', 'Updated Profile', 'Renewed Plan', 'Joined Group Class']),
        timestamp: faker.date.recent({ days: 30 }),
    })).sort((a,b) => b.timestamp - a.timestamp);
};

const generatedUsers = Array.from({ length: 25 }, (_, i) => {
    const role = faker.helpers.arrayElement(generatedRoles.filter(r => r.name !== 'Admin'));
    const status = faker.helpers.arrayElement(['Active', 'Active', 'Active', 'Inactive', 'Blocked']);
    const isActivePlan = status === 'Active';

    return {
        id: `USR-${1001 + i}`,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
        role: role.name,
        roleId: role.id,
        status: status,
        avatar: `https://i.pravatar.cc/150?u=${1001 + i}`,
        memberSince: faker.date.past({ years: 3 }),
        planHistory: createPlanHistory(isActivePlan),
        activityLog: createActivityLog(),
    };
});
// Add a predictable admin user
generatedUsers.unshift({
    id: `USR-1000`,
    name: 'John Doe',
    email: 'admin@gym.com',
    phone: faker.phone.number(),
    role: 'Admin',
    roleId: 'role-admin',
    status: 'Active',
    avatar: `https://i.pravatar.cc/150?u=1000`,
    memberSince: faker.date.past({ years: 3 }),
    planHistory: createPlanHistory(true),
    activityLog: createActivityLog(),
});
// Add a predictable receptionist user
generatedUsers.push({
    id: `USR-2000`,
    name: 'Jane Smith',
    email: 'reception@gym.com',
    phone: faker.phone.number(),
    role: 'Receptionist',
    roleId: 'role-receptionist',
    status: 'Active',
    avatar: `https://i.pravatar.cc/150?u=2000`,
    memberSince: faker.date.past({ years: 1 }),
    planHistory: createPlanHistory(true),
    activityLog: createActivityLog(),
});
// Add a predictable trainer user
generatedUsers.push({
    id: `USR-3000`,
    name: 'Alex Ray',
    email: 'trainer@gym.com',
    phone: faker.phone.number(),
    role: 'Trainer',
    roleId: 'role-trainer',
    status: 'Active',
    avatar: `https://i.pravatar.cc/150?u=3000`,
    memberSince: faker.date.past({ years: 2 }),
    planHistory: [],
    activityLog: createActivityLog(),
});
// Add a predictable member user
generatedUsers.push({
    id: `USR-4000`,
    name: 'Sarah Connor',
    email: 'member@gym.com',
    phone: faker.phone.number(),
    role: 'Member',
    roleId: 'role-member',
    status: 'Active',
    avatar: `https://i.pravatar.cc/150?u=4000`,
    memberSince: faker.date.past({ years: 1 }),
    planHistory: createPlanHistory(true),
    activityLog: createActivityLog(),
});


export const getUsers = () => generatedUsers;
export const getUserById = (userId) => generatedUsers.find(u => u.id === userId);


// --- KPI Data ---
export const getKpiData = () => ({
    totalMembers: faker.number.int({ min: 800, max: 1200 }),
    activeTrainers: faker.number.int({ min: 15, max: 25 }),
    monthlyRevenue: faker.number.int({ min: 15000, max: 25000 }),
    pendingRenewals: faker.number.int({ min: 30, max: 75 }),
});

export const getReceptionistKpiData = () => ({
    todaysCheckIns: faker.number.int({ min: 40, max: 150 }),
    newEnquiries: faker.number.int({ min: 5, max: 20 }),
    pendingFollowUps: faker.number.int({ min: 10, max: 30 }),
    upcomingRenewals: faker.number.int({ min: 5, max: 15 }),
});

// --- Chart Data (Legacy) ---
const generateChartLabels = (num) => {
    return Array.from({ length: num }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (num - 1 - i));
        return d.toLocaleString('en-US', { month: 'short' });
    });
};

const chartColors = {
    revenue: '#FF3B30',
    attendance: '#00C853',
    growth: '#3498db',
    plans: ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'],
    trainers: '#f39c12',
    enquirySources: ['#3498db', '#9b59b6', '#2ecc71', '#f1c40f'],
    enquiryStatuses: ['#00C853', '#FF3B30', '#f39c12', '#3498db'],
};

const commonOptions = {
    grid: { top: 30, right: 20, bottom: 50, left: 60 },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: { lineStyle: { color: '#ccc' } },
        axisLabel: { color: '#666' },
    },
    yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: '#666' },
        splitLine: { lineStyle: { type: 'dashed', color: '#eee' } },
    },
    legend: {
        show: true,
        bottom: 0,
        textStyle: {
            color: '#333'
        }
    },
    responsive: true,
    maintainAspectRatio: false,
};

export const getChartOptions = (type) => {
    switch (type) {
        case 'revenue':
            return {
                ...commonOptions,
                xAxis: { ...commonOptions.xAxis, data: generateChartLabels(6) },
                series: [{
                    name: 'Revenue',
                    type: 'line',
                    smooth: true,
                    data: Array.from({ length: 6 }, () => faker.number.int({ min: 15000, max: 25000 })),
                    itemStyle: { color: chartColors.revenue },
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{ offset: 0, color: chartColors.revenue }, { offset: 1, color: 'rgba(255, 59, 48, 0.1)' }]
                        }
                    },
                }],
                yAxis: { ...commonOptions.yAxis, axisLabel: { ...commonOptions.yAxis.axisLabel, formatter: 'OMR {value}' } },
            };
        case 'attendance':
            return {
                ...commonOptions,
                xAxis: { ...commonOptions.xAxis, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], boundaryGap: true },
                series: [{
                    name: 'Attendance',
                    type: 'bar',
                    data: Array.from({ length: 7 }, () => faker.number.int({ min: 50, max: 200 })),
                    itemStyle: { color: chartColors.attendance, borderRadius: [4, 4, 0, 0] },
                }],
            };
        case 'growth':
            return {
                ...commonOptions,
                xAxis: { ...commonOptions.xAxis, data: generateChartLabels(12) },
                series: [{
                    name: 'New Members',
                    type: 'line',
                    smooth: true,
                    data: Array.from({ length: 12 }, () => faker.number.int({ min: 20, max: 80 })),
                    itemStyle: { color: chartColors.growth },
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{ offset: 0, color: chartColors.growth }, { offset: 1, color: 'rgba(52, 152, 219, 0.1)' }]
                        }
                    },
                }],
            };
        case 'session_usage':
            return {
                ...commonOptions,
                xAxis: { ...commonOptions.xAxis, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], boundaryGap: true },
                series: [{
                    name: 'Sessions Booked',
                    type: 'bar',
                    data: Array.from({ length: 7 }, () => faker.number.int({ min: 5, max: 30 })),
                    itemStyle: { color: chartColors.growth, borderRadius: [4, 4, 0, 0] },
                }],
            };
        case 'receptionist_revenue':
            return {
                ...commonOptions,
                xAxis: { ...commonOptions.xAxis, data: generateChartLabels(6) },
                series: [{
                    name: 'Revenue Recorded',
                    type: 'line',
                    smooth: true,
                    data: Array.from({ length: 6 }, () => faker.number.int({ min: 1000, max: 5000 })),
                    itemStyle: { color: chartColors.revenue },
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{ offset: 0, color: chartColors.revenue }, { offset: 1, color: 'rgba(255, 59, 48, 0.1)' }]
                        }
                    },
                }],
                yAxis: { ...commonOptions.yAxis, axisLabel: { ...commonOptions.yAxis.axisLabel, formatter: 'OMR {value}' } },
            };
        default:
            return {};
    }
};

// --- Recent Activity ---
export const getRecentActivities = () => [
    { type: 'User Login', description: 'Admin logged in', user: 'john.doe@gym.com', time: '2m ago' },
    { type: 'New Member', description: 'signed up for Gold Plan', user: faker.person.fullName(), time: '1h ago' },
    { type: 'Plan Renewal', description: 'renewed their Silver Plan', user: faker.person.fullName(), time: '3h ago' },
    { type: 'New Member', description: 'signed up for Bronze Plan', user: faker.person.fullName(), time: '5h ago' },
    { type: 'User Login', description: 'Receptionist logged in', user: 'jane.doe@gym.com', time: '8h ago' },
];

// --- Plan Management Data ---
const generatedPlans = [
    { id: 'PLN-001', name: 'Bronze', duration: '30 Days', price: 15.000, accessType: 'Limited', features: 'Gym Access, Locker', status: 'Active' },
    { id: 'PLN-002', name: 'Silver', duration: '90 Days', price: 40.000, accessType: 'Full Access', features: 'Gym Access, Locker, Group Classes', status: 'Active' },
    { id: 'PLN-003', name: 'Gold', duration: '180 Days', price: 75.000, accessType: 'Full Access', features: 'All Silver Features, Personal Trainer Session (1/mo)', status: 'Active' },
    { id: 'PLN-004', name: 'Day Pass', duration: '1 Day', price: 5.000, accessType: 'Session-based', features: 'Gym Access for a day', status: 'Active' },
    { id: 'PLN-005', name: 'Flexi-5', duration: '60 Days', price: 22.500, accessType: 'Session-based', features: '5 Gym Sessions, Locker', status: 'Inactive' },
];

export const getPlans = () => generatedPlans;

// --- Device / Access Control Data ---
export const getAccessRules = () => [
    { id: 'RULE-001', name: 'Gold Plan - Full Access', planId: 'PLN-003', planName: 'Gold', maxSessions: 'Unlimited', timeWindow: '05:00 - 23:00', behavior: 'Block' },
    { id: 'RULE-002', name: 'Day Pass - Single Entry', planId: 'PLN-004', planName: 'Day Pass', maxSessions: '1', timeWindow: '05:00 - 23:00', behavior: 'Block' },
    { id: 'RULE-003', name: 'Bronze - Off-Peak', planId: 'PLN-001', planName: 'Bronze', maxSessions: 'Unlimited', timeWindow: '10:00 - 16:00', behavior: 'Notify' },
];

const allDeviceLogs = generatedUsers.flatMap(user => {
    return Array.from({ length: faker.number.int({ min: 2, max: 10 }) }, () => ({
        id: faker.string.uuid(),
        userId: user.id,
        memberName: user.name,
        deviceId: `DEV-${faker.string.alphanumeric(4).toUpperCase()}`,
        timestamp: faker.date.recent({ days: 7 }),
        status: faker.helpers.arrayElement(['Granted', 'Granted', 'Granted', 'Blocked']),
    }));
}).sort((a, b) => b.timestamp - a.timestamp);


export const getDeviceLogs = (count = 20) => {
    return allDeviceLogs.slice(0, count);
};

export const getLogsByUserId = (userId) => {
    return allDeviceLogs.filter(log => log.userId === userId);
};

export const generateNewLogEntry = () => {
    const user = faker.helpers.arrayElement(generatedUsers);
    return {
        id: faker.string.uuid(),
        userId: user.id,
        memberName: user.name,
        deviceId: `DEV-${faker.string.alphanumeric(4).toUpperCase()}`,
        timestamp: new Date(),
        status: faker.helpers.arrayElement(['Granted', 'Blocked', 'Expired']),
    };
};

// --- Reports & Analytics Data ---
const allAttendanceRecords = Array.from({ length: 100 }, () => {
    const user = faker.helpers.arrayElement(getUsers());
    return {
        id: user.id,
        name: user.name,
        role: user.role,
        checkInTime: faker.date.recent({days: 30}),
        status: faker.helpers.arrayElement(['Present', 'Absent', 'Late']),
        // Add a mock trainer for members
        trainer: user.role === 'Member' ? faker.helpers.arrayElement(getUsers().filter(u => u.role === 'Trainer')).name : null,
    };
});

export const getAttendanceReport = (filters) => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'checkInTime', label: 'Check-in Time' },
        { key: 'status', label: 'Status' },
    ];
    
    const filteredRows = allAttendanceRecords.filter(row => {
        const searchLower = filters.search.toLowerCase();
        const date = new Date(row.checkInTime);
        const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const to = filters.dateTo ? new Date(filters.dateTo) : null;

        if(from) from.setHours(0,0,0,0);
        if(to) to.setHours(23,59,59,999);

        const searchMatch = row.name.toLowerCase().includes(searchLower) || row.id.toLowerCase().includes(searchLower);
        const dateMatch = (!from || date >= from) && (!to || date <= to);
        const statusMatch = filters.status.length === 0 || filters.status.includes(row.status);
        const trainerMatch = filters.trainer.length === 0 || (row.role === 'Member' && filters.trainer.includes(row.trainer));
        
        return searchMatch && dateMatch && statusMatch && trainerMatch;
    });

    return {
        title: 'Attendance Report',
        description: 'Attendance records for members and trainers.',
        columns,
        rows: filteredRows.map(r => ({...r, checkInTime: r.checkInTime.toLocaleString()}))
    };
};

export const getSessionAttendanceReport = (filters) => {
    const columns = [
        { key: 'sessionId', label: 'Session ID' },
        { key: 'trainerName', label: 'Trainer Name' },
        { key: 'memberName', label: 'Member Name' },
        { key: 'sessionType', label: 'Session Type' },
        { key: 'date', label: 'Date' },
        { key: 'checkInTime', label: 'Check-in Time' },
        { key: 'status', label: 'Status' },
    ];
    const allSessionRecords = getSessions().map(s => {
        const status = s.status === 'Confirmed' ? 'Attended' : s.status;
        let checkInTime = 'N/A';
        if (status === 'Attended') {
            const sessionTime = new Date(s.dateTime);
            sessionTime.setMinutes(sessionTime.getMinutes() - faker.number.int({min: 1, max: 10}));
            checkInTime = sessionTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        }
        return {
            sessionId: s.id.substring(0, 13),
            trainerName: s.trainerName,
            memberName: s.memberName,
            sessionType: s.sessionType,
            date: new Date(s.dateTime),
            checkInTime: checkInTime,
            status: status,
        };
    });

    const filteredRows = allSessionRecords.filter(row => {
        const searchLower = filters.search.toLowerCase();
        const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const to = filters.dateTo ? new Date(filters.dateTo) : null;

        if(from) from.setHours(0,0,0,0);
        if(to) to.setHours(23,59,59,999);

        const searchMatch = row.memberName.toLowerCase().includes(searchLower) || row.sessionId.toLowerCase().includes(searchLower);
        const dateMatch = (!from || row.date >= from) && (!to || row.date <= to);
        const statusMatch = filters.status.length === 0 || filters.status.includes(row.status);
        const trainerMatch = filters.trainer.length === 0 || filters.trainer.includes(row.trainerName);
        const typeMatch = filters.sessionType === 'All' || row.sessionType === filters.sessionType;

        return searchMatch && dateMatch && statusMatch && trainerMatch && typeMatch;
    });

    return {
        title: 'Session Attendance Report',
        description: 'Attendance records for specific training sessions.',
        columns,
        rows: filteredRows.map(r => ({...r, date: r.date.toLocaleDateString()}))
    };
};

export const getMembershipSummaryReport = (filters) => {
    const columns = [
        { key: 'memberId', label: 'Member ID' },
        { key: 'name', label: 'Name' },
        { key: 'membershipType', label: 'Membership Type' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'endDate', label: 'End Date' },
        { key: 'renewalDate', label: 'Renewal Date' },
        { key: 'status', label: 'Status' },
    ];
    
    const allMembershipRecords = getUsers().filter(u => u.role === 'Member').flatMap(user => {
        // Return all plans for a user, not just the active one
        return user.planHistory.map(plan => ({
            memberId: user.id,
            name: user.name,
            membershipType: plan.planName,
            startDate: new Date(plan.startDate),
            endDate: new Date(plan.endDate),
            status: plan.status,
            trainer: faker.helpers.arrayElement(getUsers().filter(u => u.role === 'Trainer')).name, // Mock trainer assignment
        }));
    });

    const filteredRows = allMembershipRecords.filter(row => {
        const searchLower = filters.search.toLowerCase();
        const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const to = filters.dateTo ? new Date(filters.dateTo) : null;

        if(from) from.setHours(0,0,0,0);
        if(to) to.setHours(23,59,59,999);

        const searchMatch = row.name.toLowerCase().includes(searchLower) || row.memberId.toLowerCase().includes(searchLower);
        // Check if the plan's duration overlaps with the selected date range
        const dateMatch = (!from || row.endDate >= from) && (!to || row.startDate <= to);
        const statusMatch = filters.status.length === 0 || filters.status.includes(row.status);
        const trainerMatch = filters.trainer.length === 0 || filters.trainer.includes(row.trainer);
        const typeMatch = filters.membershipType === 'All' || row.membershipType === filters.membershipType;

        return searchMatch && dateMatch && statusMatch && trainerMatch && typeMatch;
    });

     return {
        title: 'Membership Summary Report',
        description: 'Summary of all member subscriptions.',
        columns,
        rows: filteredRows.map(r => ({
            ...r,
            startDate: r.startDate ? r.startDate.toLocaleDateString() : 'N/A',
            endDate: r.endDate ? r.endDate.toLocaleDateString() : 'N/A',
            renewalDate: r.endDate ? r.endDate.toLocaleDateString() : 'N/A',
        }))
    };
};

export const getPaymentHistoryReport = (filters) => {
    const columns = [
        { key: 'paymentId', label: 'Payment ID' },
        { key: 'memberId', label: 'Member ID' },
        { key: 'memberName', label: 'Member Name' },
        { key: 'membershipType', label: 'Membership Type' },
        { key: 'amount', label: 'Amount (OMR)' },
        { key: 'date', label: 'Date' },
    ];
    
    // Ensure recent payments for default view
    const allPayments = Array.from({ length: 50 }, () => {
        const member = faker.helpers.arrayElement(getUsers().filter(u => u.role === 'Member'));
        const plan = faker.helpers.arrayElement(getPlans().filter(p => p.status === 'Active'));
        return {
            id: `PAY-${faker.string.numeric(6)}`,
            memberId: member.id,
            memberName: member.name,
            planName: plan.name,
            amount: plan.price,
            date: faker.date.recent({ days: 28 }),
        };
    });

    const filteredRows = allPayments.filter(row => {
        const searchLower = filters.search.toLowerCase();
        const date = new Date(row.date);
        const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const to = filters.dateTo ? new Date(filters.dateTo) : null;

        if(from) from.setHours(0,0,0,0);
        if(to) to.setHours(23,59,59,999);

        const searchMatch = row.memberName.toLowerCase().includes(searchLower) || row.id.toLowerCase().includes(searchLower) || row.memberId.toLowerCase().includes(searchLower);
        const dateMatch = (!from || date >= from) && (!to || date <= to);
        const typeMatch = filters.membershipType === 'All' || row.planName === filters.membershipType;

        return searchMatch && dateMatch && typeMatch;
    });

    return {
        title: 'Payment History Report',
        description: 'Record of all financial transactions.',
        columns,
        rows: filteredRows.map(r => ({
            paymentId: r.id,
            memberId: r.memberId,
            memberName: r.memberName,
            membershipType: r.planName,
            amount: r.amount.toFixed(3),
            date: new Date(r.date).toLocaleDateString(),
        }))
    };
};

// --- Notifications Data ---
export const getNotificationHistory = () => [
    { id: 'NOTIF-001', title: 'Scheduled Maintenance', channels: ['Email', 'App Push'], target: 'All Members', status: 'Sent', timestamp: faker.date.recent({ days: 1 }) },
    { id: 'NOTIF-002', title: 'New Yoga Class', channels: ['App Push'], target: 'Gold & Silver Members', status: 'Sent', timestamp: faker.date.recent({ days: 3 }) },
    { id: 'NOTIF-003', title: 'Holiday Hours', channels: ['Email', 'SMS'], target: 'All Users', status: 'Sent', timestamp: faker.date.recent({ days: 7 }) },
    { id: 'NOTIF-004', title: 'Trainer Meeting', channels: ['Email'], target: 'All Trainers', status: 'Scheduled', timestamp: faker.date.future({ days: 2 }) },
    { id: 'NOTIF-005', title: 'Billing Reminder', channels: ['SMS'], target: 'Pending Renewals', status: 'Sent', timestamp: faker.date.recent({ days: 10 }) },
];

// --- Enquiry Data ---
export const getPrograms = () => [
    { id: 'prog-1', name: 'Weight Loss' },
    { id: 'prog-2', name: 'Body Building' },
    { id: 'prog-3', name: 'Yoga Classes' },
    { id: 'prog-4', name: 'CrossFit' },
    { id: 'prog-5', name: 'Zumba' },
    { id: 'prog-6', name: 'Personal Training' },
];

const generatedEnquiries = Array.from({ length: 25 }, (_, i) => ({
    id: `ENQ-${1001 + i}`,
    name: faker.person.fullName(),
    contact: faker.phone.number(),
    email: faker.internet.email(),
    programs: faker.helpers.arrayElements(getPrograms().map(p => p.name), { min: 1, max: 3 }),
    goal: faker.lorem.sentence(),
    source: faker.helpers.arrayElement(['Walk-in', 'Phone', 'Social Media', 'Referral']),
    assignedTrainer: faker.helpers.arrayElement([faker.helpers.arrayElement(getUsers().filter(u => u.role === 'Trainer')).name, 'None']),
    status: faker.helpers.arrayElement(['New', 'Follow-up', 'Converted', 'Lost', 'Converted', 'Follow-up']),
    date: faker.date.recent({ days: 30 }),
    nextFollowUp: i % 3 === 0 ? faker.date.soon({ days: 7 }) : (i % 3 === 1 ? faker.date.past({ days: 2 }) : null),
    followUpNotes: '',
})).sort((a,b) => b.date - a.date);

export const getEnquiries = () => generatedEnquiries;

export const getPendingFollowUpCount = () => generatedEnquiries.filter(e => e.status === 'Follow-up' || (e.status === 'New' && !e.nextFollowUp)).length;

export const getEnquiryAnalyticsData = () => {
    const sources = ['Walk-in', 'Phone', 'Social Media', 'Referral'];
    const statuses = ['Converted', 'Lost', 'Follow-up', 'New'];

    const conversionBySource = {
        title: 'Conversion by Source',
        chartOptions: {
            tooltip: { trigger: 'item' },
            legend: { top: '5%', left: 'center' },
            series: [{
                name: 'Enquiry Source',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: { show: false, position: 'center' },
                emphasis: { label: { show: true, fontSize: '20', fontWeight: 'bold' } },
                labelLine: { show: false },
                data: sources.map(source => ({
                    value: faker.number.int({ min: 10, max: 50 }),
                    name: source
                })),
                color: chartColors.enquirySources,
            }]
        }
    };

    const statusDistribution = {
        title: 'Status Distribution',
        chartOptions: {
            ...commonOptions,
            grid: { top: 30, right: 20, bottom: 30, left: 40 },
            xAxis: { ...commonOptions.xAxis, data: statuses, boundaryGap: true },
            legend: { show: false },
            series: [{
                name: 'Count',
                type: 'bar',
                data: statuses.map(() => faker.number.int({ min: 5, max: 25 })),
                itemStyle: { 
                    color: (params) => chartColors.enquiryStatuses[params.dataIndex],
                    borderRadius: [4, 4, 0, 0] 
                },
            }],
        }
    };

    return { conversionBySource, statusDistribution };
};

// --- Schedule / Session Data ---
const generatedSessions = Array.from({ length: 50 }, () => {
    const member = faker.helpers.arrayElement(getUsers().filter(u => u.role === 'Member'));
    const trainer = faker.helpers.arrayElement(getUsers().filter(u => u.role === 'Trainer'));
    const sessionDate = faker.date.between({ from: new Date(new Date().setDate(new Date().getDate() - 15)), to: new Date(new Date().setDate(new Date().getDate() + 15)) });
    
    return {
        id: `SESS-${faker.string.uuid()}`,
        memberId: member.id,
        memberName: member.name,
        trainerId: trainer.id,
        trainerName: trainer.name,
        sessionType: faker.helpers.arrayElement(['Personal', 'Group']),
        dateTime: sessionDate,
        status: faker.helpers.arrayElement(['Confirmed', 'Completed', 'Cancelled']),
    };
}).sort((a,b) => a.dateTime - b.dateTime);

export const getSessions = () => generatedSessions;
export const getSessionsByTrainer = (trainerId) => generatedSessions.filter(s => s.trainerId === trainerId);

export const getCalendarData = (sessions) => {
    const data = sessions.map(session => {
        const dateStr = session.dateTime.toISOString().split('T')[0];
        const statusValue = session.status === 'Confirmed' ? 3 : session.status === 'Completed' ? 2 : 1; // 3: Green, 2: Gray, 1: Red
        return [dateStr, statusValue, session];
    });

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0);

    return {
        range: [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]],
        data: data,
    };
};

export const isTrainerAvailable = (trainerId, dateTime) => {
    // Simple mock logic: trainer is unavailable if the hour is even or on weekends.
    const date = new Date(dateTime);
    const hour = date.getHours();
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday

    if (day === 0 || day === 6) {
        return false; // Unavailable on weekends
    }
    
    return hour % 2 !== 0;
};


// --- Payment Data ---
const generatedPayments = Array.from({ length: 30 }, () => {
    const member = faker.helpers.arrayElement(getUsers().filter(u => u.role === 'Member'));
    const plan = faker.helpers.arrayElement(getPlans().filter(p => p.status === 'Active'));
    return {
        id: `PAY-${faker.string.numeric(6)}`,
        memberId: member.id,
        memberName: member.name,
        planName: plan.name,
        amount: plan.price,
        method: faker.helpers.arrayElement(['Cash', 'Card', 'UPI', 'Online']),
        date: faker.date.recent({ days: 90 }),
        status: faker.helpers.arrayElement(['Completed', 'Completed', 'Pending', 'Failed']),
        transactionId: faker.string.alphanumeric(12).toUpperCase(),
    };
}).sort((a, b) => b.date - a.date);

export const getPayments = () => generatedPayments;


// --- GLOBAL CALENDAR DATA ---

const generatedAnnouncements = [
    {
        id: 'ann-1',
        title: 'Monthly Report Deadline',
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 28),
        end: new Date(new Date().getFullYear(), new Date().getMonth(), 29),
        description: 'All trainers must submit their monthly reports by EOD on the 28th.',
    },
    {
        id: 'ann-2',
        title: 'Holiday Closure',
        start: new Date(new Date().getFullYear(), 11, 25), // Christmas
        end: new Date(new Date().getFullYear(), 11, 26),
        description: 'The gym will be closed for the Christmas holiday.',
    }
];

const calendarColors = {
    session: '#00C853', // Green
    followUp: '#FFC107', // Yellow
    payment: '#FF3B30', // Red
    announcement: '#9C27B0', // Purple
    availability: '#2196F3', // Blue
};

export const getCalendarEvents = (role = 'Admin') => {
    let events = [];

    // 1. Member Sessions
    const sessions = getSessions().filter(s => s.status === 'Confirmed');
    events.push(...sessions.map(s => ({
        id: s.id,
        title: `${s.memberName} w/ ${s.trainerName.split(' ')[0]}`,
        start: s.dateTime,
        end: new Date(new Date(s.dateTime).setHours(new Date(s.dateTime).getHours() + 1)), // Assume 1-hour sessions
        color: calendarColors.session,
        extendedProps: {
            type: 'session',
            ...s
        }
    })));

    // 2. Enquiry Follow-ups (Receptionist only)
    if (role === 'Receptionist') {
        const followUps = getEnquiries().filter(e => e.nextFollowUp);
        events.push(...followUps.map(e => ({
            id: e.id,
            title: `Follow-up: ${e.name}`,
            start: e.nextFollowUp,
            allDay: true,
            color: calendarColors.followUp,
            extendedProps: {
                type: 'followUp',
                ...e
            }
        })));
    }

    // 3. Payment Expiry Reminders (Admin only)
    if (role === 'Admin') {
        const users = getUsers();
        users.forEach(user => {
            const activePlan = user.planHistory.find(p => p.status === 'Active');
            if (activePlan) {
                const expiryDate = new Date(activePlan.endDate);
                const today = new Date();
                const daysUntilExpiry = (expiryDate - today) / (1000 * 60 * 60 * 24);
                if (daysUntilExpiry > 0 && daysUntilExpiry <= 7) { // Within the next 7 days
                    events.push({
                        id: `payment-${user.id}`,
                        title: `Plan expires: ${user.name}`,
                        start: expiryDate,
                        allDay: true,
                        color: calendarColors.payment,
                        extendedProps: {
                            type: 'payment',
                            ...user
                        }
                    });
                }
            }
        });
    }
    
    // 4. Announcements (Admin only)
    if (role === 'Admin') {
        events.push(...generatedAnnouncements.map(a => ({
            id: a.id,
            title: a.title,
            start: a.start,
            end: a.end,
            color: calendarColors.announcement,
            extendedProps: {
                type: 'announcement',
                ...a
            }
        })));
    }
    
    return events;
};

// --- MOBILE TRAINER DATA ---
export const getTrainerData = () => {
    const trainer = getUsers().find(u => u.email === 'trainer@gym.com');
    const today = new Date();
    const todaysSessions = getSessionsByTrainer(trainer.id).filter(s => {
        const sessionDate = new Date(s.dateTime);
        return sessionDate.getDate() === today.getDate() &&
               sessionDate.getMonth() === today.getMonth() &&
               sessionDate.getFullYear() === today.getFullYear();
    }).sort((a,b) => a.dateTime - b.dateTime);

    return {
        trainer,
        todaysSessions,
        kpis: {
            sessionsToday: todaysSessions.length,
            attendance: `${faker.number.int({ min: 85, max: 98 })}%`,
        }
    };
};

export const getTrainerClients = (trainerId) => {
    // Mock: Assign first 10 members to the main trainer
    const assignedClientIds = getSessionsByTrainer(trainerId).map(s => s.memberId);
    const uniqueClientIds = [...new Set(assignedClientIds)];
    return getUsers().filter(u => uniqueClientIds.includes(u.id)).map(m => ({
        ...m,
        lastSession: faker.date.recent({ days: 10 }),
    }));
};

export const getRecentClientActivity = (trainerId) => {
    const clients = getTrainerClients(trainerId);
    const clientIds = clients.map(c => c.id);
    const clientLogs = allDeviceLogs.filter(log => clientIds.includes(log.userId) && log.status === 'Granted');
    const completedSessions = getSessionsByTrainer(trainerId).filter(s => s.status === 'Completed');

    const activity = [
        ...clientLogs.map(log => ({ id: log.id, type: 'check-in', description: `${log.memberName} checked in.`, timestamp: log.timestamp })),
        ...completedSessions.map(s => ({ id: s.id, type: 'session', description: `Session with ${s.memberName} completed.`, timestamp: s.dateTime })),
    ];

    return activity.sort((a,b) => b.timestamp - a.timestamp).slice(0, 5);
};

export const getTrainerChartOptions = (type) => {
    const mobileCommonOptions = {
        grid: { top: 20, right: 15, bottom: 30, left: 40 },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#9ca3af', fontSize: 10 },
        },
        yAxis: {
            type: 'value',
            axisLine: { show: false },
            axisLabel: { color: '#9ca3af', fontSize: 10, formatter: 'OMR {value}' },
            splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } },
        },
        legend: { show: false },
        responsive: true,
        maintainAspectRatio: false,
    };

    switch (type) {
        case 'earnings':
            return {
                ...mobileCommonOptions,
                xAxis: { ...mobileCommonOptions.xAxis, data: generateChartLabels(6) },
                series: [{
                    type: 'bar',
                    data: Array.from({ length: 6 }, () => faker.number.int({ min: 500, max: 1500 })),
                    itemStyle: { color: chartColors.attendance, borderRadius: [4, 4, 0, 0] },
                }],
            };
        case 'sessions':
             return {
                ...mobileCommonOptions,
                yAxis: { ...mobileCommonOptions.yAxis, axisLabel: { ...mobileCommonOptions.yAxis.axisLabel, formatter: '{value}' } },
                xAxis: { ...mobileCommonOptions.xAxis, data: generateChartLabels(6) },
                series: [{
                    type: 'line',
                    smooth: true,
                    data: Array.from({ length: 6 }, () => faker.number.int({ min: 10, max: 40 })),
                    itemStyle: { color: chartColors.growth },
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{ offset: 0, color: chartColors.growth }, { offset: 1, color: 'rgba(52, 152, 219, 0.1)' }]
                        }
                    },
                }],
            };
        default:
            return {};
    }
};

// --- MOBILE MEMBER DATA ---
export const getMemberData = () => {
    const member = getUsers().find(u => u.email === 'member@gym.com');
    const trainer = getUsers().find(u => u.role === 'Trainer');
    const activePlan = member.planHistory.find(p => p.status === 'Active');

    return {
        member,
        activePlan,
        trainer,
        kpis: {
            attendanceProgress: faker.number.int({ min: 60, max: 95 }),
            sessionsRemaining: faker.number.int({ min: 5, max: 20 }),
        }
    };
};

export const getMemberBookings = () => {
    const memberId = getUsers().find(u => u.email === 'member@gym.com').id;
    return getSessions().filter(s => s.memberId === memberId);
};
