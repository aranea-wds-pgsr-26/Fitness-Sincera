import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { AuthSession } from "@shared/schema";

export type AuthRole = AuthSession["role"];

export const DEMO_SESSIONS: Record<AuthRole, AuthSession> = {
  admin: {
    userId: "admin-1",
    role: "admin",
    name: "Admin Fitness Sincera",
    email: "admin@fitnesssincera.com",
    avatar: undefined,
  },
  client: {
    userId: "user-1",
    role: "client",
    name: "Lucas Bennett",
    email: "bennet02@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  nutritionist: {
    userId: "nutri-1",
    role: "nutritionist",
    name: "Dra. Sofia Almeida",
    email: "sofia.almeida@fitnesssincera.com",
    avatar: undefined,
  },
  trainer: {
    userId: "pt-1",
    role: "trainer",
    name: "Coach Ricardo",
    email: "ricardo@fitnesssincera.com",
    avatar: undefined,
  },
};

const DEMO_CREDENTIALS: Record<AuthRole, { email: string; password: string }> = {
  admin: { email: "admin@fitnesssincera.com", password: "admin123" },
  client: { email: "bennet02@gmail.com", password: "client123" },
  nutritionist: { email: "sofia.almeida@fitnesssincera.com", password: "nutritionist123" },
  trainer: { email: "ricardo@fitnesssincera.com", password: "trainer123" },
};

const STORAGE_KEY = "fs_auth_session";

interface StoredAuthState {
  session: AuthSession;
  token?: string;
}

interface AuthContextValue {
  session: AuthSession | null;
  token: string | null;
  isLoading: boolean;
  login: (role: AuthRole) => Promise<AuthSession>;
  loginWithCredentials: (email: string, password: string) => Promise<AuthSession>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function userToSession(user: {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
}): AuthSession {
  return {
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
    avatar: undefined,
  };
}

function redirectForRole(role: AuthRole) {
  if (role === "admin") return "/nutritionist/alimentos";
  if (role === "client") return "/dashboard";
  if (role === "nutritionist") return "/nutritionist/dashboard";
  return "/trainer/dashboard";
}

export function getRedirectForRole(role: AuthRole) {
  return redirectForRole(role);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as StoredAuthState | AuthSession;
        if ("session" in stored) {
          setSession(stored.session);
          setToken(stored.token ?? null);
        } else {
          setSession(stored);
          setToken(null);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistAuth = useCallback((nextSession: AuthSession, nextToken?: string) => {
    setSession(nextSession);
    setToken(nextToken ?? null);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        session: nextSession,
        token: nextToken,
      } satisfies StoredAuthState)
    );
  }, []);

  const loginWithCredentials = useCallback(
    async (email: string, password: string) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.message ?? "Nao foi possivel entrar.");
      }

      const nextSession = userToSession(body.user);
      persistAuth(nextSession, body.token);
      return nextSession;
    },
    [persistAuth]
  );

  const login = useCallback(
    async (role: AuthRole) => {
      const credentials = DEMO_CREDENTIALS[role];

      try {
        return await loginWithCredentials(credentials.email, credentials.password);
      } catch {
        const demoSession = DEMO_SESSIONS[role];
        persistAuth(demoSession);
        return demoSession;
      }
    },
    [loginWithCredentials, persistAuth]
  );

  const logout = useCallback(() => {
    setSession(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ session, token, isLoading, login, loginWithCredentials, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
