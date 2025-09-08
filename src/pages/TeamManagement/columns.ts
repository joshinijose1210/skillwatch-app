import { DateFormatter, StatusFormatter, TeamActionFormatter } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const teamColumns: TableColumnConfig[] = [
    { title: 'Team ID', field: 'teamId' },
    { title: 'Team', field: 'teamName' },
    { title: 'Department', field: 'departmentName' },
    { title: 'Created on', field: 'teamCreatedAt', component: DateFormatter },
    { title: 'Status', field: 'teamStatus', component: StatusFormatter },
    { title: 'Action', field: '', component: TeamActionFormatter }
];
