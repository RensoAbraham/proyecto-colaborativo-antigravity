'use client';

import { useState, useEffect } from 'react';

export interface UserSettings {
    // Perfil (simulado)
    profile: {
        name: string;
        role: string;
        email: string;
        avatar: string;
    };
    // Notificaciones
    notifications: {
        email: boolean;
        push: boolean;
        weeklyReport: boolean;
        sound: boolean;
    };
    // Preferencias
    preferences: {
        theme: 'light' | 'dark' | 'system';
        language: 'es' | 'en';
        compactMode: boolean;
        autoSave: boolean;
    };
}

const DEFAULT_SETTINGS: UserSettings = {
    profile: {
        name: 'Admin Usuario',
        role: 'Desarrollador Full Stack',
        email: 'admin@timemaster.com',
        avatar: '/avatars/default.png',
    },
    notifications: {
        email: true,
        push: false,
        weeklyReport: true,
        sound: true,
    },
    preferences: {
        theme: 'light',
        language: 'es',
        compactMode: false,
        autoSave: true,
    },
};

export function useSettings() {
    const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);

    // Cargar configuraciones al inicio y aplicar tema
    useEffect(() => {
        const stored = localStorage.getItem('timemaster_settings');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setSettings({ ...DEFAULT_SETTINGS, ...parsed });
                
                // Aplicar tema inicial
                if (parsed.preferences?.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            } catch (e) {
                console.error('Error parsing settings', e);
            }
        }
        setLoading(false);
    }, []);

    // Guardar configuración
    const updateSettings = (section: keyof UserSettings, newValues: Partial<any>) => {
        const updated = {
            ...settings,
            [section]: { ...settings[section], ...newValues },
        };
        setSettings(updated);
        localStorage.setItem('timemaster_settings', JSON.stringify(updated));

        // Efectos secundarios
        if (section === 'preferences' && 'theme' in newValues) {
            if (newValues.theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    // Actualizar perfil
    const updateProfile = (field: string, value: string) => {
        updateSettings('profile', { [field]: value });
    };

    // Subir avatar
    const uploadAvatar = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            updateSettings('profile', { avatar: base64String });
        };
        reader.readAsDataURL(file);
    };

    // Toggle notificaciones
    const toggleNotification = (key: keyof UserSettings['notifications']) => {
        updateSettings('notifications', { [key]: !settings.notifications[key] });
    };

    // Toggle preferencias
    const togglePreference = (key: keyof UserSettings['preferences']) => {
        if (key === 'theme') {
             // Toggle específico para tema
             const newTheme = settings.preferences.theme === 'dark' ? 'light' : 'dark';
             updateSettings('preferences', { theme: newTheme });
        } else if (typeof settings.preferences[key] === 'boolean') {
            updateSettings('preferences', { [key]: !settings.preferences[key] });
        }
    };

    // Cambiar idioma explícitamente
    const changeLanguage = (lang: 'es' | 'en' | 'pt') => {
        updateSettings('preferences', { language: lang });
    };

    return {
        settings,
        loading,
        updateProfile,
        uploadAvatar,
        toggleNotification,
        togglePreference,
        changeLanguage,
        updateSettings,
    };
}
