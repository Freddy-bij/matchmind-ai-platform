'use client';

import React, { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { CheckCircle, AlertCircle, Clock, Upload, FileText, ExternalLink, Star, Award, Shield, Play } from 'lucide-react';
import { SkillsAssessment } from './SkillsAssessment';

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  verified: boolean;
  verificationType?: 'certificate' | 'assessment' | 'portfolio' | 'pending';
  verificationDate?: string;
  score?: number;
  certificateUrl?: string;
}

interface SkillsVerificationProps {
  skills: Skill[];
  onVerifySkill: (skillName: string, verificationType: string, file?: File) => void;
  onTakeAssessment: (skillName: string, score: number) => void;
  onAddSkills: (newSkills: string[]) => void;
}

export const SkillsVerification: React.FC<SkillsVerificationProps> = ({
  skills,
  onVerifySkill,
  onTakeAssessment,
  onAddSkills
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentSkill, setAssessmentSkill] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Expert': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationIcon = (skill: Skill) => {
    if (!skill.verified) {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
    
    switch (skill.verificationType) {
      case 'certificate':
        return <Award className="w-4 h-4 text-green-500" />;
      case 'assessment':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'portfolio':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const getVerificationText = (skill: Skill) => {
    if (!skill.verified) {
      return 'Not Verified';
    }
    
    switch (skill.verificationType) {
      case 'certificate':
        return 'Certificate Verified';
      case 'assessment':
        return skill.score ? `Assessment: ${skill.score}%` : 'Assessment Verified';
      case 'portfolio':
        return 'Portfolio Verified';
      case 'pending':
        return 'Verification Pending';
      default:
        return 'Verified';
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log('Files from input:', files);
    if (files && files.length > 0) {
      const file = files[0];
      console.log('File selected:', file);
      console.log('File name:', file.name);
      console.log('File size:', file.size);
      console.log('File type:', file.type);
      setUploadedFile(file);
      console.log('File set in state successfully');
    } else {
      console.log('No files selected');
    }
  };

  const handleChooseFile = () => {
    // Programmatically trigger file input click
    const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    } else {
      console.error('File input not found');
    }
  };

  const handleCVUpload = async () => {
    console.log('Upload clicked, uploadedFile:', uploadedFile);
    if (!uploadedFile) {
      console.log('No file to upload');
      return;
    }
    
    setIsProcessing(true);
    console.log('Starting processing for:', uploadedFile.name);
    
    try {
      // Simulate CV processing and skill extraction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate extracted skills from CV
      const extractedSkills = [
        'JavaScript', 'CSS', 'HTML', 'Git', 'REST API', // These should be new
        'Python', 'Java', 'SQL', 'GraphQL', 'Django' // Additional new skills
      ];
      
      // In a real app, this would call an API to extract skills
      console.log('CV processed and skills extracted:', extractedSkills);
      console.log('File uploaded:', uploadedFile.name);
      
      // Add the extracted skills to the skills list
      console.log('Calling onAddSkills with extracted skills:', extractedSkills);
      onAddSkills(extractedSkills);
      console.log('onAddSkills called successfully');
      
      // Show success message
      alert(`Successfully processed your CV! Found ${extractedSkills.length} skills: ${extractedSkills.join(', ')}. These skills have been added to your profile.`);
      
      setUploadedFile(null);
    } catch (error) {
      console.error('Error processing CV:', error);
      alert('Error processing CV. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTakeAssessment = (skillName: string) => {
    setAssessmentSkill(skillName);
    setShowAssessment(true);
  };

  const handleAssessmentComplete = (score: number, passed: boolean) => {
    console.log('Assessment completed:', { score, passed, skill: assessmentSkill });
    if (assessmentSkill && passed) {
      onTakeAssessment(assessmentSkill, score);
    }
    setShowAssessment(false);
    setAssessmentSkill(null);
  };

  const handleAssessmentCancel = () => {
    setShowAssessment(false);
    setAssessmentSkill(null);
  };

  if (showAssessment && assessmentSkill) {
    return (
      <SkillsAssessment
        skillName={assessmentSkill}
        onComplete={handleAssessmentComplete}
        onCancel={handleAssessmentCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Skills Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Skills Verification</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={skill.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getVerificationIcon(skill)}
                    <div>
                      <h4 className="font-medium text-[#1E293B]">{skill.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" size="sm" className={getLevelColor(skill.level)}>
                          {skill.level}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {getVerificationText(skill)}
                        </span>
                        {skill.verificationDate && (
                          <span className="text-xs text-gray-400">
                            Verified: {skill.verificationDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {skill.verified && skill.certificateUrl && (
                    <Button variant="secondary" size="sm" className='flex items-center  justify-center'>
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Certificate
                    </Button>
                  )}
                  {!skill.verified && (
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleTakeAssessment(skill.name)}
                      className='flex items-center  justify-center'
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Take Test
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CV Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload CV for Skill Extraction</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">Upload your CV to automatically extract and verify skills</p>
            <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX (Max 5MB)</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="cv-upload"
            />
            <div className='flex justify-center mb-4'>
              <Button 
                variant="secondary" 
                onClick={handleChooseFile}
                className="flex items-center justify-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
            
            {uploadedFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600 mb-3">
                  ✅ Selected: {uploadedFile.name}
                </p>
                <p className="text-xs text-green-500 mb-3">
                  Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <p className="text-xs text-green-500 mb-3">
                  Type: {uploadedFile.type}
                </p>
                <div className='flex justify-center'>
                  <Button 
                    onClick={handleCVUpload} 
                    disabled={!uploadedFile || isProcessing}
                    className="flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload and Extract Skills
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            {!uploadedFile && (
              <p className="text-xs text-gray-400 mt-2">
                No file selected. Click "Choose File" to select your CV.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Verification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Verified Skills</p>
                <p className="text-xl font-bold text-gray-900">
                  {skills.filter(skill => skill.verified).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Verification</p>
                <p className="text-xl font-bold text-gray-900">
                  {skills.filter(skill => !skill.verified).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-xl font-bold text-gray-900">
                  {Math.round((skills.filter(skill => skill.verified).length / skills.length) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
