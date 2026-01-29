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
            accumulated_seconds: 0,
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

        // Calculate time since last check_in/resume
        const now = new Date();
        const lastStart = new Date(currentSession.check_in); // This acts as the last "resume" time in this logic
        const secondsSinceStart = Math.floor((now.getTime() - lastStart.getTime()) / 1000);

        const newAccumulated = (currentSession.accumulated_seconds || 0) + secondsSinceStart;

        // Add a break record
        const newBreak = {
            id: `break_${Date.now()}`,
            session_id: sessionId,
            start_time: now.toISOString(),
            duration_minutes: 0 // Will be calculated on resume/stop if needed
        };

        currentSession = {
            ...currentSession,
            status: 'paused',
            accumulated_seconds: newAccumulated,
            total_minutes: Math.floor(newAccumulated / 60), // Sync total_minutes
            breaks: [...currentSession.breaks, newBreak]
        };

        return currentSession;
    },

    async resumeSession(sessionId: string): Promise<WorkSession> {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!currentSession || currentSession.id !== sessionId) {
            throw new Error('Session not found or mismatch');
        }

        // Reset check_in to NOW so we calculate delta from this new point
        currentSession = {
            ...currentSession,
            check_in: new Date().toISOString(),
            status: 'active',
        };

        return currentSession;
    },

    async stopSession(sessionId: string): Promise<WorkSession> {
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!currentSession || currentSession.id !== sessionId) {
            throw new Error('Session not found or mismatch');
        }

        let finalAccumulated = currentSession.accumulated_seconds || 0;

        // If trying to stop while active, add the remaining time
        if (currentSession.status === 'active') {
            const now = new Date();
            const lastStart = new Date(currentSession.check_in);
            const secondsSinceStart = Math.floor((now.getTime() - lastStart.getTime()) / 1000);
            finalAccumulated += secondsSinceStart;
        }

        const completedSession = {
            ...currentSession,
            check_out: new Date().toISOString(),
            status: 'completed' as SessionStatus,
            accumulated_seconds: finalAccumulated,
            total_minutes: Math.floor(finalAccumulated / 60)
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
