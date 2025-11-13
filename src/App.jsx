import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard';
import UserManagementPage from './pages/UserManagementPage';
import UserProfilePage from './pages/UserProfilePage';
import PlanManagementPage from './pages/PlanManagementPage';
import DeviceManagementPage from './pages/DeviceManagementPage';
import ReportsPage from './pages/ReportsPage';
import NotificationsPage from './pages/NotificationsPage';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import EnquiryManagementPage from './pages/EnquiryManagementPage';
import ReceptionistMemberProfilePage from './pages/ReceptionistMemberProfilePage';
import PaymentManagementPage from './pages/PaymentManagementPage';
import MemberCheckInPage from './pages/MemberCheckInPage';
import ReceptionistReportsPage from './pages/ReceptionistReportsPage';
import ReceptionistNotificationsPage from './pages/ReceptionistNotificationsPage';
import GlobalCalendarPage from './pages/GlobalCalendarPage';
import RegistrationPage from './pages/RegistrationPage';

// --- Mobile ---
import TrainerMobileLayout from './mobile/layouts/TrainerMobileLayout';
import TrainerHomeScreen from './mobile/screens/trainer/TrainerHomeScreen';
import TrainerScheduleScreen from './mobile/screens/trainer/TrainerScheduleScreen';
import TrainerClientsScreen from './mobile/screens/trainer/TrainerClientsScreen';
import TrainerReportsScreen from './mobile/screens/trainer/TrainerReportsScreen';
import TrainerProfileScreen from './mobile/screens/trainer/TrainerProfileScreen';
import TrainerMemberProfileScreen from './mobile/screens/trainer/TrainerMemberProfileScreen';

import MemberMobileLayout from './mobile/layouts/MemberMobileLayout';
import MemberHomeScreen from './mobile/screens/member/MemberHomeScreen';
import MemberBookingsScreen from './mobile/screens/member/MemberBookingsScreen';
import MemberPaymentsScreen from './mobile/screens/member/MemberPaymentsScreen';
import MemberProfileScreen from './mobile/screens/member/MemberProfileScreen';


function App() {
    return (
        <>
            <Toaster 
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    success: {
                        style: {
                            background: '#00C853',
                        },
                    },
                    error: {
                        style: {
                            background: '#FF3B30',
                        },
                    },
                }}
            />
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<DashboardLayout userRole="Admin" />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<UserManagementPage />} />
                        <Route path="users/:userId" element={<UserProfilePage />} />
                        <Route path="plans" element={<PlanManagementPage />} />
                        <Route path="devices" element={<DeviceManagementPage />} />
                        <Route path="calendar" element={<GlobalCalendarPage />} />
                        <Route path="reports" element={<ReportsPage />} />
                        <Route path="notifications" element={<NotificationsPage />} />
                    </Route>

                    {/* Receptionist Routes */}
                    <Route path="/receptionist" element={<DashboardLayout userRole="Receptionist" />}>
                         <Route index element={<Navigate to="dashboard" replace />} />
                         <Route path="dashboard" element={<ReceptionistDashboard />} />
                         <Route path="enquiries" element={<EnquiryManagementPage />} />
                         <Route path="register" element={<RegistrationPage />} />
                         <Route path="members/:memberId" element={<ReceptionistMemberProfilePage />} />
                         <Route path="check-in" element={<MemberCheckInPage />} />
                         <Route path="calendar" element={<GlobalCalendarPage />} />
                         <Route path="payments" element={<PaymentManagementPage />} />
                         <Route path="reports" element={<ReceptionistReportsPage />} />
                         <Route path="notifications" element={<ReceptionistNotificationsPage />} />
                         <Route path="schedule" element={<Navigate to="/receptionist/calendar" replace />} />
                    </Route>

                    {/* Mobile Trainer Routes */}
                    <Route path="/mobile/trainer" element={<TrainerMobileLayout />}>
                        <Route index element={<Navigate to="home" replace />} />
                        <Route path="home" element={<TrainerHomeScreen />} />
                        <Route path="schedule" element={<TrainerScheduleScreen />} />
                        <Route path="clients" element={<TrainerClientsScreen />} />
                        <Route path="clients/:memberId" element={<TrainerMemberProfileScreen />} />
                        <Route path="reports" element={<TrainerReportsScreen />} /> 
                        <Route path="profile" element={<TrainerProfileScreen />} />
                    </Route>

                    {/* Mobile Member Routes */}
                    <Route path="/mobile/member" element={<MemberMobileLayout />}>
                        <Route index element={<Navigate to="home" replace />} />
                        <Route path="home" element={<MemberHomeScreen />} />
                        <Route path="bookings" element={<MemberBookingsScreen />} />
                        <Route path="payments" element={<MemberPaymentsScreen />} />
                        <Route path="profile" element={<MemberProfileScreen />} />
                    </Route>
                    
                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
