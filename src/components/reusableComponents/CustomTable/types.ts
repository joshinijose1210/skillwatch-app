import { RowHoverActionsType, TableColumnConfig } from '@medly-components/core';
import { SortOrder } from '@medly-components/core/dist/es/components/Table/types';

interface CustomTableBaseProps {
    children?: React.ReactNode;
    columns: TableColumnConfig[];
    count: number;
    data: any;
    isLoading: boolean;
    activePage: number;
    rowAction?: RowHoverActionsType;
    defaultSortField?: string;
    defaultSortOrder?: SortOrder;
    tableKey?: string;
    itemsPerPage?: number;
    setSortOrder?: (order: string) => void;
    withMinimap?: boolean;
}

interface WithPaginationProps extends CustomTableBaseProps {
    withPagination: true;
    handlePageChange: (page: number) => void;
}

interface WithoutPaginationProps extends CustomTableBaseProps {
    withPagination?: false;
    handlePageChange?: (page: number) => void;
}

// Union type
export type CustomTableProps = WithPaginationProps | WithoutPaginationProps;
