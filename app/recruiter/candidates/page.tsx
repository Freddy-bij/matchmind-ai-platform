'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { StatsCard } from '@/src/components/dashboard/StatsCard';
import { CandidateCard } from '@/src/components/dashboard/CandidateCard';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { Briefcase, Users, Calendar, TrendingUp, Search, Download, MessageSquare, Calendar as CalendarIcon } from 'lucide-react';

export default function CandidatesPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, href: '/recruiter', active: false },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/recruiter/jobs', active: false },
    { id: 'candidates', label: 'Candidates', icon: Users, href: '/recruiter/candidates', active: true },
    { id: 'applications', label: 'Applications', icon: Calendar, href: '/recruiter/applications', active: false },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/recruiter/analytics', active: false },
    { id: 'settings', label: 'Settings', icon: Search, href: '/recruiter/settings', active: false },
  ];

  const candidates = [
    {
      id: '1',
      name: 'John Doe',
      title: 'Senior React Developer',
      experience: '8 years',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      matchScore: 92,
      avatar: null,
      bio: 'Experienced full-stack developer with a passion for creating scalable web applications...',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      availability: 'Immediate',
      salary: '$120k - $180k',
      education: 'BS Computer Science',
      lastActive: '2 hours ago',
      role: 'candidate' as const,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      title: 'Frontend Developer',
      experience: '5 years',
      location: 'New York, NY',
      skills: ['React', 'CSS', 'JavaScript', 'Vue.js'],
      matchScore: 85,
      avatar: null,
      bio: 'Creative frontend developer with expertise in modern JavaScript frameworks...',
      email: 'jane.smith@email.com',
      phone: '+1 (555) 987-6543',
      availability: '2 weeks notice',
      salary: '$80k - $120k',
      education: 'BA Web Design',
      lastActive: '1 day ago',
      role: 'candidate' as const,
      createdAt: '2024-01-02',
      updatedAt: '2024-01-14'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      title: 'Full Stack Engineer',
      experience: '6 years',
      location: 'Remote',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      matchScore: 78,
      avatar: null,
      bio: 'Versatile engineer with experience in both frontend and backend technologies...',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 456-7890',
      availability: '1 month notice',
      salary: '$100k - $140k',
      education: 'MS Software Engineering',
      lastActive: '3 hours ago',
      role: 'candidate' as const,
      createdAt: '2024-01-03',
      updatedAt: '2024-01-13'
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
          title="Candidates Management"
          subtitle="Find and connect with qualified candidates"
          user={user}
          onLogout={logout}
        />

        {/* Page Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <StatsCard
              title="Total Candidates"
              value="1,248"
              icon={<Users className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="In talent pool"
              trend={{ value: 12, direction: 'up' }}
            />
            <StatsCard
              title="New This Week"
              value="47"
              icon={<Calendar className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Recently joined"
              trend={{ value: 8, direction: 'up' }}
            />
            <StatsCard
              title="Avg Match Score"
              value="78%"
              icon={<TrendingUp className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Quality matches"
              color="success"
            />
            <StatsCard
              title="Active Conversations"
              value="23"
              icon={<MessageSquare className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Ongoing chats"
              trend={{ value: 15, direction: 'up' }}
            />
          </div>

          {/* Candidates Section */}
          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 lg:mb-6 space-y-3 sm:space-y-0">
              <h2 className="text-lg lg:text-xl font-semibold text-[#1E293B]">Matched Candidates</h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                <Button variant="secondary" className="w-full flex items-center sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="secondary" className="w-full flex items-center sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-[#FF6B35] hover:bg-orange-600 flex items-center w-full sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Search Candidates
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 lg:gap-6">
              {candidates.map(candidate => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  matchScore={candidate.matchScore}
                  onViewProfile={(candidateId) => console.log('View profile:', candidateId)}
                  onMessage={(candidateId) => console.log('Message candidate:', candidateId)}
                  onScheduleInterview={(candidateId) => console.log('Schedule interview:', candidateId)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
