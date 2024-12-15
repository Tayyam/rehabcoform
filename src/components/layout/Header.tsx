import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Users, Settings, BarChart2, PieChart } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { UserMenu } from './UserMenu';

export const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link to="/reports">
              <Button 
                variant={location.pathname === '/reports' ? 'primary' : 'outline'} 
                size="sm" 
                className="flex items-center"
              >
                <FileText className="h-4 w-4 ml-2" />
                {t('general.reports')}
              </Button>
            </Link>

            <Link to="/analytics">
              <Button 
                variant={location.pathname === '/analytics' ? 'primary' : 'outline'} 
                size="sm" 
                className="flex items-center"
              >
                <PieChart className="h-4 w-4 ml-2" />
                تحليل البيانات
              </Button>
            </Link>

            <Link to="/team/performance">
              <Button 
                variant={location.pathname === '/team/performance' ? 'primary' : 'outline'} 
                size="sm" 
                className="flex items-center"
              >
                <BarChart2 className="h-4 w-4 ml-2" />
                أداء الفريق
              </Button>
            </Link>

            <Link to="/team">
              <Button 
                variant={location.pathname === '/team' ? 'primary' : 'outline'} 
                size="sm" 
                className="flex items-center"
              >
                <Users className="h-4 w-4 ml-2" />
                {t('general.team')}
              </Button>
            </Link>

            <Link to="/settings">
              <Button 
                variant={location.pathname === '/settings' ? 'primary' : 'outline'} 
                size="sm" 
                className="flex items-center"
              >
                <Settings className="h-4 w-4 ml-2" />
                {t('general.settings')}
              </Button>
            </Link>

            <div className="mr-4 border-r border-gray-200 h-6" />
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};