import { createContext, useContext, useState, useMemo, type ReactNode, useEffect } from 'react';
import type { User } from '../types/api.js';
import { ensureUser } from '../api/client.js';

interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      const stored = localStorage.getItem('calendar-user');
      if (stored) {
        setUser(JSON.parse(stored));
        return;
      }
      const defaultUser = await ensureUser({ email: 'demo@example.com', name: 'Demo User' });
      localStorage.setItem('calendar-user', JSON.stringify(defaultUser));
      setUser(defaultUser);
    };

    void bootstrap();
  }, []);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
