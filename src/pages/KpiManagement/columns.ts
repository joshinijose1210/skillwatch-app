import { KPIActionFormatter, KpiDepartmentNameFormatter, KpiTeamDesignationFormatter, StatusFormatter } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const TableColumns: TableColumnConfig[] = [
    { title: 'KPI ID', field: 'kpiId', fraction: 0.3 },
    { title: 'KRA', field: 'kraName' },
    { title: 'KPI Title', field: 'title' },
    { title: 'Department', field: 'department', component: KpiDepartmentNameFormatter, wrapText: true },
    { title: 'Teams (Designations)', field: 'team', component: KpiTeamDesignationFormatter },
    { title: 'Status', field: 'status', component: StatusFormatter, fraction: 0.3 },
    { title: 'Action', field: 'action', component: KPIActionFormatter, fraction: 0.5 }
];
