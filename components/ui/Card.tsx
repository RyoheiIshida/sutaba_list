import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glassEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, glassEffect = false, ...props }, ref) => {
    const baseStyles = 'rounded-2xl transition-all duration-300';

    const effectStyles = glassEffect
      ? 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/5'
      : 'bg-white border border-gray-100 shadow-lg shadow-gray-200/50';

    const hoverStyles = hoverEffect
      ? 'hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-1'
      : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, effectStyles, hoverStyles, className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6 border-b border-gray-100/50', className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6 space-y-4', className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6 border-t border-gray-100/50 flex items-center justify-between', className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';