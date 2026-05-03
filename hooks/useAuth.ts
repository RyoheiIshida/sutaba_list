'use client';

import { useSession } from 'next-auth/react';
import { UserRole } from '@/lib/types/auth';

export function useAuth() {
  const { data: session, status } = useSession();

  const user = session?.user as any;
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const isAdmin = user?.role === 'admin';

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    session,
  };
}
