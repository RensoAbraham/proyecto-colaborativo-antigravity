'use client';

import {
    User,
    Bell,
    Shield,
    Monitor,
    Save,
    Moon,
    Globe,
    Mail,
    Smartphone,
    Layout,
    Camera
} from 'lucide-react';
import { SettingsCard } from '@/features/settings/components/SettingsCard';
import { ToggleSwitch } from '@/features/settings/components/ToggleSwitch';
import { useSettings } from '@/features/settings/hooks/useSettings';
import { useState, useRef } from 'react';

import { useTheme } from '@/context/ThemeContext';

export default function SettingsPage() {
    const { settings, loading, updateProfile, uploadAvatar, toggleNotification, togglePreference, changeLanguage } = useSettings();
    const { theme, toggleTheme } = useTheme();
    const [saved, setSaved] = useState(false);

    // Referencia para el input de archivo
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar tamaño (ej: 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('La imagen es muy pesada. Máximo 2MB.');
                return;
            }
            uploadAvatar(file);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-slate-500">Cargando configuraciones...</div>;
    }

    const handleSave = () => {
        // Simular guardado visual
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    // Renderizar avatar o inicial
    const renderAvatar = () => {
        if (settings.profile.avatar && settings.profile.avatar.startsWith('data:')) {
            return (
                <img
                    src={settings.profile.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                />
            );
        }
        return (
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800">
                {settings.profile.name.charAt(0)}
            </div>
        );
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Configuración</h1>
                    <p className="text-slate-500 dark:text-slate-400">Gestiona tus preferencias y opciones de cuenta</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${saved
                        ? 'bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-900/20'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20'
                        }`}
                >
                    {saved ? (
                        <>
                            <Save size={18} />
                            ¡Guardado!
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Guardar Cambios
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Columna Izquierda: Perfil y Preferencias Generales */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Perfil */}
                    <SettingsCard
                        title="Perfil de Usuario"
                        description="Actualiza tu información personal y rol."
                        icon={<User size={20} />}
                    >
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            <div className="flex flex-col items-center gap-3">
                                <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                                    <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-md overflow-hidden flex items-center justify-center">
                                        {renderAvatar()}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera size={24} className="text-white" />
                                    </div>
                                    <button className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded-full shadow-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 z-10">
                                        <User size={14} />
                                    </button>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <span className="text-xs text-slate-400">Click para cambiar (max 2MB)</span>
                            </div>

                            <div className="flex-1 w-full grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre Completo</label>
                                    <input
                                        type="text"
                                        value={settings.profile.name}
                                        onChange={(e) => updateProfile('name', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 outline-none transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={settings.profile.email}
                                            disabled
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Cargo / Rol</label>
                                        <input
                                            type="text"
                                            value={settings.profile.role}
                                            onChange={(e) => updateProfile('role', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 outline-none transition-all bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SettingsCard>

                    {/* Notificaciones */}
                    <SettingsCard
                        title="Notificaciones"
                        description="Elige cómo y cuándo quieres que te contactemos."
                        icon={<Bell size={20} />}
                    >
                        <div className="space-y-4 divide-y divide-slate-100">
                            {/* ... (mantener igual el contenido interno, solo asegúrate de importar ToggleSwitch) */}
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">Notificaciones por Email</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Recibe actualizaciones importantes en tu correo.</p>
                                    </div>
                                </div>
                                <ToggleSwitch
                                    checked={settings.notifications.email}
                                    onChange={() => toggleNotification('email')}
                                />
                            </div>

                            <div className="flex items-center justify-between py-2 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                                        <Smartphone size={18} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">Notificaciones Push</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Notificaciones en tiempo real en tu navegador.</p>
                                    </div>
                                </div>
                                <ToggleSwitch
                                    checked={settings.notifications.push}
                                    onChange={() => toggleNotification('push')}
                                />
                            </div>

                            <div className="flex items-center justify-between py-2 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                                        <Layout size={18} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">Resumen Semanal</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Envía un reporte de productividad cada lunes.</p>
                                    </div>
                                </div>
                                <ToggleSwitch
                                    checked={settings.notifications.weeklyReport}
                                    onChange={() => toggleNotification('weeklyReport')}
                                />
                            </div>
                        </div>
                    </SettingsCard>

                </div>

                {/* Columna Derecha: Preferencias y Seguridad */}
                <div className="space-y-6">

                    {/* Preferencias de Interface */}
                    <SettingsCard
                        title="Apariencia"
                        icon={<Monitor size={20} />}
                        className="h-fit"
                    >
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                    <Moon size={16} />
                                    <span className="font-medium">Modo Oscuro</span>
                                </div>
                                <ToggleSwitch
                                    checked={theme === 'dark'}
                                    onChange={toggleTheme}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                    <Layout size={16} />
                                    <span className="font-medium">Modo Compacto</span>
                                </div>
                                <ToggleSwitch
                                    checked={settings.preferences.compactMode}
                                    onChange={() => togglePreference('compactMode')}
                                />
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                                    <Globe size={16} />
                                    <span className="font-medium">Idioma</span>
                                </div>
                                <select
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 outline-none text-sm transition-colors text-slate-900 dark:text-white"
                                    value={settings.preferences.language}
                                    onChange={(e) => changeLanguage(e.target.value as 'es' | 'en' | 'pt')}
                                >
                                    <option value="es">Español (Latam)</option>
                                    <option value="en">English (US)</option>
                                </select>
                            </div>
                        </div>
                    </SettingsCard>

                    {/* Seguridad (mantener igual) */}
                    <SettingsCard title="Seguridad" icon={<Shield size={20} />} className="h-fit">
                        <div className="space-y-4">
                            <button className="w-full py-2 px-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                                Cambiar Contraseña
                            </button>
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                <button className="w-full py-2 px-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium">
                                    Cerrar Sesión en todos los dispositivos
                                </button>
                            </div>
                        </div>
                    </SettingsCard>

                </div>
            </div>
        </div>
    );
}
