import React from 'react';
import { Logo } from '../common/Logo';
import { ExternalServices } from './components/ExternalServices';
import { LoginForm } from './components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-main/5 to-secondary-main/5">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <Logo />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            نظام بلاغات شركة رحاب
          </h1>
        </div>

        <ExternalServices />
        <LoginForm />
      </div>
    </div>
  );
};