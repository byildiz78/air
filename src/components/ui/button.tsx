import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50';
  
  const variantClasses = {
    default: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'bg-transparent hover:bg-gray-100'
  };
  
  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-6',
    icon: 'h-10 w-10'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
