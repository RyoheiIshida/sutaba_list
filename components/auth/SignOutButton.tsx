'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';

interface SignOutButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SignOutButton({
  variant = 'ghost',
  size = 'md',
  className = '',
}: SignOutButtonProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignOut}
      className={className}
    >
      <LogOut className="w-4 h-4 mr-2" />
      ログアウト
    </Button>
  );
}
