'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { StatsCard } from '@/src/components/dashboard/StatsCard';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { Briefcase, Users, FileText, TrendingUp, Search, Upload, Settings, Calendar, Eye } from 'lucide-react';

export default function CandidateDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, href: '/candidate', active: true },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/candidate/jobs', active: false },
    { id: 'applications', label: 'Applications', icon: FileText, href: '/candidate/applications', active: false },
    { id: 'profile', label: 'Profile', icon: Users, href: '/candidate/profile', active: false },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/candidate/settings', active: false },
  ];

  const recommendedJobs = [
    { id: 1, title: 'Senior React Developer', company: 'Tech Corp', matchScore: 92 },
    { id: 2, title: 'Frontend Developer', company: 'StartupXYZ', matchScore: 85 },
    { id: 3, title: 'Full Stack Engineer', company: 'Design Studio', matchScore: 78 }
  ];

  const recentApplications = [
    { id: 1, jobTitle: 'Senior React Developer', company: 'Tech Corp', status: 'pending', appliedDate: '2024-01-15' },
    { id: 2, jobTitle: 'Frontend Developer', company: 'StartupXYZ', status: 'reviewing', appliedDate: '2024-01-12' },
    { id: 3, jobTitle: 'Full Stack Engineer', company: 'Design Studio', status: 'interview', appliedDate: '2024-01-10' }
  ];

  const recentActivity = [
    { type: 'application', message: 'Application viewed by Tech Corp', time: '1 day ago', color: 'green' },
    { type: 'match', message: 'New match: Full Stack Engineer', time: '2 days ago', color: 'blue' },
    { type: 'profile', message: 'Profile viewed by 3 recruiters', time: '3 days ago', color: 'purple' }
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
          title="Candidate Dashboard"
          subtitle="Welcome back! Here's your job search activity"
          user={user}
          onLogout={logout}
        />

        {/* Page Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <StatsCard
              title="Recommended Jobs"
              value="24"
              icon={<Briefcase className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Based on your profile"
              trend={{ value: 12, direction: 'up' }}
            />
            <StatsCard
              title="Applications Sent"
              value="8"
              icon={<FileText className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="3 pending review"
              trend={{ value: 5, direction: 'up' }}
            />
            <StatsCard
              title="Profile Views"
              value="47"
              icon={<Eye className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="By recruiters"
              trend={{ value: 18, direction: 'up' }}
            />
            <StatsCard
              title="Avg Match Score"
              value="85%"
              icon={<TrendingUp className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Above average"
              color="success"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Button 
              className=" flex items-center  w-full"
              onClick={() => router.push('/candidate/jobs')}
            >
              Browse Jobs
            </Button>
            <Button 
              variant="secondary" 
              className="w-full flex items-center"
              onClick={() => router.push('/candidate/applications')}
            >
              <FileText className="w-4 h-4 mr-2" />
              My Applications
            </Button>
            <Button 
              variant="secondary" 
              className="w-full flex items-center"
              onClick={() => router.push('/candidate/profile')}
            >
              <Users className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
            <Button 
              variant="secondary" 
              className="w-full flex items-center"
              onClick={() => router.push('/candidate/jobs')}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Resume
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Recommended Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendedJobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-[#1E293B]">{job.title}</p>
                        <p className="text-xs text-[#64748B]">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">{job.matchScore}%</p>
                        <p className="text-xs text-[#64748B]">match</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full  mt-4"
                  onClick={() => router.push('/candidate/jobs')}
                >
                  View All Jobs
                </Button>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentApplications.map(app => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-[#1E293B]">{app.jobTitle}</p>
                        <p className="text-xs text-[#64748B]">{app.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-blue-600 capitalize">{app.status}</p>
                        <p className="text-xs text-[#64748B]">{app.appliedDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full mt-4"
                  onClick={() => router.push('/candidate/applications')}
                >
                  View All Applications
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
                  onClick={() => router.push('/candidate/profile')}
                >
                  View Profile Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
