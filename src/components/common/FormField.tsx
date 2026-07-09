import React from 'react';

interface FormFieldProps {
    label: string;
    error?: string;
    labelSize?: 'small' | 'large';
    children: React.ReactNode;
}

function FormField({ label, error, labelSize = 'large', children }: FormFieldProps) {
    const labelClass = labelSize === 'small'
        ? 'text-[11px] font-semibold text-slate-500'
        : 'text-[13px] font-semibold text-slate-700';

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className={labelClass}>{label}</label>
            {children}
            {error && <span className="text-red-500 text-xs mt-0.5">{error}</span>}
        </div>
    );
}

export default React.memo(FormField);
export type { FormFieldProps };
