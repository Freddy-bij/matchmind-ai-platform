'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { StatsCard } from '@/src/components/dashboard/StatsCard';
import { JobCard } from '@/src/components/dashboard/JobCard';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { Briefcase, Users, Calendar, TrendingUp, Plus, Search, Download } from 'lucide-react';

export default function JobsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, href: '/recruiter', active: false },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/recruiter/jobs', active: true },
    { id: 'candidates', label: 'Candidates', icon: Users, href: '/recruiter/candidates', active: false },
    { id: 'applications', label: 'Applications', icon: Calendar, href: '/recruiter/applications', active: false },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/recruiter/analytics', active: false },
    { id: 'settings', label: 'Settings', icon: Search, href: '/recruiter/settings', active: false },
  ];

  const jobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $180k',
      posted: '2 days ago',
      applicants: 24,
      status: 'active' as const,
      matchScore: 85,
      description: 'We are looking for an experienced React developer...',
      requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
      postedDate: '2024-01-15',
      recruiterId: 'recruiter-1'
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      posted: '1 week ago',
      applicants: 45,
      status: 'active' as const,
      matchScore: 78,
      description: 'Join our growing team as a frontend developer...',
      requirements: ['React', 'CSS', 'JavaScript', '3+ years experience'],
      postedDate: '2024-01-10',
      recruiterId: 'recruiter-2'
    },
    {
      id: '3',
      title: 'Full Stack Engineer',
      company: 'Design Studio',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$100k - $140k',
      posted: '3 days ago',
      applicants: 18,
      status: 'active' as const,
      matchScore: 92,
      description: 'Looking for a versatile full stack developer...',
      requirements: ['React', 'Node.js', 'MongoDB', '4+ years experience'],
      postedDate: '2024-01-14',
      recruiterId: 'recruiter-3'
    }
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
          title="Jobs Management"
          subtitle="Manage and monitor your job postings"
          user={user}
          onLogout={logout}
        />

        {/* Page Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <StatsCard
              title="Active Jobs"
              value="12"
              icon={<Briefcase className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="3 new this week"
              trend={{ value: 15, direction: 'up' }}
            />
            <StatsCard
              title="Total Applicants"
              value="248"
              icon={<Users className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Avg. 12 per job"
              trend={{ value: 8, direction: 'up' }}
            />
            <StatsCard
              title="Views Today"
              value="156"
              icon={<Search className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Job post views"
              trend={{ value: 12, direction: 'up' }}
            />
            <StatsCard
              title="Avg Match Score"
              value="82%"
              icon={<TrendingUp className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Across all candidates"
              color="success"
            />
          </div>

          {/* Jobs Section */}
          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 lg:mb-6 space-y-3 sm:space-y-0">
              <h2 className="text-lg lg:text-xl font-semibold text-[#1E293B]">Posted Jobs</h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                <Button variant="secondary" className="w-full  flex items-center sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="secondary" className="w-full flex items-center sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-[#FF6B35] flex items-center hover:bg-orange-600 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 lg:gap-6">
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  matchScore={job.matchScore}
                  onApply={(jobId) => console.log('Apply to job:', jobId)}
                  onSave={(jobId) => console.log('Save job:', jobId)}
                  onView={(jobId) => console.log('View job:', jobId)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
