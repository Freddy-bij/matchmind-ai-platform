'use client';

import React, { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Avatar } from '@/src/components/ui/Avatar';
import { X, Plus, Trash2, Upload, Link as LinkIcon, Briefcase, GraduationCap, Award, Check, AlertCircle } from 'lucide-react';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: any) => void;
  initialData?: any;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    location: initialData?.location || '',
    bio: initialData?.bio || '',
    experience: initialData?.experience || '',
    education: initialData?.education || '',
    skills: initialData?.skills || [],
    links: initialData?.links || [],
    experiences: initialData?.experiences || [],
    educationDetails: initialData?.educationDetails || [],
    certifications: initialData?.certifications || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    duration: '',
    description: ''
  });
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    duration: '',
    description: ''
  });
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    credentialId: ''
  });

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'links', label: 'Links', icon: LinkIcon },
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, { ...newLink }]
      }));
      setNewLink({ title: '', url: '' });
    }
  };

  const handleRemoveLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const handleAddExperience = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      setFormData(prev => ({
        ...prev,
        experiences: [...prev.experiences, { ...newExperience }]
      }));
      setNewExperience({ company: '', position: '', duration: '', description: '' });
    }
  };

  const handleRemoveExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  const handleAddEducation = () => {
    if (newEducation.institution.trim() && newEducation.degree.trim()) {
      setFormData(prev => ({
        ...prev,
        educationDetails: [...prev.educationDetails, { ...newEducation }]
      }));
      setNewEducation({ institution: '', degree: '', duration: '', description: '' });
    }
  };

  const handleRemoveEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      educationDetails: prev.educationDetails.filter((_, i) => i !== index)
    }));
  };

  const handleAddCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, { ...newCertification }]
      }));
      setNewCertification({ name: '', issuer: '', date: '', credentialId: '' });
    }
  };

  const handleRemoveCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#1E293B]">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#0A66C2] border-b-2 border-[#0A66C2] bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                >
                  <option value="">Select experience level</option>
                  <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                  <option value="Mid Level (2-5 years)">Mid Level (2-5 years)</option>
                  <option value="Senior Level (5-10 years)">Senior Level (5-10 years)</option>
                  <option value="Expert Level (10+ years)">Expert Level (10+ years)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Work Experience</h3>
                <div className="space-y-4">
                  {formData.experiences.map((exp: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-[#1E293B]">{exp.position}</h4>
                            <p className="text-sm text-gray-600">{exp.company}</p>
                            <p className="text-xs text-gray-500">{exp.duration}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveExperience(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-700">{exp.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Add New Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Position"
                        value={newExperience.position}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      value={newExperience.duration}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                    />
                    <textarea
                      rows={3}
                      placeholder="Job description and responsibilities..."
                      value={newExperience.description}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                    />
                    <Button onClick={handleAddExperience} className=" flex items-center  justify-center w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Education</h3>
                <div className="space-y-4">
                  {formData.educationDetails.map((edu: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-[#1E293B]">{edu.degree}</h4>
                            <p className="text-sm text-gray-600">{edu.institution}</p>
                            <p className="text-xs text-gray-500">{edu.duration}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveEducation(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-700">{edu.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Add New Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                      />
                      <input
                        type="text"
                        placeholder="Institution"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Duration (e.g., 2016 - 2020)"
                      value={newEducation.duration}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                    />
                    <textarea
                      rows={3}
                      placeholder="Education details and achievements..."
                      value={newEducation.description}
                      onChange={(e) => setNewEducation(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                    />
                    <Button onClick={handleAddEducation} className=" flex items-center  justify-center w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Skills & Certifications</h3>
                
                {/* Skills Section */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                      />
                      <Button onClick={handleAddSkill}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-4">
                      {formData.certifications.map((cert: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-[#1E293B]">{cert.name}</h4>
                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                            <p className="text-xs text-gray-500">{cert.date}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveCertification(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Certification name"
                          value={newCertification.name}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                        />
                        <input
                          type="text"
                          placeholder="Issuing organization"
                          value={newCertification.issuer}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Date (e.g., Jan 2023)"
                          value={newCertification.date}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                        />
                        <input
                          type="text"
                          placeholder="Credential ID (optional)"
                          value={newCertification.credentialId}
                          onChange={(e) => setNewCertification(prev => ({ ...prev, credentialId: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                        />
                      </div>
                      <Button onClick={handleAddCertification} className=" flex items-center  justify-center w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'links' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Portfolio Links</h3>
                <div className="space-y-4">
                  {formData.links.map((link: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <LinkIcon className="w-5 h-5 text-gray-500" />
                            <div>
                              <h4 className="font-medium text-[#1E293B]">{link.title}</h4>
                              <p className="text-sm text-blue-600">{link.url}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveLink(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Add New Link</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Link title (e.g., GitHub, Portfolio)"
                      value={newLink.title}
                      onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                    />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={newLink.url}
                      onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                    />
                    <Button onClick={handleAddLink} className=" flex items-center  justify-center w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
