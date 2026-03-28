'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Avatar } from '@/src/components/ui/Avatar';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Header } from '@/src/components/layout/Header';
import { ProfileEditModal } from '@/src/components/profile/ProfileEditModal';
import { SkillsVerification } from '@/src/components/profile/SkillsVerification';
import { Briefcase, Users, FileText, Search, Upload, Settings, Edit, MapPin, Mail, Phone, Calendar, Award, ExternalLink, Shield, Star } from 'lucide-react';

export default function CandidateProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Define skill type
  type Skill = {
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    verified: boolean;
    verificationType?: 'certificate' | 'assessment' | 'portfolio' | 'pending';
    verificationDate?: string;
    score?: number;
    certificateUrl?: string;
  };

  // Mock profile data
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Experienced full-stack developer with a passion for creating scalable web applications. Specialized in React, Node.js, and cloud technologies.',
    experience: '5 years',
    education: 'Bachelor of Science in Computer Science',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    links: [
      { title: 'GitHub', url: 'https://github.com/johndoe' },
      { title: 'Portfolio', url: 'https://johndoe.dev' },
      { title: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' }
    ],
    experiences: [
      {
        company: 'Tech Corp',
        position: 'Senior React Developer',
        duration: 'Jan 2022 - Present',
        description: 'Leading frontend development for enterprise applications using React and TypeScript.'
      },
      {
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        duration: 'Jun 2020 - Dec 2021',
        description: 'Developed and maintained web applications using React, Node.js, and MongoDB.'
      }
    ],
    educationDetails: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        duration: '2016 - 2020',
        description: 'Graduated with honors, GPA 3.8/4.0'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2023',
        credentialId: 'AWS-DEV-123456'
      }
    ]
  });

  // Mock skills data with verification status
  const [skills, setSkills] = useState<Skill[]>([
    { name: 'React', level: 'Advanced', verified: true, verificationType: 'assessment', verificationDate: '2023-12-15', score: 92 },
    { name: 'TypeScript', level: 'Advanced', verified: true, verificationType: 'certificate', verificationDate: '2023-11-20', certificateUrl: 'https://certificate.example.com' },
    { name: 'Node.js', level: 'Intermediate', verified: false },
    { name: 'MongoDB', level: 'Intermediate', verified: true, verificationType: 'portfolio', verificationDate: '2023-10-10' },
    { name: 'AWS', level: 'Advanced', verified: true, verificationType: 'certificate', verificationDate: '2023-09-05', certificateUrl: 'https://certificate.example.com' },
    { name: 'Docker', level: 'Beginner', verified: false }
  ]);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (newData: any) => {
    setProfileData(newData);
  };

  const handleVerifySkill = (skillName: string, verificationType: string, file?: File) => {
    // Update skill to pending verification
    setSkills(prev => prev.map(skill => 
      skill.name === skillName 
        ? { ...skill, verified: false, verificationType: 'pending' }
        : skill
    ));
    
    // In a real app, this would upload to a server
    console.log(`Verifying ${skillName} with ${verificationType}`, file);
  };

  const handleTakeAssessment = (skillName: string) => {
    // This function is called when the assessment is completed and passed
    // The SkillsAssessment component will call this with the skill name
    // We need to update the actual skill verification status here
    console.log(`Assessment completed for ${skillName}`);
  };

  // Add a new function to handle assessment completion with score
  const handleAssessmentComplete = (skillName: string, score: number) => {
    setSkills(prev => prev.map(skill => 
      skill.name === skillName 
        ? { ...skill, verified: true, verificationType: 'assessment', verificationDate: new Date().toISOString().split('T')[0], score }
        : skill
    ));
    console.log(`Skill ${skillName} verified with score: ${score}%`);
  };

  // Function to add new skills from CV upload
  const handleAddSkills = (newSkills: string[]) => {
    setSkills(prev => {
      const existingSkillNames = prev.map(skill => skill.name);
      const skillsToAdd = newSkills.filter(skillName => !existingSkillNames.includes(skillName));
      
      const newSkillObjects = skillsToAdd.map(skillName => ({
        name: skillName,
        level: 'Intermediate' as const,
        verified: false,
        verificationType: undefined
      }));
      
      return [...prev, ...newSkillObjects];
    });
  };

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
                  <div className="flex justify-between items-center">
                    <CardTitle>Profile Information</CardTitle>
                    <Button onClick={handleEditProfile} className='flex items-center  justify-center'>
                      <Edit className="w-4  h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="flex items-start space-x-4">
                      <Avatar name={profileData.name} size="xl" />
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-[#1E293B]">{profileData.name}</h2>
                        <p className="text-[#0A66C2] font-medium mb-2">{profileData.experience} Experience</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{profileData.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{profileData.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{profileData.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-[#1E293B] mb-2">About</h3>
                      <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="font-medium text-[#1E293B] mb-3">Work Experience</h3>
                      <div className="space-y-4">
                        {profileData.experiences.map((exp, index) => (
                          <div key={index} className="border-l-2 border-blue-200 pl-4">
                            <h4 className="font-medium text-[#1E293B]">{exp.position}</h4>
                            <p className="text-sm text-[#0A66C2] font-medium">{exp.company}</p>
                            <p className="text-xs text-gray-500 mb-2">{exp.duration}</p>
                            <p className="text-sm text-gray-600">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="font-medium text-[#1E293B] mb-3">Education</h3>
                      <div className="space-y-4">
                        {profileData.educationDetails.map((edu, index) => (
                          <div key={index} className="border-l-2 border-purple-200 pl-4">
                            <h4 className="font-medium text-[#1E293B]">{edu.degree}</h4>
                            <p className="text-sm text-purple-600 font-medium">{edu.institution}</p>
                            <p className="text-xs text-gray-500 mb-2">{edu.duration}</p>
                            <p className="text-sm text-gray-600">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div>
                      <h3 className="font-medium text-[#1E293B] mb-3">Portfolio Links</h3>
                      <div className="flex flex-wrap gap-3">
                        {profileData.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">{link.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              {/* Skills Card */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="secondary" className="w-full flex items-center  justify-center mt-4">
                    <Shield className="w-4 h-4 mr-2" />
                    Verify Skills
                  </Button>
                </CardContent>
              </Card>

              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Overall</span>
                      <span className="text-sm font-bold text-green-600">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Basic Info</span>
                        <span className="text-green-600">✓ Complete</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Experience</span>
                        <span className="text-green-600">✓ Complete</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Education</span>
                        <span className="text-green-600">✓ Complete</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Skills Verification</span>
                        <span className="text-yellow-600">⚠ 67% Verified</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Skills Verification Section */}
          <div className="mt-8">
            <SkillsVerification
              skills={skills}
              onVerifySkill={handleVerifySkill}
              onTakeAssessment={handleAssessmentComplete}
              onAddSkills={handleAddSkills}
            />
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData}
      />
    </div>
  );
}
