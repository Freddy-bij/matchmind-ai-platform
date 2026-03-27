'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { StatsCard } from '@/src/components/dashboard/StatsCard';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { Briefcase, Users, Calendar, TrendingUp, Search, Download, FileText, BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, href: '/recruiter', active: false },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/recruiter/jobs', active: false },
    { id: 'candidates', label: 'Candidates', icon: Users, href: '/recruiter/candidates', active: false },
    { id: 'applications', label: 'Applications', icon: Calendar, href: '/recruiter/applications', active: false },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/recruiter/analytics', active: true },
    { id: 'settings', label: 'Settings', icon: Search, href: '/recruiter/settings', active: false },
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
          title="Analytics Dashboard"
          subtitle="Track your recruitment performance and insights"
          user={user}
          onLogout={logout}
        />

        {/* Page Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <StatsCard
              title="Jobs Posted"
              value="24"
              icon={<FileText className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="This month"
              trend={{ value: 12, direction: 'up' }}
            />
            <StatsCard
              title="Views per Job"
              value="156"
              icon={<BarChart3 className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Avg. 6.5 views"
              trend={{ value: 8, direction: 'up' }}
            />
            <StatsCard
              title="Application Rate"
              value="18.5%"
              icon={<TrendingUp className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Conversion rate"
              trend={{ value: 3, direction: 'up' }}
              color="success"
            />
            <StatsCard
              title="Time to Hire"
              value="21 days"
              icon={<Calendar className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Average duration"
              trend={{ value: 5, direction: 'down' }}
              color="success"
            />
          </div>

          {/* Analytics Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-green-50 rounded-lg space-y-2 sm:space-y-0">
                    <div>
                      <p className="text-sm text-green-800 font-medium">New Application</p>
                      <p className="text-xs text-green-600">Senior React Developer - Tech Corp</p>
                    </div>
                    <span className="text-green-600 text-sm">2 min ago</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-blue-50 rounded-lg space-y-2 sm:space-y-0">
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Interview Scheduled</p>
                      <p className="text-xs text-blue-600">Jane Doe - Frontend Developer</p>
                    </div>
                    <span className="text-blue-600 text-sm">1 hour ago</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-purple-50 rounded-lg space-y-2 sm:space-y-0">
                    <div>
                      <p className="text-sm text-purple-800 font-medium">Job Posted</p>
                      <p className="text-xs text-purple-600">Full Stack Engineer - StartupXYZ</p>
                    </div>
                    <span className="text-purple-600 text-sm">3 hours ago</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-orange-50 rounded-lg space-y-2 sm:space-y-0">
                    <div>
                      <p className="text-sm text-orange-800 font-medium">Profile Matched</p>
                      <p className="text-xs text-orange-600">Mike Johnson - Senior Developer</p>
                    </div>
                    <span className="text-orange-600 text-sm">5 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-[#64748B]">Job Fill Rate</span>
                      <span className="text-sm font-bold text-[#1E293B]">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#0A66C2] h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-[#64748B]">Candidate Quality</span>
                      <span className="text-sm font-bold text-[#1E293B]">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#10B981] h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-[#64748B]">Response Time</span>
                      <span className="text-sm font-bold text-[#1E293B]">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#F59E0B] h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-[#64748B]">Satisfaction Rate</span>
                      <span className="text-sm font-bold text-[#1E293B]">88%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#8B5CF6] h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">Senior React Developer</p>
                      <p className="text-xs text-[#64748B]">89 applications, 12 interviews</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">95%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">Frontend Developer</p>
                      <p className="text-xs text-[#64748B]">67 applications, 8 interviews</p>
                    </div>
                    <span className="text-sm font-bold text-blue-600">82%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">Full Stack Engineer</p>
                      <p className="text-xs text-[#64748B]">45 applications, 6 interviews</p>
                    </div>
                    <span className="text-sm font-bold text-purple-600">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recruitment Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Job Views</p>
                      <p className="text-xs text-blue-600">Total views across all jobs</p>
                    </div>
                    <span className="text-lg font-bold text-blue-800">1,234</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-indigo-800">Applications</p>
                      <p className="text-xs text-indigo-600">Submitted applications</p>
                    </div>
                    <span className="text-lg font-bold text-indigo-800">248</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-purple-800">Interviews</p>
                      <p className="text-xs text-purple-600">Scheduled interviews</p>
                    </div>
                    <span className="text-lg font-bold text-purple-800">42</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-800">Hires</p>
                      <p className="text-xs text-green-600">Successful placements</p>
                    </div>
                    <span className="text-lg font-bold text-green-800">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
