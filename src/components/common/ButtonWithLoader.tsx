import React from 'react';
import Loader from './Loader';

interface ButtonWithLoaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loaderClassName?: string;
}

function ButtonWithLoader({
    isLoading,
    loaderClassName = '',
    children,
    className = '',
    disabled,
    ...props
}: ButtonWithLoaderProps) {
    const hasCustomStyle = className.includes('bg-') || className.includes('text-');
    const hasHeight = className.includes('h-');
    const heightClass = hasHeight ? '' : 'h-10';

    const baseClasses = hasCustomStyle
        ? 'cursor-pointer transition inline-flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed'
        : `cursor-pointer bg-brand-blue hover:bg-brand-blue-hover text-white text-sm font-medium ${heightClass} px-4 rounded-lg transition inline-flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed`;

    const hasCustomSize = loaderClassName.includes('w-') || loaderClassName.includes('h-');
    const sizeClasses = hasCustomSize ? '' : 'w-4 h-4';

    return (
        <button
            disabled={disabled || isLoading}
            className={`${baseClasses} ${className}`}
            {...props}
        >
            {isLoading ? (
                <Loader className={`${sizeClasses} text-current ${loaderClassName}`} />
            ) : (
                children
            )}
        </button>
    );
}

export default React.memo(ButtonWithLoader);
