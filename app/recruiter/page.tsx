'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { StatsCard } from '@/src/components/dashboard/StatsCard';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { Briefcase, Users, Calendar, TrendingUp, Plus, Search, Download, BarChart3, FileText, Settings } from 'lucide-react';

export default function RecruiterDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, href: '/recruiter', active: true },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/recruiter/jobs', active: false },
    { id: 'candidates', label: 'Candidates', icon: Users, href: '/recruiter/candidates', active: false },
    { id: 'applications', label: 'Applications', icon: Calendar, href: '/recruiter/applications', active: false },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/recruiter/analytics', active: false },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/recruiter/settings', active: false },
  ];

  const recentJobs = [
    { id: 1, title: 'Senior React Developer', company: 'Tech Corp', applicants: 24, status: 'active' },
    { id: 2, title: 'Frontend Developer', company: 'StartupXYZ', applicants: 45, status: 'active' },
    { id: 3, title: 'Full Stack Engineer', company: 'Design Studio', applicants: 18, status: 'active' }
  ];

  const recentCandidates = [
    { id: 1, name: 'John Doe', title: 'Senior React Developer', matchScore: 92 },
    { id: 2, name: 'Jane Smith', title: 'Frontend Developer', matchScore: 85 },
    { id: 3, name: 'Mike Johnson', title: 'Full Stack Engineer', matchScore: 78 }
  ];

  const recentActivity = [
    { type: 'application', message: 'New application for Senior React Developer', time: '2 min ago', color: 'green' },
    { type: 'interview', message: 'Interview scheduled with Jane Doe', time: '1 hour ago', color: 'blue' },
    { type: 'job', message: 'New job posted: Full Stack Engineer', time: '3 hours ago', color: 'purple' }
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
          title="Recruiter Dashboard"
          subtitle="Welcome back! Here's what's happening with your recruitment"
          user={user}
          onLogout={logout}
        />

        {/* Page Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Button 
              className="bg-[#FF6B35] hover:bg-orange-600 w-full"
              onClick={() => router.push('/recruiter/jobs')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => router.push('/recruiter/candidates')}
            >
              <Search className="w-4 h-4 mr-2" />
              Search Candidates
            </Button>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => router.push('/recruiter/applications')}
            >
              <FileText className="w-4 h-4 mr-2" />
              View Applications
            </Button>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => router.push('/recruiter/analytics')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Recent Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentJobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-[#1E293B]">{job.title}</p>
                        <p className="text-xs text-[#64748B]">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#0A66C2]">{job.applicants}</p>
                        <p className="text-xs text-[#64748B]">applicants</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full mt-4"
                  onClick={() => router.push('/recruiter/jobs')}
                >
                  View All Jobs
                </Button>
              </CardContent>
            </Card>

            {/* Recent Candidates */}
            <Card>
              <CardHeader>
                <CardTitle>Top Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentCandidates.map(candidate => (
                    <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-[#1E293B]">{candidate.name}</p>
                        <p className="text-xs text-[#64748B]">{candidate.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">{candidate.matchScore}%</p>
                        <p className="text-xs text-[#64748B]">match</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full mt-4"
                  onClick={() => router.push('/recruiter/candidates')}
                >
                  View All Candidates
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className={`p-3 bg-${activity.color}-50 rounded-lg`}>
                      <p className={`text-sm font-medium text-${activity.color}-800`}>{activity.message}</p>
                      <p className={`text-xs text-${activity.color}-600`}>{activity.time}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full mt-4"
                  onClick={() => router.push('/recruiter/analytics')}
                >
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
