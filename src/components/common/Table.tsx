import React, { useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Loader from './Loader';

export interface ColumnConfig<T> {
    key: string;
    header: React.ReactNode;
    render?: (row: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
    pt?: any;
}

interface TableProps<T> {
    columns: ColumnConfig<T>[];
    data: T[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
    error?: any;
    emptyMessage?: string;
}
function Table<T>({
    columns,
    data,
    currentPage,
    pageSize,
    totalItems,
    onPageChange,
    isLoading = false,
    error = null,
    emptyMessage = 'No data available',
}: TableProps<T>) {
    const first = (currentPage - 1) * pageSize;

    const handlePage = useCallback((e: { page?: number }) => {
        onPageChange((e.page ?? 0) + 1);
    }, [onPageChange]);

    if (error) {
        return (
            <div className="text-center py-16 text-slate-500 bg-white border border-slate-200 rounded-xl shadow-sm">
                <p className="font-semibold text-red-500">Error loading data</p>
                <p className="text-xs text-slate-400 mt-1">{error?.message || 'Something went wrong'}</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden primereact-table-wrapper">
            <DataTable
                value={data}
                paginator
                rows={pageSize}
                totalRecords={totalItems}
                lazy
                first={first}
                onPage={handlePage}
                loading={isLoading}
                loadingIcon={<Loader className="w-8 h-8" />}
                emptyMessage={emptyMessage}
                className="w-full text-sm"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
            >
                {columns.map((col) => (
                    <Column
                        key={col.key}
                        field={col.key}
                        header={col.header}
                        body={col.render}
                        className={`px-6 py-4.5 ${col.className || ''}`}
                        headerClassName={`px-6 py-4 bg-slate-50 text-brand-text font-bold border-b border-brand-border ${col.headerClassName || ''}`}
                        pt={col.pt}
                    />
                ))}
            </DataTable>
        </div>
    );
}

export default React.memo(Table) as <T>(props: TableProps<T>) => React.ReactElement;
export type { ColumnConfig as Column };
