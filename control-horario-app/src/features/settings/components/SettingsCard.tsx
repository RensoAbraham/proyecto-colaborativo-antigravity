'use client';

import { ReactNode } from 'react';

interface SettingsCardProps {
    title: string;
    description?: string;
    children: ReactNode;
    icon?: ReactNode;
    className?: string; // Add className prop for flexibility
}

export function SettingsCard({ title, description, children, icon, className = '' }: SettingsCardProps) {
    return (
        <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${className}`}>
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                <div className="flex items-center gap-3">
                    {icon && <div className="text-blue-600 dark:text-blue-500">{icon}</div>}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                        {description && (
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}
