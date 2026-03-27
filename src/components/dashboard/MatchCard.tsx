import React from 'react';
import { MatchResult } from '@/src/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { MatchScore } from '@/src/components/ui/MatchScore';

interface MatchCardProps {
  match: MatchResult;
  candidateName?: string;
  jobTitle?: string;
  onViewDetails?: (matchId: string) => void;
  showCandidateInfo?: boolean;
  showJobInfo?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  candidateName,
  jobTitle,
  onViewDetails,
  showCandidateInfo = true,
  showJobInfo = true
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                {showCandidateInfo && candidateName && (
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-1">
                    {candidateName}
                  </h3>
                )}
                {showJobInfo && jobTitle && (
                  <p className="text-[#0A66C2] font-medium">{jobTitle}</p>
                )}
              </div>
              
              <Badge 
                variant={match.matchScore >= 80 ? 'success' : match.matchScore >= 60 ? 'warning' : 'error'}
                size="sm"
              >
                {match.matchScore >= 80 ? 'Great Match' : match.matchScore >= 60 ? 'Good Match' : 'Fair Match'}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {match.aiExplanation && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Why this match:</strong> {match.aiExplanation}
                  </p>
                </div>
              )}
              
              {match.strengths.length > 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Strengths:</strong> {match.strengths.join(', ')}
                  </p>
                </div>
              )}
              
              {match.skillGap.length > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Skill gaps:</strong> {match.skillGap.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="ml-6">
            <MatchScore score={match.matchScore} size="md" />
          </div>
        </div>
        
        {onViewDetails && (
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => onViewDetails(match.candidateId)}
              className="text-[#0A66C2] font-medium hover:underline text-sm"
            >
              View Full Match Analysis
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
