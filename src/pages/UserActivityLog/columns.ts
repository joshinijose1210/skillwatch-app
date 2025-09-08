import { DateFormatter, TimeFormatter, UserActivityActor, UserActivityLog } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const EmployeeListSchema: TableColumnConfig[] = [
    {
        title: 'Date',
        field: 'createdAt',
        component: DateFormatter,
        fraction: 0.5
    },
    {
        title: 'Time',
        field: 'createdAt',
        component: TimeFormatter,
        fraction: 0.5
    },
    {
        title: 'Actor',
        field: '',
        component: UserActivityActor
    },
    {
        title: 'Activity Log',
        field: '',
        component: UserActivityLog,
        fitContent: true
    }
];
