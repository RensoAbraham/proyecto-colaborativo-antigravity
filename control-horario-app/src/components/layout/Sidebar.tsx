'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Clock, BarChart3, Users, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { ThemeToggle } from '../ui/ThemeToggle';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Historial', href: '/dashboard/history', icon: Clock },
    { name: 'Reportes', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    // "Premium" design: Dark, subtle borders, clean typography
    return (
        <div className="flex h-full w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xl transition-colors duration-200">
            <div className="flex h-16 items-center px-6">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-500 mr-2" />
                <span className="text-xl font-bold tracking-tight">TimeMaster</span>
            </div>

            <div className="flex-1 flex flex-col gap-1 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-4 w-full justify-between">
                    <span className="text-sm text-slate-500 font-medium">Tema</span>
                    <ThemeToggle />
                </div>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors hover:bg-red-50 dark:hover:bg-slate-800 hover:text-red-600 dark:hover:text-red-400"
                >
                    <LogOut className="h-5 w-5" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
