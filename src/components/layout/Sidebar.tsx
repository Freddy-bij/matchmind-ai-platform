import React from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/src/types';
import { Settings, LogOut, Home, Briefcase, Users, BarChart3, FileText, User as UserIcon, Menu, X } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  active?: boolean;
  badge?: number;
}

interface SidebarProps {
  user?: User | null;
  items: SidebarItem[];
  onLogout?: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  items,
  onLogout,
  isOpen = true,
  onToggle
}) => {
  const router = useRouter();

  return (
    <>
      {/* Mobile Menu Button - Always visible on mobile */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Mobile Overlay - Only show when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - Fixed positioning for all screens */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 
        w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 min-h-screen shadow-sm
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <div>
              <h1 className="font-bold text-[#1E293B] text-lg">MatchMind</h1>
              <p className="text-xs text-[#64748B]">AI-Powered Matching</p>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#1E293B]">{user?.name || 'User'}</p>
              <p className="text-sm text-[#64748B] capitalize bg-blue-50 text-blue-600 px-2 py-1 rounded-full inline-block">
                {user?.role || 'guest'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {items.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    // Handle navigation if href is provided
                    if (item.href) {
                      router.push(item.href);
                    }
                    // Close mobile menu after navigation
                    if (onToggle && window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    item.active
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-[#64748B] hover:bg-gray-100 hover:text-[#1E293B] hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-5 h-5 ${item.active ? 'text-white' : 'text-gray-500 group-hover:text-[#1E293B]'}`} />
                    <span className={`font-medium ${item.active ? 'text-white' : 'text-gray-700 group-hover:text-[#1E293B]'}`}>
                      {item.label}
                    </span>
                  </div>
                  {item.badge && item.badge > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      item.active 
                        ? 'bg-white text-blue-600' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
        
        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[#64748B] hover:bg-white hover:shadow-md transition-all duration-200 group">
              <Settings className="w-5 h-5 text-gray-500 group-hover:text-[#1E293B]" />
              <span className="font-medium text-gray-700 group-hover:text-[#1E293B]">Settings</span>
            </button>
            <button 
              onClick={() => {
                onLogout?.();
                // Close mobile menu after logout
                if (onToggle && window.innerWidth < 1024) {
                  onToggle();
                }
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[#EF4444] hover:bg-red-50 hover:shadow-md transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
              <span className="font-medium text-red-700 group-hover:text-red-800">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
