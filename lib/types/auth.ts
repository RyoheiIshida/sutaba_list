export type UserRole = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}
