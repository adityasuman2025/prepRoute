import React from 'react';
import { QueryClient as _QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new _QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

export default function QueryClient({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}