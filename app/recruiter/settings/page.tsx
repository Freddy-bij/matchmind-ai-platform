'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { Briefcase, Users, Calendar, TrendingUp, Search, Download, Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, HelpCircle, LogOut, Mail, Phone, MapPin, Building } from 'lucide-react';

export default function RecruiterSettingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, href: '/recruiter', active: false },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/recruiter/jobs', active: false },
    { id: 'candidates', label: 'Candidates', icon: Users, href: '/recruiter/candidates', active: false },
    { id: 'applications', label: 'Applications', icon: Calendar, href: '/recruiter/applications', active: false },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/recruiter/analytics', active: false },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, href: '/recruiter/settings', active: true },
  ];

  const [activeTab, setActiveTab] = useState('profile');

  const settingsTabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'company', label: 'Company Info', icon: Building },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <Sidebar 
        user={user}
        items={sidebarItems}
        onLogout={logout}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content - Account for fixed sidebar */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        {/* Header */}
        <Header 
          title="Settings"
          subtitle="Manage your account and application preferences"
          user={user}
          onLogout={logout}
        />

        {/* Page Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-1">
                    {settingsTabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                            activeTab === tab.id
                              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                              type="text"
                              defaultValue={user?.name || 'John Doe'}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                              type="email"
                              defaultValue={user?.email || 'john.doe@company.com'}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            defaultValue="+1 (555) 123-4567"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                          <textarea
                            rows={3}
                            defaultValue="Experienced recruiter with a passion for connecting talent with opportunity."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <Button className="bg-[#FF6B35] hover:bg-orange-600">
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">New Applications</h4>
                            <p className="text-sm text-gray-500">Get notified when candidates apply to your jobs</p>
                          </div>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Interview Reminders</h4>
                            <p className="text-sm text-gray-500">Remind me about upcoming interviews</p>
                          </div>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                            <p className="text-sm text-gray-500">Receive weekly recruitment summaries</p>
                          </div>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">Marketing Emails</h4>
                            <p className="text-sm text-gray-500">Receive product updates and tips</p>
                          </div>
                          <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
                          <div className="space-y-3">
                            <input
                              type="password"
                              placeholder="Current Password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              type="password"
                              placeholder="New Password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              type="password"
                              placeholder="Confirm New Password"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <Button variant="secondary">Update Password</Button>
                        </div>
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-500 mb-3">Add an extra layer of security to your account</p>
                          <Button variant="secondary">Enable 2FA</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Language</h4>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Time Zone</h4>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Pacific Time (PT)</option>
                            <option>Mountain Time (MT)</option>
                            <option>Central Time (CT)</option>
                            <option>Eastern Time (ET)</option>
                          </select>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Date Format</h4>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>MM/DD/YYYY</option>
                            <option>DD/MM/YYYY</option>
                            <option>YYYY-MM-DD</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'company' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                            <input
                              type="text"
                              defaultValue="Tech Corp"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>Technology</option>
                              <option>Healthcare</option>
                              <option>Finance</option>
                              <option>Education</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>1-10 employees</option>
                            <option>11-50 employees</option>
                            <option>51-200 employees</option>
                            <option>201-500 employees</option>
                            <option>500+ employees</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                          <textarea
                            rows={3}
                            defaultValue="Leading technology company focused on innovation and excellence."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                            <input
                              type="url"
                              defaultValue="https://techcorp.com"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input
                              type="text"
                              defaultValue="San Francisco, CA"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <Button className="bg-[#FF6B35] hover:bg-orange-600">
                          Save Company Info
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
