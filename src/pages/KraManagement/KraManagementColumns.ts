import { TableColumnConfig } from '@medly-components/core';

export const KraManagementColumns: TableColumnConfig[] = [
    {
        title: 'KRA ID',
        field: 'kraId'
    },
    {
        title: 'KRA',
        field: 'name'
    },
    {
        title: 'Weightage(%)',
        field: 'weightage',
        align: 'center'
    }
];
