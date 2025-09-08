import { DeactivateManagerFormatter, ReporteeNameFormatter } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const DeactivateManagerSchema: TableColumnConfig[] = [
    {
        title: 'Reportee Name',
        field: '',
        component: ReporteeNameFormatter
    },
    {
        title: 'Change Manager To',
        field: '',
        component: DeactivateManagerFormatter
    }
];
