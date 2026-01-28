import { WorkSession, SessionStatus } from '@/types';
import { MOCK_SESSIONS, MOCK_CURRENT_SESSION } from '@/lib/mock-data';

// Simulating database state in memory for the session
let currentSession: WorkSession | null = MOCK_CURRENT_SESSION;
let sessions: WorkSession[] = [...MOCK_SESSIONS];

export const TimeTrackingService = {
    async getCurrentSession(): Promise<WorkSession | null> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return currentSession;
    },

    async startSession(userId: string): Promise<WorkSession> {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (currentSession) {
            throw new Error('Session already active');
        }

        const todayStr = new Date().toISOString().split('T')[0];
        const existingSession = sessions.find(s => s.date === todayStr && s.user_id === userId);

        if (existingSession) {
            throw new Error('Ya has registrado una jornada el día de hoy. Inténtalo mañana.');
        }

        const newSession: WorkSession = {
            id: `sess_${Date.now()}`,
            user_id: userId,
            company_id: 'comp_123',
            date: todayStr,
            check_in: new Date().toISOString(),
            status: 'active',
            total_minutes: 0,
            breaks: [],
        };

        currentSession = newSession;
        return newSession;
    },

    async pauseSession(sessionId: string): Promise<WorkSession> {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!currentSession || currentSession.id !== sessionId) {
            throw new Error('Session not found or mismatch');
        }

        // In a real app we would add a break record here
        currentSession = {
            ...currentSession,
            status: 'paused',
        };

        return currentSession;
    },

    async resumeSession(sessionId: string): Promise<WorkSession> {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!currentSession || currentSession.id !== sessionId) {
            throw new Error('Session not found or mismatch');
        }

        currentSession = {
            ...currentSession,
            status: 'active',
        };

        return currentSession;
    },

    async stopSession(sessionId: string): Promise<WorkSession> {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!currentSession || currentSession.id !== sessionId) {
            throw new Error('Session not found or mismatch');
        }

        const completedSession = {
            ...currentSession,
            check_out: new Date().toISOString(),
            status: 'completed' as SessionStatus,
        };

        sessions = [completedSession, ...sessions];
        currentSession = null;

        return completedSession;
    },

    async getHistory(month?: number, year?: number): Promise<WorkSession[]> {
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredSessions = sessions;

        if (month !== undefined && year !== undefined) {
            filteredSessions = sessions.filter(s => {
                const d = new Date(s.date);
                // Javascript months are 0-indexed, but usually we pass 1-indexed from UI
                // Let's assume input is 0-indexed to match getMonth()
                return d.getMonth() === month && d.getFullYear() === year;
            });
        }

        return filteredSessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
};
