import { DateFormatter, DesignationActionFormatter, StatusFormatter } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const designationColumns: TableColumnConfig[] = [
    { title: 'Designation ID', field: 'designationId' },
    { title: 'Designation', field: 'designationName' },
    { title: 'Department', field: 'departmentName' },
    { title: 'Team', field: 'teamName' },
    { title: 'Created on', field: 'createdAt', component: DateFormatter },
    { title: 'Status', field: 'status', component: StatusFormatter },
    { title: 'Action', field: '', component: DesignationActionFormatter }
];
