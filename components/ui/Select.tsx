import { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, icon, ...props }, ref) => {
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
          <select
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm',
              'focus:outline-none focus:ring-2 focus:ring-green-700/50 focus:border-green-700',
              'transition-all duration-200 hover:border-gray-300 appearance-none',
              'bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%2300704A%22%20d%3D%22M7%207l3%203%203-3%22%2F%3E%3C%2Fsvg%3E\")] bg-no-repeat bg-[right_1rem_center]',
              error && 'border-red-300 focus:ring-red-500/50 focus:border-red-500 hover:border-red-300',
              icon && 'pl-12 pr-12',
              className
            )}
            {...props}
          >
            <option value="">選択してください</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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

Select.displayName = 'Select';