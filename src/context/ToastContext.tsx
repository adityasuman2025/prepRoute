import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

interface ToastContextType {
    showSuccess: (detail: string, summary?: string) => void;
    showError: (detail: string, summary?: string) => void;
    showInfo: (detail: string, summary?: string) => void;
    showWarn: (detail: string, summary?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    const toastRef = useRef<Toast>(null);

    const showSuccess = (detail: string, summary = 'Success') => {
        toastRef.current?.show({ severity: 'success', summary, detail, life: 3000 });
    };

    const showError = (detail: string, summary = 'Error') => {
        toastRef.current?.show({ severity: 'error', summary, detail, life: 3000 });
    };

    const showInfo = (detail: string, summary = 'Info') => {
        toastRef.current?.show({ severity: 'info', summary, detail, life: 3000 });
    };

    const showWarn = (detail: string, summary = 'Warning') => {
        toastRef.current?.show({ severity: 'warn', summary, detail, life: 3000 });
    };

    return (
        <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarn }}>
            <Toast ref={toastRef} />
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
}
