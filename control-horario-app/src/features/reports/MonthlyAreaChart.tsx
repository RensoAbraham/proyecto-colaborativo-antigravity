'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTheme } from '@/context/ThemeContext';

interface MonthlyData {
    week: string;
    hours: number;
}

interface MonthlyAreaChartProps {
    data: MonthlyData[];
}

export function MonthlyAreaChart({ data }: MonthlyAreaChartProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="h-full w-full min-h-[280px] sm:min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                        dataKey="week"
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}h`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#1e293b' : '#ffffff',
                            borderRadius: '8px',
                            border: isDark ? '1px solid #334155' : 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            fontSize: '13px',
                            color: isDark ? '#f8fafc' : '#0f172a'
                        }}
                        itemStyle={{
                            color: isDark ? '#f8fafc' : '#0f172a'
                        }}
                        labelStyle={{
                            color: isDark ? '#cbd5e1' : '#64748b'
                        }}
                        formatter={(value: any) => [`${Number(value).toFixed(1)}h`, 'Total Horas']}
                    />
                    <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#hoursGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
