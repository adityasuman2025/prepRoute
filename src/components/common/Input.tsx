import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
}
export default function Input({ label, error, className = '', ref, ...props }: InputProps) {
    return (
        <label className="block text-base font-medium text-brand-text">
            {label}
            <input
                ref={ref}
                className={`w-full box-border mt-4 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800 transition-all disabled:bg-slate-50 disabled:text-slate-400 ${className}`}
                {...props}
            />
            {error && (
                <span className="text-red-500 text-xs mt-1 block font-normal">{error}</span>
            )}
        </label>
    );
}
