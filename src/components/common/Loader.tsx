import React from 'react';
import LoaderSvg from '@/assets/loader.svg?react';

interface LoaderProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}
function Loader({ className = '', ...props }: LoaderProps) {
    // If custom width or height classes are passed, don't force the default h-5 w-5 size
    const hasCustomSize = className.includes('w-') || className.includes('h-');
    const sizeClasses = hasCustomSize ? '' : 'h-5 w-5';

    return (
        <LoaderSvg className={`animate-spin ${sizeClasses} ${className}`} {...props} />
    );
}

export default React.memo(Loader);
