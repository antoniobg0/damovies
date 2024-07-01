import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type Auth = {
  username: string;
};

type AuthContextType = {
  session?: Auth;
};

const AuthContext = createContext<AuthContextType>({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Auth>();

  // The idea of this context is to fetch user information, however the process to get account_id from tmdb is
  // quite time wasting.

  const value = useMemo(() => ({}), []);

  return (
    <AuthContext.Provider value={value}>
      <div className="relative flex-1">{children}</div>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
