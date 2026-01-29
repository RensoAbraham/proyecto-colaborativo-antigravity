'use client';

import { useEffect, useState } from 'react';
import { Timer } from '@/features/timer/Timer';
import { DashboardStats } from '@/features/dashboard/DashboardStats';
import { WeeklyChart } from '@/features/dashboard/WeeklyChart';
import { WorkSession } from '@/types';
import { TimeTrackingService } from '@/services/time-tracking.service';
import { MOCK_USER } from '@/lib/mock-data';

export default function DashboardClient() {
    const [currentSession, setCurrentSession] = useState<WorkSession | null>(null);
    const [todayStats, setTodayStats] = useState({ minutes: 0, breaks: 0 });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const session = await TimeTrackingService.getCurrentSession();
            setCurrentSession(session);

            // Calculate totals for today
            const now = new Date();
            const history = await TimeTrackingService.getHistory(now.getMonth(), now.getFullYear());
            const todayStr = now.toISOString().split('T')[0];

            const todaySessions = history.filter(s => s.date === todayStr && s.status === 'completed');

            // Note: current session is usually NOT in history until completed in this mock implementation,
            // or handled separately. Let's make sure we count valid 'completed' time plus potentially current time if we wanted (but user asked for 'al finalizar').
            // Actually, the user said "al finalizar la jornada la cartilla... reciba el tiempo contado". 
            // This implies we sum completed sessions.

            let totalMinutes = todaySessions.reduce((acc, curr) => acc + curr.total_minutes, 0);
            let totalBreaks = todaySessions.reduce((acc, curr) => acc + curr.breaks.length, 0);

            // Also add current session stats if active/paused
            if (session && session.date === todayStr) {
                // If it's active, we might want to show accumulated time so far? 
                // User said "al finalizar", so maybe strictly only completed? 
                // But usually "Horas Hoy" implies live tracking.
                // However, "Pausas" needs to update on click. So we MUST include current session breaks.
                totalBreaks += session.breaks.length;

                // For minutes, if we only update on finalize, we don't add current session minutes here.
                // But if we want it live, we add session.total_minutes (which is updated on pause/stop).
                // Let's stick to adding it to show progress if available, or just breaks as requested.
                // The prompt for "Hours" specifically said "al finalizar", so let's respect that and NOT sum active time yet if that's the request.
                // Wait, "reciba el tiempo contado" -> "receives the counted time".
                // If I click pause, I want to see the pause count go up.
            }

            setTodayStats({ minutes: totalMinutes, breaks: totalBreaks });

        } catch (err) {
            console.error("Failed to load dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSessionChange = (session: WorkSession | null) => {
        setCurrentSession(session);
        fetchData();
    };

    if (loading) {
        return <div className="flex h-96 items-center justify-center text-slate-400">Cargando dashboard...</div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Hola, {MOCK_USER.full_name.split(' ')[0]} 👋
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Aquí tienes el resumen de tu jornada laboral.
                    </p>
                </div>
                <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                    {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <DashboardStats
                currentSession={currentSession}
                todayMinutes={todayStats.minutes}
                todayBreaks={todayStats.breaks}
            />

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-6">Actividad Semanal</h2>
                    <div className="h-80">
                        <WeeklyChart />
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Control de Jornada</h2>
                    <div className="flex-1 flex items-center justify-center">
                        <Timer initialSession={currentSession} onSessionChange={handleSessionChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}
