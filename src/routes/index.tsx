import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { LoginPage } from '../components/auth/LoginPage';
import { PublicComplaintForm } from '../pages/public/PublicComplaintForm';
import { TrackComplaintPage } from '../pages/public/TrackComplaintPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { ComplaintDetailsPage } from '../pages/complaints/ComplaintDetailsPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { TeamPage } from '../pages/team/TeamPage';
import { TeamPerformancePage } from '../pages/team/performance/TeamPerformancePage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/public/complaint" element={<PublicComplaintForm />} />
      <Route path="/public/track" element={<TrackComplaintPage />} />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/complaints/:id" element={
        <ProtectedRoute>
          <ComplaintDetailsPage />
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <ReportsPage />
        </ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute>
          <AnalyticsPage />
        </ProtectedRoute>
      } />
      <Route path="/team" element={
        <ProtectedRoute>
          <TeamPage />
        </ProtectedRoute>
      } />
      <Route path="/team/performance" element={
        <ProtectedRoute>
          <TeamPerformancePage />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
};