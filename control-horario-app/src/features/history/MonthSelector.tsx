'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface MonthSelectorProps {
    currentDate: Date;
    onMonthChange: (date: Date) => void;
}

export function MonthSelector({ currentDate, onMonthChange }: MonthSelectorProps) {
    const handlePrev = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        onMonthChange(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        onMonthChange(newDate);
    };

    return (
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm w-fit mb-6">
            <button
                onClick={handlePrev}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-bold text-slate-800 uppercase min-w-[120px] text-center">
                {format(currentDate, 'MMMM yyyy', { locale: es })}
            </span>

            <button
                onClick={handleNext}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
