import React from 'react';
import { Job } from '@/src/types';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { MatchScore } from '@/src/components/ui/MatchScore';

interface JobCardProps {
  job: Job;
  matchScore?: number;
  onApply?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  onView?: (jobId: string) => void;
  isSaved?: boolean;
  isApplied?: boolean;
  showMatchScore?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  matchScore,
  onApply,
  onSave,
  onView,
  isSaved = false,
  isApplied = false,
  showMatchScore = true
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'closed':
        return 'error';
      case 'filled':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-[#1E293B] mb-1">
                  {job.title}
                </h3>
                <p className="text-[#0A66C2] font-medium mb-2">{job.company}</p>
              </div>
              <div className="flex items-center space-x-2">
                {job.status && (
                  <Badge variant={getStatusColor(job.status)} size="sm">
                    {job.status}
                  </Badge>
                )}
                {isApplied && (
                  <Badge variant="info" size="sm">
                    Applied
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-[#64748B] mb-3 line-clamp-2">{job.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {job.requirements.slice(0, 3).map((req, index) => (
                <Badge key={index} variant="secondary" size="sm">
                  {req}
                </Badge>
              ))}
              {job.requirements.length > 3 && (
                <Badge variant="secondary" size="sm">
                  +{job.requirements.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-[#64748B]">
              <span>📍 {job.location}</span>
              <span>Posted: {job.postedDate}</span>
            </div>
          </div>
          
          {showMatchScore && matchScore && (
            <div className="ml-6">
              <MatchScore score={matchScore} size="md" />
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Button variant="primary" size="sm" onClick={() => onApply?.(job.id)}>
            {isApplied ? 'View Application' : 'Apply Now'}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onSave?.(job.id)}>
            {isSaved ? 'Saved' : 'Save Job'}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onView?.(job.id)}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
