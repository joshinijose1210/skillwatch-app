import { EmployeeActionFormatter, FullNameFormatter, StatusFormatter, ManagerFullNameFormatter } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const EmployeeListSchema: TableColumnConfig[] = [
    {
        title: 'Employee ID',
        field: 'employeeId',
        sortable: true
    },
    {
        title: 'Name',
        field: '',
        component: FullNameFormatter
    },
    {
        title: 'Department',
        field: 'departmentName',
        fitContent: true
    },
    {
        title: 'Team (Designation)',
        field: 'teamAndDesignation',
        fitContent: true
    },
    {
        title: 'Manager 1',
        field: 'firstManagerId',
        component: ManagerFullNameFormatter,
        fitContent: true
    },
    {
        title: 'Manager 2',
        field: 'secondManagerId',
        component: ManagerFullNameFormatter,
        fitContent: true
    },
    {
        title: 'Email',
        field: 'emailId'
    },
    {
        title: 'Mobile',
        field: 'contactNo'
    },
    {
        title: 'Status',
        field: 'status',
        component: StatusFormatter
    },
    {
        title: 'Action',
        field: '',
        component: EmployeeActionFormatter
    }
];
