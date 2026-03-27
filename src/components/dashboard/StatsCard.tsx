import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'error';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = 'primary',
  trend,
  className = ''
}) => {
  const colorClasses = {
    primary: 'text-[#0A66C2]',
    success: 'text-[#10B981]',
    warning: 'text-[#F59E0B]',
    error: 'text-[#EF4444]'
  };

  const getTrendIcon = (direction: 'up' | 'down') => {
    return direction === 'up' ? <TrendingUp className="w-3 h-3 sm:w-4 h-4" /> : <TrendingDown className="w-3 h-3 sm:w-4 h-4" />;
  };

  const getTrendColor = (direction: 'up' | 'down') => {
    return direction === 'up' ? 'text-[#10B981]' : 'text-[#EF4444]';
  };

  return (
    <Card className={`text-center ${className}`}>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        {icon && (
          <div className="flex justify-center mb-2 lg:mb-3">
            {icon}
          </div>
        )}
        
        <div className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 ${colorClasses[color]}`}>
          {value}
        </div>
        
        <h3 className="text-xs sm:text-sm font-medium text-[#64748B] mb-1">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-xs text-[#64748B]">
            {subtitle}
          </p>
        )}
        
        {trend && (
          <div className={`flex items-center justify-center space-x-1 mt-2 text-xs sm:text-sm ${getTrendColor(trend.direction)}`}>
            {getTrendIcon(trend.direction)}
            <span>{trend.value}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
