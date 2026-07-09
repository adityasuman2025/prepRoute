import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import LoaderOrError from './LoaderOrError';

interface LayoutProps {
    children: React.ReactNode;
    isLoading?: boolean;
    error?: any;
}
function Layout({ children, isLoading = false, error = null }: LayoutProps) {
    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            <Navbar />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-8">
                    <LoaderOrError isLoading={isLoading} error={error}>
                        {children}
                    </LoaderOrError>
                </main>
            </div>
        </div>
    );
}

export default React.memo(Layout);
