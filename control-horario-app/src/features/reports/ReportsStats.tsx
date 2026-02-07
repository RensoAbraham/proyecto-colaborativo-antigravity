"use client";

import { Clock, TrendingUp, Coffee, Calendar } from "lucide-react";

interface ReportsStatsProps {
  totalHours: number;
  averageHours: number;
  totalBreaks: number;
  workDays: number;
  targetHours?: number; // Default 8 hours
}

export function ReportsStats({
  totalHours,
  averageHours,
  totalBreaks,
  workDays,
  targetHours = 8,
}: ReportsStatsProps) {
  const formatHours = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  // Calculate performance percentage based on target
  const performance =
    averageHours > 0 ? Math.round((averageHours / targetHours) * 100) : 0;
  const performanceColor =
    performance >= 100
      ? "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20"
      : performance >= 80
        ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20"
        : "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/20";

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Horas
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {formatHours(totalHours)}
            </h3>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`p-2.5 sm:p-3 rounded-lg ${performanceColor}`}>
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Promedio Diario
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {formatHours(averageHours)}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">Meta: {targetHours}h</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400">
            <Coffee className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Pausas
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {totalBreaks}
            </h3>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Días Trabajados
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {workDays}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
