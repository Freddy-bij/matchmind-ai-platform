import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = ''
}) => {
  const variantClasses = {
    primary: 'bg-[#0A66C2] text-white',
    secondary: 'bg-gray-200 text-gray-800',
    success: 'bg-[#10B981] text-white',
    warning: 'bg-[#F59E0B] text-white',
    error: 'bg-[#EF4444] text-white',
    info: 'bg-blue-100 text-blue-800'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};
