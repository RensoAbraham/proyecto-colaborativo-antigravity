'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // 1. Mark as mounted to enable DOM updates
        setMounted(true);

        // 2. Check localStorage on mount
        const savedTheme = localStorage.getItem('timemaster_settings');
        if (savedTheme) {
            try {
                const settings = JSON.parse(savedTheme);
                const pref = settings.preferences?.theme || settings.theme;
                if (pref === 'dark') {
                    setTheme('dark');
                    return;
                } else if (pref === 'light') {
                    setTheme('light');
                    return;
                }
            } catch (e) {
                console.error("Failed to parse theme settings", e);
            }
        }

        // 3. Fallback to system preference or existing class
        if (window.matchMedia('(prefers-color-scheme: dark)').matches || document.documentElement.classList.contains('dark')) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        if (!mounted) return; // Prevent overwriting DOM before hydration/check

        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);

        // Save to localStorage conserving structure
        try {
            const saved = localStorage.getItem('timemaster_settings');
            let settings = saved ? JSON.parse(saved) : { preferences: {} };

            if (!settings.preferences) settings.preferences = {};

            settings.preferences.theme = theme;
            localStorage.setItem('timemaster_settings', JSON.stringify(settings));
        } catch (e) {
            console.error("Failed to save theme settings", e);
        }

    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
