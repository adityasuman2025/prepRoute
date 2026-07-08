import React from 'react';
import loaderSvg from '@/assets/loader.svg';

interface LoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export default function Loader({ className = '', ...props }: LoaderProps) {
    return (
        <img
            src={loaderSvg}
            className={`animate-spin h-5 w-5 ${className}`}
            alt="loading..."
            {...props}
        />
    );
}
