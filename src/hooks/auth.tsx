import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';

interface SigninCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  username: string;
  email: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface AuthContextData {
  user: User;
  signup(credentials: SignupCredentials, remember?: boolean): Promise<void>;
  signin(credentials: SigninCredentials, remember?: boolean): Promise<void>;
  signout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@home.io:user');
    const token = localStorage.getItem('@home.io:token');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { user: JSON.parse(user), token };
    }

    return {} as AuthState;
  });

  const signup = useCallback(
    async ({ username, email, password }, remember = false) => {
      const response = await api.post<AuthState>('/users/signup', {
        username,
        email,
        password,
      });

      const { user, token } = response.data;

      if (remember) {
        localStorage.setItem('@home.io:user', JSON.stringify(user));
        localStorage.setItem('@home.io:token', token);
      }

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ user, token });
    },
    [],
  );

  const signin = useCallback(async ({ email, password }, remember = false) => {
    const response = await api.post<AuthState>('/users/signin', {
      email,
      password,
    });

    const { user, token } = response.data;

    if (remember) {
      localStorage.setItem('@home.io:user', JSON.stringify(user));
      localStorage.setItem('@home.io:token', token);
    }

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem('@home.io:user');
    localStorage.removeItem('@home.io:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
