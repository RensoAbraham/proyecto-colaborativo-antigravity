'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "p-2 rounded-lg transition-colors duration-200",
                "hover:bg-slate-200 dark:hover:bg-slate-800",
                "text-slate-600 dark:text-slate-400",
                className
            )}
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}
