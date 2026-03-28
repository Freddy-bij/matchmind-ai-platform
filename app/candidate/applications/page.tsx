'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { Briefcase, Users, FileText, Search, Calendar, Eye, MessageSquare } from 'lucide-react';

export default function CandidateApplicationsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, href: '/candidate', active: false },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/candidate/jobs', active: false },
    { id: 'applications', label: 'Applications', icon: FileText, href: '/candidate/applications', active: true },
    { id: 'profile', label: 'Profile', icon: Users, href: '/candidate/profile', active: false },
    { id: 'settings', label: 'Settings', icon: Search, href: '/candidate/settings', active: false },
  ];

  const applications = [
    {
      id: '1',
      jobTitle: 'Senior React Developer',
      company: 'Tech Corp',
      status: 'pending',
      appliedDate: '2024-01-15',
      matchScore: 92
    },
    {
      id: '2',
      jobTitle: 'Frontend Developer',
      company: 'StartupXYZ',
      status: 'reviewing',
      appliedDate: '2024-01-12',
      matchScore: 85
    },
    {
      id: '3',
      jobTitle: 'Full Stack Engineer',
      company: 'Design Studio',
      status: 'interview',
      appliedDate: '2024-01-10',
      matchScore: 78
    },
    {
      id: '4',
      jobTitle: 'UI/UX Developer',
      company: 'Creative Agency',
      status: 'rejected',
      appliedDate: '2024-01-08',
      matchScore: 65
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'reviewing': return 'primary';
      case 'interview': return 'success';
      case 'rejected': return 'error';
      default: return 'secondary';
    }
  };

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
          title="My Applications"
          subtitle="Track the status of your job applications"
          user={user}
          onLogout={logout}
        />

        {/* Page Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <Card className="text-center">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1E293B] mb-1">8</div>
                <h3 className="text-xs sm:text-sm font-medium text-[#64748B] mb-1">Total Applications</h3>
                <p className="text-xs text-[#64748B]">Sent so far</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F59E0B] mb-1">3</div>
                <h3 className="text-xs sm:text-sm font-medium text-[#64748B] mb-1">Pending</h3>
                <p className="text-xs text-[#64748B]">Awaiting review</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0A66C2] mb-1">2</div>
                <h3 className="text-xs sm:text-sm font-medium text-[#64748B] mb-1">Interviews</h3>
                <p className="text-xs text-[#64748B]">Scheduled</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#10B981] mb-1">85%</div>
                <h3 className="text-xs sm:text-sm font-medium text-[#64748B] mb-1">Avg Match Score</h3>
                <p className="text-xs text-[#64748B]">Across applications</p>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 lg:mb-6 space-y-3 sm:space-y-0">
              <h2 className="text-lg lg:text-xl font-semibold text-[#1E293B]">Application History</h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                <Button variant="secondary" className="w-full flex items-center sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button className="bg-[#FF6B35] flex items-center hover:bg-orange-600 w-full sm:w-auto">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Browse More Jobs
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 lg:gap-6">
              {applications.map(application => (
                <Card key={application.id}>
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#1E293B] mb-2">
                          {application.jobTitle}
                        </h3>
                        <p className="text-[#0A66C2] font-medium mb-3">{application.company}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-[#64748B] space-y-2 sm:space-y-0">
                          <span>Applied: {application.appliedDate}</span>
                          <Badge variant={getStatusColor(application.status)} size="sm">
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <div className="lg:ml-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#1E293B] mb-2">{application.matchScore}%</div>
                          <p className="text-xs text-[#64748B]">Match Score</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-gray-100">
                      <Button variant="secondary" size="sm" className="w-full flex items-center sm:w-auto">
                        <Eye className="w-4 h-4 mr-2" />
                        View Application
                      </Button>
                      <Button variant="secondary" size="sm" className="w-full flex items-center sm:w-auto">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Recruiter
                      </Button>
                      {application.status === 'interview' && (
                        <Button variant="primary" size="sm" className="w-full flex items-center sm:w-auto">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Interview
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
