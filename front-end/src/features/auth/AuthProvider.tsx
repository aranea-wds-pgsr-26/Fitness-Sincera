import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { AuthSession } from "@shared/schema";

export type AuthRole = AuthSession["role"];

// ─── Demo sessions (no real backend auth yet — Sprint 1 stub) ─────────────────
// In Sprint 2 this will be replaced by a real POST /api/auth/login call.

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

const STORAGE_KEY = "fs_auth_session";

// ─── Context ──────────────────────────────────────────────────────────────────

interface AuthContextValue {
    session: AuthSession | null;
    isLoading: boolean;
    login: (role: AuthRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<AuthSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setSession(JSON.parse(raw) as AuthSession);
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback((role: AuthRole) => {
        const newSession = DEMO_SESSIONS[role];
        setSession(newSession);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    }, []);

    const logout = useCallback(() => {
        setSession(null);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return (
        <AuthContext.Provider value={{ session, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
