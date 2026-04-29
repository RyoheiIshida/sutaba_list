import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function SimpleButton({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: SimpleButtonProps) {
  const variants = {
    primary: 'bg-starbucks-700 hover:bg-starbucks-800 text-white',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-starbucks-600 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}