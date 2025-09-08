import { DateFormatter, RoleActionFormatter, StatusFormatter } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const roleColumns: TableColumnConfig[] = [
    { title: 'Roles & Permissions ID', field: 'roleId' },
    { title: 'Role', field: 'roleName' },
    { title: 'Created on', field: 'createdAt', component: DateFormatter },
    { title: 'Status', field: 'status', component: StatusFormatter },
    { title: 'Action', field: '', component: RoleActionFormatter }
];
