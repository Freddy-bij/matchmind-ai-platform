'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { StatsCard } from '@/src/components/dashboard/StatsCard';
import { Badge } from '@/src/components/ui/Badge';
import { Avatar } from '@/src/components/ui/Avatar';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { Briefcase, Users, Calendar, TrendingUp, Search, Download, Filter, Eye, MessageSquare, FileText, Check, Clock, BarChart3, Settings } from 'lucide-react';

export default function RecruiterApplicationsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, href: '/recruiter', active: false },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/recruiter/jobs', active: false },
    { id: 'candidates', label: 'Candidates', icon: Users, href: '/recruiter/candidates', active: false },
    { id: 'applications', label: 'Applications', icon: Calendar, href: '/recruiter/applications', active: true },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/recruiter/analytics', active: false },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/recruiter/settings', active: false },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = {
    total: 156,
    pending: 23,
    reviewing: 18,
    interview: 12,
    accepted: 8
  };

  const applications = [
    {
      id: '1',
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@email.com',
      jobTitle: 'Senior React Developer',
      jobLocation: 'San Francisco, CA',
      experience: '8 years',
      status: 'pending',
      matchScore: 92,
      appliedDate: '2024-01-15',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB']
    },
    {
      id: '2',
      candidateName: 'Jane Smith',
      candidateEmail: 'jane.smith@email.com',
      jobTitle: 'Frontend Developer',
      jobLocation: 'New York, NY',
      experience: '5 years',
      status: 'reviewing',
      matchScore: 85,
      appliedDate: '2024-01-12',
      skills: ['React', 'CSS', 'JavaScript', 'Vue.js']
    },
    {
      id: '3',
      candidateName: 'Mike Johnson',
      candidateEmail: 'mike.johnson@email.com',
      jobTitle: 'Full Stack Engineer',
      jobLocation: 'Remote',
      experience: '6 years',
      status: 'interview',
      matchScore: 78,
      appliedDate: '2024-01-10',
      skills: ['React', 'Node.js', 'Python', 'AWS']
    },
    {
      id: '4',
      candidateName: 'Sarah Wilson',
      candidateEmail: 'sarah.wilson@email.com',
      jobTitle: 'UI/UX Developer',
      jobLocation: 'Los Angeles, CA',
      experience: '4 years',
      status: 'accepted',
      matchScore: 88,
      appliedDate: '2024-01-08',
      skills: ['React', 'Design Systems', 'CSS', 'Figma']
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'reviewing': return 'primary';
      case 'interview': return 'success';
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'reviewing': return <Eye className="w-3 h-3" />;
      case 'interview': return <Calendar className="w-3 h-3" />;
      case 'accepted': return <Check className="w-3 h-3" />;
      default: return null;
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
          title="Applications Management"
          subtitle="Review and manage job applications from candidates"
          user={user}
          onLogout={logout}
        />

        {/* Page Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
            <StatsCard
              title="Total Applications"
              value={stats.total}
              icon={<FileText className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="All time"
            />
            <StatsCard
              title="Pending"
              value={stats.pending}
              icon={<Clock className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Awaiting review"
              color="warning"
            />
            <StatsCard
              title="Reviewing"
              value={stats.reviewing}
              icon={<Eye className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Under review"
              color="primary"
            />
            <StatsCard
              title="Interviews"
              value={stats.interview}
              icon={<Calendar className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Scheduled"
              color="primary"
            />
            <StatsCard
              title="Accepted"
              value={stats.accepted}
              icon={<Check className="w-5 h-5 sm:w-6 h-6" />}
              subtitle="Hired"
              color="success"
            />
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-4 lg:mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, job, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 lg:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 lg:px-4 py-2 lg:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interview">Interview</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <Button variant="secondary" className="w-full sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
                <Button variant="secondary" className="w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-3 lg:space-y-4">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-3 lg:space-x-4 flex-1">
                      <Avatar name={application.candidateName} size="lg" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-2 lg:mb-3 space-y-2 lg:space-y-0">
                          <div className="min-w-0">
                            <h3 className="text-lg font-semibold text-[#1E293B] mb-1 truncate">
                              {application.candidateName}
                            </h3>
                            <p className="text-sm text-[#64748B] mb-2 truncate">{application.candidateEmail}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                            <Badge variant={getStatusColor(application.status)} size="sm">
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(application.status)}
                                <span className="text-xs">{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span>
                              </div>
                            </Badge>
                            <div className="text-center sm:text-right">
                              <div className="text-2xl font-bold text-[#1E293B]">{application.matchScore}%</div>
                              <p className="text-xs text-[#64748B]">Match Score</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-3">
                          <div>
                            <p className="text-sm font-medium text-[#1E293B] mb-1">Applied Position</p>
                            <p className="text-sm text-[#64748B] truncate">{application.jobTitle}</p>
                            <p className="text-xs text-[#64748B]">📍 {application.jobLocation}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#1E293B] mb-1">Experience</p>
                            <p className="text-sm text-[#64748B]">{application.experience}</p>
                            <p className="text-xs text-[#64748B]">Applied: {application.appliedDate}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-[#1E293B] mb-2">Skills</p>
                          <div className="flex flex-wrap gap-1 lg:gap-2">
                            {application.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" size="sm">
                                <span className="text-xs">{skill}</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Button variant="primary" size="sm" className="w-full sm:w-auto">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    {application.status === 'reviewing' && (
                      <Button variant="accent" size="sm" className="w-full sm:w-auto">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Interview
                      </Button>
                    )}
                    {application.status === 'pending' && (
                      <Button variant="primary" size="sm" className="w-full sm:w-auto">
                        <Eye className="w-4 h-4 mr-2" />
                        Start Review
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
  );
}
