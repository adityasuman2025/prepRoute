import React from 'react';
import Loader from './Loader';

export default function FullScreenLoader() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-slate-50 font-sans">
            <Loader className="w-10 h-10 invert opacity-75" />
        </div>
    );
}
