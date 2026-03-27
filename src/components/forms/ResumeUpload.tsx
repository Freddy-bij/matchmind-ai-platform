import React, { useState, useRef } from 'react';
import { Resume } from '@/src/types';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { LoadingSpinner } from '@/src/components/ui/LoadingSpinner';

interface ResumeUploadProps {
  onUpload: (resume: Partial<Resume>) => Promise<void>;
  onParsingComplete?: (parsedData: any) => void;
  isLoading?: boolean;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  onUpload,
  onParsingComplete,
  isLoading = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files.find(f => f.type === 'application/pdf' || f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    
    if (file) {
      handleFileSelect(file);
    } else {
      setError('Please upload a PDF or DOCX file');
    }
  };

  const handleFileSelect = (file: File) => {
    setError('');
    setUploadedFile(file);
    setParsedData(null);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    setError('');
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Start AI parsing
      setIsParsing(true);
      
      // Simulate AI parsing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockParsedData = {
        name: 'John Doe',
        email: 'john.doe@email.com',
        skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
        experience: '4 years of software development experience',
        education: 'Bachelor of Science in Computer Science'
      };
      
      setParsedData(mockParsedData);
      onParsingComplete?.(mockParsedData);
      
      await onUpload({
        fileName: uploadedFile.name,
        fileUrl: `https://storage.example.com/resumes/${uploadedFile.name}`,
        parsedData: mockParsedData,
        uploadedAt: new Date().toISOString()
      });
      
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setIsParsing(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setParsedData(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Resume</CardTitle>
      </CardHeader>
      <CardContent>
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging 
                ? 'border-[#0A66C2] bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-4xl mb-4">📄</div>
            <p className="text-[#64748B] mb-4">
              Drag and drop your resume here, or click to browse
            </p>
            <p className="text-sm text-[#64748B] mb-4">
              Supported formats: PDF, DOCX (Max 5MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileInput}
              className="hidden"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose File
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📄</span>
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-[#64748B]">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={handleRemoveFile}
                disabled={isUploading || isParsing}
              >
                Remove
              </Button>
            </div>
            
            {isUploading && (
              <div className="text-center py-4">
                <LoadingSpinner size="md" className="mx-auto mb-2" />
                <p className="text-[#64748B]">Uploading resume...</p>
              </div>
            )}
            
            {isParsing && (
              <div className="text-center py-4">
                <LoadingSpinner size="md" className="mx-auto mb-2" />
                <p className="text-[#64748B]">🤖 AI is parsing your resume...</p>
                <p className="text-sm text-[#64748B]">This may take a few seconds</p>
              </div>
            )}
            
            {parsedData && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">✅ Resume Parsed Successfully</h4>
                <div className="space-y-1 text-sm text-green-800">
                  <p><strong>Name:</strong> {parsedData.name}</p>
                  <p><strong>Email:</strong> {parsedData.email}</p>
                  <p><strong>Skills:</strong> {parsedData.skills.join(', ')}</p>
                  <p><strong>Experience:</strong> {parsedData.experience}</p>
                  <p><strong>Education:</strong> {parsedData.education}</p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}
            
            {!isUploading && !isParsing && (
              <Button
                onClick={handleUpload}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  'Upload & Parse Resume'
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
