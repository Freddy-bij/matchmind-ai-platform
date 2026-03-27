import React from 'react';
import { User, Application } from '@/src/types';
import { Button } from '@/src/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { MatchScore } from '@/src/components/ui/MatchScore';
import { Avatar } from '@/src/components/ui/Avatar';

interface CandidateCardProps {
  candidate: User;
  matchScore: number;
  applicationStatus?: Application['status'];
  aiExplanation?: string;
  skillGap?: string[];
  onViewProfile?: (candidateId: string) => void;
  onMessage?: (candidateId: string) => void;
  onScheduleInterview?: (candidateId: string) => void;
  showActions?: boolean;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  matchScore,
  applicationStatus,
  aiExplanation,
  skillGap = [],
  onViewProfile,
  onMessage,
  onScheduleInterview,
  showActions = true
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'interview':
        return 'info';
      case 'pending':
        return 'warning';
      case 'reviewing':
        return 'secondary';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4 flex-1">
            <Avatar name={candidate.name} size="lg" />
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-[#1E293B]">
                  {candidate.name}
                </h3>
                {applicationStatus && (
                  <Badge variant={getStatusColor(applicationStatus)} size="sm">
                    {applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1)}
                  </Badge>
                )}
              </div>
              
              <p className="text-[#64748B] mb-3">{candidate.email}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {candidate.skills?.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="secondary" size="sm">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills && candidate.skills.length > 4 && (
                  <Badge variant="secondary" size="sm">
                    +{candidate.skills.length - 4} more
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-[#64748B]">
                {candidate.experience && (
                  <span>💼 {candidate.experience}</span>
                )}
                {candidate.education && (
                  <span>🎓 {candidate.education}</span>
                )}
              </div>
              
              {aiExplanation && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Why this match:</strong> {aiExplanation}
                  </p>
                </div>
              )}
              
              {skillGap.length > 0 && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Skill gaps:</strong> {skillGap.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="ml-6">
            <MatchScore score={matchScore} size="md" />
          </div>
        </div>
        
        {showActions && (
          <div className="flex space-x-2 mt-4">
            <Button variant="primary" size="sm" onClick={() => onViewProfile?.(candidate.id)}>
              View Profile
            </Button>
            <Button variant="secondary" size="sm" onClick={() => onMessage?.(candidate.id)}>
              Message
            </Button>
            <Button 
              variant="accent" 
              size="sm" 
              onClick={() => onScheduleInterview?.(candidate.id)}
              disabled={applicationStatus === 'rejected'}
            >
              Schedule Interview
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
