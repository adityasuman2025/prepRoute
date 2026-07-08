import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { STORAGE_KEYS } from '@/constants/storage';
import { getStorageItem } from '@/utils/storage';

interface IsNotAuthenticatedProps {
    children: React.ReactNode;
}
export default function IsNotAuthenticated({ children }: IsNotAuthenticatedProps) {
    const token = getStorageItem<string>(STORAGE_KEYS.TOKEN);

    if (token) return <Navigate to={ROUTES.DASHBOARD} replace />;
    return <>{children}</>;
}
