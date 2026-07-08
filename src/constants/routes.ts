import DashboardIcon from '@/assets/dashboard.svg?react';
import CreateTestIcon from '@/assets/create-test.svg?react';
import TestTrackingIcon from '@/assets/test-tracking.svg?react';

export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    MANAGE_TEST: '/tests/manage',
    ADD_QUESTIONS: (id: string) => `/tests/${id}/questions`,
    PREVIEW_PUBLISH: (id: string) => `/tests/${id}/preview`,
    TRACKING: '/tests/tracking',

    PATTERNS: {
        LOGIN: '/login',
        DASHBOARD: '/dashboard',
        MANAGE_TEST: '/tests/manage/:id?',
        ADD_QUESTIONS: '/tests/:id/questions',
        PREVIEW_PUBLISH: '/tests/:id/preview',
    }
};

export const NAV_ITEMS = [
    {
        name: 'Dashboard',
        path: ROUTES.DASHBOARD,
        icon: DashboardIcon,
    },
    {
        name: 'Test Creation',
        path: ROUTES.MANAGE_TEST,
        icon: CreateTestIcon,
    },
    {
        name: 'Test Tracking',
        path: ROUTES.TRACKING,
        icon: TestTrackingIcon,
    },
];
