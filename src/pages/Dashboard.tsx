import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ROUTES } from '@/constants/routes';
import { API_ENDPOINTS, API_METHODS } from '@/constants/api';
import { apiCall } from '@/utils/api';
import Layout from '@/components/common/Layout';
import Table from '@/components/common/Table';
import { useToast } from '@/context/ToastContext';
import ButtonWithLoader from '@/components/common/ButtonWithLoader';
import { PAGE_SIZE, type TestItem, getColumns } from '@/constants/dashboard';

function Dashboard() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const toast = useToast();

    const [currentPage, setCurrentPage] = useState(1);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { data, isLoading, error } = useQuery({ queryKey: ['tests'], queryFn: async () => await apiCall(API_ENDPOINTS.TESTS) });
    const tests = useMemo(() => data?.data || [], [data]);
    const totalItems = tests.length;
    const startIndex = (currentPage - 1) * PAGE_SIZE;

    const paginatedTests = useMemo(() => {
        return tests.slice(startIndex, startIndex + PAGE_SIZE).map((test: TestItem) => ({ ...test, _isDeleting: deletingId === test.id }));
    }, [tests, startIndex, deletingId]);

    const deleteMutation = useMutation({
        mutationFn: (testId: string) => apiCall(API_ENDPOINTS.TEST_BY_ID(testId), { method: API_METHODS.DELETE }),
        onSuccess: (_data, testId) => {
            queryClient.setQueryData(['tests'], (oldData: any) => {
                if (!oldData?.data) return oldData;
                return { ...oldData, data: oldData.data.filter((item: any) => item.id !== testId) };
            });
            queryClient.invalidateQueries({ queryKey: ['tests'] });
            toast.showSuccess('Test deleted successfully');
        },
        onError: (err: any) => toast.showError(err.message || 'Failed to delete the test'),
        onSettled: () => setDeletingId(null),
    });

    const handleDelete = useCallback((test: TestItem) => {
        confirmDialog({
            message: `Are you sure you want to delete the test "${test.name}"?`,
            header: 'Delete Confirmation',
            acceptClassName: 'bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors border-none ml-2 outline-none',
            rejectClassName: 'bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors border-none outline-none',
            accept: () => {
                setDeletingId(test.id);
                deleteMutation.mutate(test.id);
            },
        });
    }, [deleteMutation]);

    const handleCreateClick = useCallback(() => {
        navigate(ROUTES.MANAGE_TEST);
    }, [navigate]);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const columns = useMemo(() => getColumns(navigate, handleDelete), [navigate, handleDelete]);

    return (
        <Layout isLoading={isLoading} error={error}>
            <ConfirmDialog />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Test Dashboard</h1>

                    <ButtonWithLoader onClick={handleCreateClick} className="w-fit" >
                        + Create New Test
                    </ButtonWithLoader>
                </div>

                <Table<TestItem>
                    columns={columns}
                    data={paginatedTests}
                    currentPage={currentPage}
                    pageSize={PAGE_SIZE}
                    totalItems={totalItems}
                    onPageChange={handlePageChange}
                    emptyMessage="No tests available"
                />
            </div>
        </Layout>
    );
}

export default React.memo(Dashboard);
