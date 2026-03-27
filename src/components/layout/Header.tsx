import React from 'react';
import { User } from '@/src/types';
import { Button } from '@/src/components/ui/Button';
import { Avatar } from '@/src/components/ui/Avatar';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  title = 'MatchMind AI',
  subtitle
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#0A66C2]">{title}</h1>
            {subtitle && (
              <span className="ml-2 text-sm text-[#64748B]">{subtitle}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-[#64748B]">Welcome, {user.name}</span>
                  <Avatar name={user.name} size="md" />
                </div>
                <Button variant="secondary" onClick={onLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
