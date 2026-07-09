import React from 'react';
import dayjs from 'dayjs';
import ButtonWithLoader from '@/components/common/ButtonWithLoader';
import { ROUTES } from '@/constants/routes';
import { type Column } from '@/components/common/Table';

export const PAGE_SIZE = 20;

export interface TestItem {
    id: string;
    name: string;
    subject: string;
    topics: string[];
    status: 'draft' | 'live' | string;
    created_at: string;
    _isDeleting?: boolean;
}

export const getColumns = (
    navigate: (path: string) => void,
    handleDelete: (test: TestItem) => void
): Column<TestItem>[] => [
        {
            key: 'name',
            header: 'Test Name',
            className: 'font-semibold text-slate-800 max-w-sm truncate',
        },
        {
            key: 'subject',
            header: 'Subject',
            className: 'text-slate-500 font-medium',
        },
        {
            key: 'status',
            header: 'Status',
            render: (test) => (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${test.status === 'live'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                    {test.status || 'Draft'}
                </span>
            ),
        },
        {
            key: 'created_at',
            header: 'Created Date',
            className: 'text-slate-400 font-medium',
            render: (test) => dayjs(test.created_at).format('MMM DD, YYYY'),
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-right space-x-1.5 shrink-0 whitespace-nowrap pr-6',
            pt: { headerContent: { className: 'justify-end' } },
            render: (test) => (
                <>
                    <ButtonWithLoader
                        onClick={() => navigate(`${ROUTES.MANAGE_TEST}/${test.id}`)}
                        className="text-xs font-semibold box-border w-16 h-8 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200"
                    >
                        Edit
                    </ButtonWithLoader>
                    <ButtonWithLoader
                        onClick={() => navigate(ROUTES.PREVIEW_PUBLISH(test.id))}
                        className="text-xs font-semibold box-border w-16 h-8 bg-brand-primary/10 hover:bg-brand-primary/15 text-brand-primary rounded-lg"
                    >
                        View
                    </ButtonWithLoader>
                    <ButtonWithLoader
                        onClick={() => handleDelete(test)}
                        isLoading={test._isDeleting}
                        loaderClassName='w-3 h-3'
                        className="text-xs font-semibold box-border w-20 h-8 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-100"
                    >
                        Delete
                    </ButtonWithLoader>
                </>
            ),
        },
    ];
