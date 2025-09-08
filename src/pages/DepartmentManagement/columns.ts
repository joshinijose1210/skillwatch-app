import { DateFormatter, StatusFormatter, TeamActionFormatter } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const teamColumns: TableColumnConfig[] = [
    { title: 'Department ID', field: 'departmentId' },
    { title: 'Department', field: 'departmentName' },
    { title: 'Created on', field: 'departmentCreatedAt', component: DateFormatter },
    { title: 'Status', field: 'departmentStatus', component: StatusFormatter },
    { title: 'Action', field: '', component: TeamActionFormatter }
];
