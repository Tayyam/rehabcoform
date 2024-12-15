export type UserRole = 'admin' | 'operator';
export type UserGender = 'male' | 'female';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  gender: UserGender;
  password: string;
  createdAt: string;
  createdBy: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}