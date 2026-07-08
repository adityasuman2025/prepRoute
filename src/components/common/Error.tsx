import React from 'react';

interface ErrorProps {
    message?: string;
    className?: string;
}

export default function Error({ message, className = '' }: ErrorProps) {
    if (!message) return null;

    return (
        <div className={`bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 ${className}`}>
            {message}
        </div>
    );
}
