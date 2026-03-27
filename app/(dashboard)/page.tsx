'use client';

import React from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { StatsCard } from '@/src/components/dashboard/StatsCard';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  TrendingUp, 
  Search,
  FileText,
  Settings
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Redirect to appropriate dashboard based on user role
    if (user.role === 'recruiter') {
      router.push('/recruiter');
    } else if (user.role === 'candidate') {
      router.push('/candidate');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
            {user?.role === 'recruiter' 
              ? 'Find the perfect candidates for your open positions' 
              : 'Discover your dream job opportunities'
            }
          </p>
        </div>

        {/* Stats Grid - Mobile First */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {user?.role === 'recruiter' ? (
            <>
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
                title="Interviews Scheduled"
                value="18"
                icon={<Calendar className="w-5 h-5 sm:w-6 h-6" />}
                subtitle="This week"
                trend={{ value: 25, direction: 'up' }}
              />
              <StatsCard
                title="Avg Match Score"
                value="82%"
                icon={<TrendingUp className="w-5 h-5 sm:w-6 h-6" />}
                subtitle="Across all candidates"
                color="success"
              />
            </>
          ) : (
            <>
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
                title="Profile Completion"
                value="75%"
                icon={<Users className="w-5 h-5 sm:w-6 h-6" />}
                subtitle="Add more skills for better matches"
                color="warning"
              />
              <StatsCard
                title="Avg Match Score"
                value="78%"
                icon={<TrendingUp className="w-5 h-5 sm:w-6 h-6" />}
                subtitle="Above industry average"
                color="success"
              />
            </>
          )}
        </div>

        {/* Content Grid - Mobile First */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {user?.role === 'recruiter' ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-green-50 rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <p className="text-sm text-green-800 font-medium">New Application</p>
                        <p className="text-xs text-green-600">Senior React Developer - Tech Corp</p>
                      </div>
                      <span className="text-green-600 text-sm">2 min ago</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-blue-50 rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <p className="text-sm text-blue-800 font-medium">Interview Scheduled</p>
                        <p className="text-xs text-blue-600">Jane Doe - Frontend Developer</p>
                      </div>
                      <span className="text-blue-600 text-sm">1 hour ago</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-purple-50 rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <p className="text-sm text-purple-800 font-medium">Job Posted</p>
                        <p className="text-xs text-purple-600">Full Stack Engineer - StartupXYZ</p>
                      </div>
                      <span className="text-purple-600 text-sm">3 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="primary">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Post New Job
                    </Button>
                    <Button className="w-full justify-start" variant="secondary">
                      <Search className="w-4 h-4 mr-2" />
                      Search Candidates
                    </Button>
                    <Button className="w-full justify-start" variant="secondary">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-green-50 rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <p className="text-sm text-green-800 font-medium">Application Viewed</p>
                        <p className="text-xs text-green-600">Senior React Developer - Tech Corp</p>
                      </div>
                      <span className="text-green-600 text-sm">1 day ago</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-blue-50 rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <p className="text-sm text-blue-800 font-medium">Profile Matched</p>
                        <p className="text-xs text-blue-600">Full Stack Engineer - StartupXYZ</p>
                      </div>
                      <span className="text-blue-600 text-sm">2 days ago</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-purple-50 rounded-lg space-y-2 sm:space-y-0">
                      <div>
                        <p className="text-sm text-purple-800 font-medium">New Match</p>
                        <p className="text-xs text-purple-600">Frontend Developer - Design Studio</p>
                      </div>
                      <span className="text-purple-600 text-sm">3 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="primary">
                      <Search className="w-4 h-4 mr-2" />
                      Browse Jobs
                    </Button>
                    <Button className="w-full justify-start" variant="secondary">
                      <FileText className="w-4 h-4 mr-2" />
                      Update Resume
                    </Button>
                    <Button className="w-full justify-start" variant="secondary">
                      <Settings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="text-center mt-6 sm:mt-8 px-4">
          <p className="text-sm text-gray-500">
            {user?.role === 'recruiter' 
              ? 'Need help? Check out our recruiting guide'
              : 'Looking for more opportunities? Update your skills for better matches'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
