"use client";

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUser: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    // Helper to handle refresh token errors safely
    const handleRefreshTokenError = useCallback(async () => {
        console.warn("Refresh token error detected - signing out to clear invalid tokens");
        await supabase.auth.signOut();
        setUser(null);
        setLoading(false);
    }, [supabase]);

    const refreshUser = useCallback(async () => {
        try {
            const { data, error } = await supabase.auth.getSession();

            if (error?.code === 'refresh_token_already_used' || error?.message?.includes('Refresh Token')) {
                await handleRefreshTokenError();
                return;
            }

            setUser(data.session?.user ?? null);
        } catch (err: any) {
            if (err?.code === 'refresh_token_already_used' || err?.message?.includes('Refresh Token')) {
                await handleRefreshTokenError();
                return;
            }
            console.error("Error refreshing user:", err);
        } finally {
            setLoading(false);
        }
    }, [supabase, handleRefreshTokenError]);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                // Should we handle strict events? 
                // For now, simple binding is best.
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        // Initial fetch
        refreshUser();

        return () => subscription.unsubscribe();
    }, [refreshUser, supabase]);

    return (
        <AuthContext.Provider value={{ user, loading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
