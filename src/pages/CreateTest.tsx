import React, { useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Layout from '@/components/common/Layout';
import CreateTestForm from '@/components/CreateTestForm';
import { useToast } from '@/context/ToastContext';
import { apiCall } from '@/utils/api';
import { ROUTES } from '@/constants/routes';
import { API_ENDPOINTS, API_METHODS } from '@/constants/api';
import { type TestFormData, TEST_STATUS, type TestStatus } from '@/constants/createTest';

function CreateTest() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const toast = useToast();
    const { id } = useParams();
    const isEdit = !!id;

    const { data: testDetailData, isLoading: isTestDetailLoading, error: testDetailError } = useQuery({
        queryKey: ['test', id],
        queryFn: async () => await apiCall(API_ENDPOINTS.TEST_BY_ID(id!)),
        enabled: isEdit,
    });
    const initialData = useMemo(() => testDetailData?.data || null, [testDetailData]);

    const testMutation = useMutation({
        mutationFn: async (payload: Partial<TestFormData> & { status: TestStatus; shouldNavigate: boolean }) => {
            const { shouldNavigate, ...apiPayload } = payload;
            const endpoint = isEdit ? API_ENDPOINTS.TEST_BY_ID(id!) : API_ENDPOINTS.TESTS;
            const method = isEdit ? API_METHODS.PUT : API_METHODS.POST;
            return await apiCall(endpoint, { method, body: apiPayload });
        },
        onSuccess: (result, variables) => {
            queryClient.invalidateQueries({ queryKey: ['tests'] });
            const testId = result.data?.id || id;

            if (variables.shouldNavigate) {
                toast.showSuccess(isEdit ? 'Test updated successfully' : 'Test created successfully');
                navigate(ROUTES.ADD_QUESTIONS(testId));
            } else {
                toast.showSuccess('Draft saved successfully');
                if (!id && testId) navigate(ROUTES.PATTERNS.MANAGE_TEST.replace(':id?', testId), { replace: true });
            }
        },
        onError: (err: any) => toast.showError(err.message || 'Failed to save the test'),
    });

    const handleSave = useCallback((data: TestFormData, shouldNavigate: boolean) => {
        testMutation.mutate({ ...data, status: TEST_STATUS.DRAFT, shouldNavigate });
    }, [testMutation]);

    const handleCancel = useCallback(() => {
        navigate(ROUTES.DASHBOARD);
    }, [navigate]);

    return (
        <Layout isLoading={isEdit && isTestDetailLoading} error={testDetailError}>
            <CreateTestForm
                initialData={initialData}
                onSave={handleSave}
                onCancel={handleCancel}
                isSaving={testMutation.isPending}
            />
        </Layout>
    );
}

export default React.memo(CreateTest);
