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
        <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                    {icon && <div className="text-blue-600">{icon}</div>}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                        {description && (
                            <p className="text-sm text-slate-500 mt-0.5">{description}</p>
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
