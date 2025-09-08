import { CycleActionFormatter, DateFormatter, StatusFormatter } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const reviewCycleCols: TableColumnConfig[] = [
    {
        title: 'Review Cycle',
        field: 'reviewCycle'
    },
    {
        title: 'Last modified date',
        field: 'lastModified',
        component: DateFormatter
    },
    {
        title: 'Status',
        field: 'publish',
        component: StatusFormatter
    },
    {
        title: 'Action',
        field: '',
        component: CycleActionFormatter
    }
];
