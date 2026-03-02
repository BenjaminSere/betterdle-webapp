'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { AuthProvider } from './AuthProvider';
export default function Providers({ children }: { children: ReactNode }) {
    // On utilise un state pour s'assurer que chaque utilisateur a son propre cache
    const [queryClient] = useState(() => new QueryClient());

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthProvider>
    );
}