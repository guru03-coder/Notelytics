import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  disabled = false,
  className = '' 
}: ButtonProps) {
  const baseClasses = 'transition-all duration-[var(--duration-micro)] ease-[var(--ease-micro)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white hover:shadow-[0_0_20px_rgba(76,110,245,0.4)] backdrop-blur-[var(--blur)]',
    secondary: 'bg-[var(--card-bg)] text-[var(--text-primary)] border border-white/10 hover:border-[var(--color-primary)] hover:bg-white/10 backdrop-blur-[var(--blur)]',
    ghost: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 rounded-lg',
    md: 'px-6 py-3 rounded-xl',
    lg: 'px-8 py-4 rounded-[var(--radius-card)]'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
