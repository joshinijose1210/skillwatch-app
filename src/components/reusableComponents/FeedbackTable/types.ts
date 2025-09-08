import { TableColumnConfig } from '@medly-components/core';
import { Option } from '@medly-components/core/dist/es/components/SearchBox/types';
import { TableState } from '@medly-components/core/dist/es/components/Table/types';

export interface FeedbackTableProps {
    action: string;
    data?: any;
    columns: TableColumnConfig[];
    defaultSortOrder?: 'asc' | 'desc';
    defaultSortField?: string;
    onSort?: ({ activePage, sortField, sortOrder }: TableState) => void;
    options: Option[];
    onNameSelection: (value: string[] | any[]) => void;
    values?: string[];
    isLoading: boolean;
}
