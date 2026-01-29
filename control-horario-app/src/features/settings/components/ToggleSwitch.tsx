'use client';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
}

export function ToggleSwitch({ checked, onChange, label, disabled = false }: ToggleSwitchProps) {
    return (
        <label className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={(e) => !disabled && onChange(e.target.checked)}
                    disabled={disabled}
                />
                <div
                    className={`block w-11 h-6 rounded-full transition-colors duration-200 ${
                        checked ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                ></div>
                <div
                    className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 shadow-sm ${
                        checked ? 'translate-x-[20px]' : 'translate-x-0'
                    }`}
                ></div>
            </div>
            {label && <span className="ml-3 text-sm font-medium text-slate-700">{label}</span>}
        </label>
    );
}
