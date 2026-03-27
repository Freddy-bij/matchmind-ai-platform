import React, { useState } from 'react';
import { JobFormData } from '@/src/types';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { LoadingSpinner } from '@/src/components/ui/LoadingSpinner';

interface JobPostFormProps {
  onSubmit: (data: JobFormData) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<JobFormData>;
  isLoading?: boolean;
}

export const JobPostForm: React.FC<JobPostFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    requirements: initialData?.requirements || [],
    location: initialData?.location || ''
  });
  
  const [newRequirement, setNewRequirement] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    keySkills: string[];
    experienceLevel: string;
    estimatedSalary?: string;
  } | null>(null);

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleAnalyzeJob = async () => {
    if (!formData.description) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAiAnalysis({
        keySkills: ['React', 'TypeScript', 'Node.js'],
        experienceLevel: 'Mid-Senior Level',
        estimatedSalary: '$80,000 - $120,000'
      });
    } catch (error) {
      console.error('AI Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Job Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Senior React Developer"
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-2">
              Job Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all duration-200 min-h-[120px]"
              required
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleAnalyzeJob}
              disabled={!formData.description || isAnalyzing}
              className="mt-2"
            >
              {isAnalyzing ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Analyzing...
                </>
              ) : (
                '🤖 AI Analyze Description'
              )}
            </Button>
          </div>
          
          {aiAnalysis && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="font-medium text-blue-900 mb-2">AI Analysis Results</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong>Key Skills:</strong> {aiAnalysis.keySkills.join(', ')}</p>
                <p><strong>Experience Level:</strong> {aiAnalysis.experienceLevel}</p>
                {aiAnalysis.estimatedSalary && (
                  <p><strong>Estimated Salary:</strong> {aiAnalysis.estimatedSalary}</p>
                )}
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    requirements: [...new Set([...prev.requirements, ...aiAnalysis.keySkills])]
                  }));
                }}
                className="mt-2"
              >
                Add AI Skills to Requirements
              </Button>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-2">
              Requirements
            </label>
            <div className="flex space-x-2 mb-3">
              <Input
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                placeholder="Add a requirement (e.g. React, 3+ years experience)"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddRequirement}
                disabled={!newRequirement.trim()}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.requirements.map((req, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-[#E8F0FE] text-[#0A66C2] rounded-full text-sm"
                >
                  {req}
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    className="ml-2 text-[#0A66C2] hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="e.g. San Francisco, CA or Remote"
            required
          />
          
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Posting Job...
                </>
              ) : (
                'Post Job'
              )}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
