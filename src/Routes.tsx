import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes as _Routes, Route, Navigate } from 'react-router-dom';
import QueryClient from "@/components/hocs/QueryClient";
import FullScreenLoader from '@/components/common/FullScreenLoader';
import { ROUTES } from '@/constants/routes';

import IsAuthenticated from '@/components/hocs/IsAuthenticated';
import IsNotAuthenticated from '@/components/hocs/IsNotAuthenticated';

const Login = lazy(() => import('@/pages/Login'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const CreateTest = lazy(() => import('@/pages/CreateTest'));
const AddQuestions = lazy(() => import('@/pages/AddQuestions'));
const PreviewPublish = lazy(() => import('@/pages/PreviewPublish'));

export default function Routes() {
    return (
        <QueryClient>
            <BrowserRouter>
                <Suspense fallback={<FullScreenLoader />}>
                    <_Routes>
                        <Route path={ROUTES.PATTERNS.LOGIN} element={<IsNotAuthenticated><Login /></IsNotAuthenticated>} />
                        <Route path={ROUTES.PATTERNS.DASHBOARD} element={<IsAuthenticated><Dashboard /></IsAuthenticated>} />
                        <Route path={ROUTES.PATTERNS.MANAGE_TEST} element={<IsAuthenticated><CreateTest /></IsAuthenticated>} />
                        <Route path={ROUTES.PATTERNS.ADD_QUESTIONS} element={<IsAuthenticated><AddQuestions /></IsAuthenticated>} />
                        <Route path={ROUTES.PATTERNS.PREVIEW_PUBLISH} element={<IsAuthenticated><PreviewPublish /></IsAuthenticated>} />
                        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
                    </_Routes>
                </Suspense>
            </BrowserRouter>
        </QueryClient>
    );
}
