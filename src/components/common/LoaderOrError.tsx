import React from 'react';
import Loader from './Loader';

interface LoaderOrErrorProps {
    isLoading?: boolean;
    error?: any;
    children: React.ReactNode;
}
function LoaderOrError({ isLoading = false, error = null, children }: LoaderOrErrorProps) {
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500 bg-white border border-slate-200 rounded-xl shadow-xs max-w-xl mx-auto w-full">
                <p className="font-semibold text-red-500">Error loading data</p>
                <p className="text-xs text-slate-400 mt-1">{error?.message || 'Something went wrong'}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-32 w-full">
                <Loader className="w-12 h-12 text-brand-primary" />
            </div>
        );
    }

    return <>{children}</>;
}

export default React.memo(LoaderOrError);
