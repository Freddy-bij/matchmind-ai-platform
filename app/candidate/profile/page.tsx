'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { Briefcase, Users, FileText, Search, Upload, Settings, Edit } from 'lucide-react';

export default function CandidateProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, href: '/candidate', active: false },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/candidate/jobs', active: false },
    { id: 'applications', label: 'Applications', icon: FileText, href: '/candidate/applications', active: false },
    { id: 'profile', label: 'Profile', icon: Users, href: '/candidate/profile', active: true },
    { id: 'settings', label: 'Settings', icon: Search, href: '/candidate/settings', active: false },
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
          title="My Profile"
          subtitle="Manage your professional information and preferences"
          user={user}
          onLogout={logout}
        />

        {/* Page Content */}
        <div className="flex-1 px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
          {/* Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">Full Name</label>
                      <p className="text-[#1E293B]">{user?.name || 'John Doe'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">Email Address</label>
                      <p className="text-[#1E293B]">{user?.email || 'john.doe@example.com'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">Phone Number</label>
                      <p className="text-[#1E293B]">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">Location</label>
                      <p className="text-[#1E293B]">San Francisco, CA</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">Professional Summary</label>
                      <p className="text-[#1E293B]">Experienced software developer with 5+ years of expertise in React, TypeScript, and Node.js. Passionate about creating scalable web applications and solving complex problems.</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">Skills</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {['React', 'TypeScript', 'Node.js', 'JavaScript', 'CSS', 'HTML', 'MongoDB', 'Git'].map((skill, index) => (
                          <Badge key={index} variant="secondary" size="sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">Experience</label>
                      <p className="text-[#1E293B]">5+ years in software development</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">Education</label>
                      <p className="text-[#1E293B]">Bachelor of Science in Computer Science</p>
                      <p className="text-sm text-[#64748B]">University of California, Berkeley (2018)</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">LinkedIn</label>
                      <p className="text-[#0A66C2]">linkedin.com/in/johndoe</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#64748B]">Portfolio</label>
                      <p className="text-[#0A66C2]">johndoe.dev</p>
                    </div>
                  </div>
                  <Button className="mt-6 w-full sm:w-auto">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 lg:p-6 text-center">
                    <Upload className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-[#64748B] mb-4 text-sm lg:text-base">Upload your resume</p>
                    <p className="text-xs text-[#64748B] mb-4">PDF, DOC, DOCX (Max 5MB)</p>
                    <Button variant="secondary" className="w-full sm:w-auto">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4 lg:mt-6">
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#64748B] text-sm">Overall Progress</span>
                      <span className="font-medium text-sm">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#0A66C2] h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-[#64748B]">Basic Information</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-[#64748B]">Skills & Experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-[#64748B]">Education</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-[#64748B]">Resume (Missing)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-[#64748B]">Portfolio Links</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4 lg:mt-6">
                <CardHeader>
                  <CardTitle>Match Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#64748B] text-sm">Avg Match Score</span>
                      <span className="font-medium text-sm">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B] text-sm">Profile Views</span>
                      <span className="font-medium text-sm">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B] text-sm">Applications Sent</span>
                      <span className="font-medium text-sm">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748B] text-sm">Interview Requests</span>
                      <span className="font-medium text-sm">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
