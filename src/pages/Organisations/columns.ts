import { OrgAdminNameFormatter } from '@components';
import { TableColumnConfig } from '@medly-components/core';
import { DateFormatter } from '@components';

export const OrganisationsListSchema: TableColumnConfig[] = [
    {
        title: 'Org ID',
        field: 'organisationId',
        fraction: 0.5
    },
    {
        title: 'Admin Name',
        field: '',
        component: OrgAdminNameFormatter
    },
    {
        title: 'Admin Email',
        field: 'adminEmailId'
    },
    {
        title: 'Created on',
        field: 'date',
        component: DateFormatter
    },
    {
        title: 'Org Name',
        field: 'organisationName'
    },
    {
        title: 'Contact No',
        field: 'contactNo',
        fraction: 0.5
    },
    {
        title: 'Company Size',
        field: 'organisationSize',
        fraction: 0.5
    }
];
