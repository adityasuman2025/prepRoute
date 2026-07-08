import React from 'react';
import Loader from './Loader';

interface ButtonWithLoaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export default function ButtonWithLoader({
    isLoading,
    children,
    className = '',
    disabled,
    ...props
}: ButtonWithLoaderProps) {
    return (
        <button
            disabled={disabled || isLoading}
            className={`w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-medium py-3 px-4 rounded-lg shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue-hover/30 transition-all flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer ${className}`}
            {...props}
        >
            {isLoading ? (
                <Loader />
            ) : (
                children
            )}
        </button>
    );
}
