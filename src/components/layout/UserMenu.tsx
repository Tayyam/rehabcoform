import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-gray-900"
      >
        <div className="w-8 h-8 bg-primary-main bg-opacity-10 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-primary-main" />
        </div>
        <span className="font-medium">{user?.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 rtl:space-x-reverse"
            >
              <LogOut className="w-4 h-4 ml-2" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};