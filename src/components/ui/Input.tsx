import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:border-transparent transition-all duration-200';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-[#64748B]">
          {label}
        </label>
      )}
      <input
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
