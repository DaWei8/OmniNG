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

    const refreshUser = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
    }, []);

    useEffect(() => {
        refreshUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                // Determine user state from session
                if (session?.user) {
                    setUser(session.user);
                } else {
                    setUser(null);
                }
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
