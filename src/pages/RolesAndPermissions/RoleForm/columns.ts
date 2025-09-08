import { PermissionsFormatter, ModuleNameFormatter } from '@components/columnFormatters/PermissionsFormatter/PermissionsFormatter';
import { TableColumnConfig } from '@medly-components/core';

export const columns: TableColumnConfig[] = [
    { title: 'Modules', field: 'moduleName', component: ModuleNameFormatter },
    { title: 'Permissions', field: 'view', component: PermissionsFormatter }
];
