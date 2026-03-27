import React from 'react';

interface MatchScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const MatchScore: React.FC<MatchScoreProps> = ({ 
  score, 
  size = 'md', 
  showLabel = true,
  className = ''
}) => {
  const sizeConfig = {
    sm: { width: 40, height: 40, strokeWidth: 6, fontSize: 'text-sm' },
    md: { width: 80, height: 80, strokeWidth: 8, fontSize: 'text-lg' },
    lg: { width: 120, height: 120, strokeWidth: 12, fontSize: 'text-2xl' }
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * (config.width / 2);
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: config.width, height: config.height }}>
        <svg 
          className="transform -rotate-90" 
          width={config.width} 
          height={config.height}
        >
          <circle
            cx={config.width / 2}
            cy={config.height / 2}
            r={config.width / 2}
            stroke="#E5E7EB"
            strokeWidth={config.strokeWidth}
            fill="none"
          />
          <circle
            cx={config.width / 2}
            cy={config.height / 2}
            r={config.width / 2}
            stroke={scoreColor}
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${config.fontSize}`} style={{ color: scoreColor }}>
            {score}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-xs text-[#64748B] mt-1">Match Score</span>
      )}
    </div>
  );
};
