import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm',
              'focus:outline-none focus:ring-2 focus:ring-green-700/50 focus:border-green-700',
              'transition-all duration-200 hover:border-gray-300',
              error && 'border-red-300 focus:ring-red-500/50 focus:border-red-500 hover:border-red-300',
              icon && 'pl-12',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';