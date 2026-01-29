'use client';

import { WorkSession } from '@/types';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReportsTableProps {
    sessions: WorkSession[];
    targetHours?: number;
}

// Inline styles for custom scrollbar
const scrollContainerStyle: React.CSSProperties = {
    scrollbarWidth: 'thin',
    scrollbarColor: 'transparent transparent',
};

const scrollContainerHoverStyle = `
    .reports-table-scroll {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
        transition: scrollbar-color 0.3s ease;
    }
    .reports-table-scroll:hover {
        scrollbar-color: #94a3b8 transparent;
    }
    
    /* WebKit (Chrome, Edge, Safari) */
    .reports-table-scroll::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    .reports-table-scroll::-webkit-scrollbar-track {
        background: transparent;
    }
    .reports-table-scroll::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 3px;
        transition: background-color 0.3s ease;
    }
    .reports-table-scroll:hover::-webkit-scrollbar-thumb {
        background-color: #cbd5e1;
    }
    .reports-table-scroll:hover::-webkit-scrollbar-thumb:hover {
        background-color: #94a3b8;
    }
`;

export function ReportsTable({ sessions, targetHours = 8 }: ReportsTableProps) {
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const getPerformanceStatus = (hours: number) => {
        const percentage = (hours / targetHours) * 100;
        if (percentage >= 100) return { text: 'Excelente', color: 'text-green-600 bg-green-50 ring-1 ring-green-500/20' };
        if (percentage >= 80) return { text: 'Bueno', color: 'text-blue-600 bg-blue-50 ring-1 ring-blue-500/20' };
        if (percentage >= 60) return { text: 'Regular', color: 'text-amber-600 bg-amber-50 ring-1 ring-amber-500/20' };
        return { text: 'Bajo', color: 'text-red-600 bg-red-50 ring-1 ring-red-500/20' };
    };

    // Mobile card view
    const MobileCard = ({ session }: { session: WorkSession }) => {
        const dateObj = parseISO(session.date);
        const hours = session.total_minutes / 60;
        const performance = getPerformanceStatus(hours);

        return (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <p className="font-semibold text-slate-900">
                            {capitalize(format(dateObj, 'EEEE', { locale: es }))}
                        </p>
                        <p className="text-sm text-slate-500">{format(dateObj, 'dd/MM/yyyy')}</p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${performance.color}`}>
                        {performance.text}
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-500">Horas</p>
                        <p className="font-bold text-slate-900">{hours.toFixed(1)}h</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-500">Pausas</p>
                        <p className="font-bold text-slate-900">{session.breaks.length}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-xs text-slate-500">Meta</p>
                        <p className="font-bold text-slate-900">{Math.round((hours / targetHours) * 100)}%</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Inject CSS for custom scrollbar */}
            <style dangerouslySetInnerHTML={{ __html: scrollContainerHoverStyle }} />
            
            {/* Mobile view - cards */}
            <div className="md:hidden space-y-3">
                {sessions.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                        No hay registros para este período.
                    </div>
                ) : (
                    sessions.map((session) => (
                        <MobileCard key={session.id} session={session} />
                    ))
                )}
            </div>

            {/* Desktop view - table */}
            <div 
                className="reports-table-scroll hidden md:block w-full overflow-auto rounded-lg border border-slate-200 shadow-sm bg-white max-h-[400px]"
                style={scrollContainerStyle}
            >
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4 border-b border-slate-200">DÍA</th>
                            <th className="px-6 py-4 border-b border-slate-200">FECHA</th>
                            <th className="px-6 py-4 border-b border-slate-200">HORAS</th>
                            <th className="px-6 py-4 border-b border-slate-200">PAUSAS</th>
                            <th className="px-6 py-4 border-b border-slate-200">% META</th>
                            <th className="px-6 py-4 border-b border-slate-200">RENDIMIENTO</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sessions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                                    No hay registros para este período.
                                </td>
                            </tr>
                        ) : (
                            sessions.map((session) => {
                                const dateObj = parseISO(session.date);
                                const hours = session.total_minutes / 60;
                                const performance = getPerformanceStatus(hours);
                                const percentage = Math.round((hours / targetHours) * 100);

                                return (
                                    <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {capitalize(format(dateObj, 'EEEE', { locale: es }))}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {format(dateObj, 'dd/MM/yyyy')}
                                        </td>
                                        <td className="px-6 py-4 text-slate-900 font-bold">
                                            {hours.toFixed(1)}h
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {session.breaks.length}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${percentage >= 100 ? 'bg-green-500' : percentage >= 80 ? 'bg-blue-500' : 'bg-amber-500'}`}
                                                        style={{ width: `${Math.min(100, percentage)}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-slate-600">{percentage}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${performance.color}`}>
                                                {performance.text}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
