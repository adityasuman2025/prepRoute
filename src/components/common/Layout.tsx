import React from 'react';
import Navbar from './Navbar';
import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}
function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            <Navbar />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header />

                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default React.memo(Layout);
