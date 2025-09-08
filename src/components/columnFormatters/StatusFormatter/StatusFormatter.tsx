import { TableColumnConfig } from '@medly-components/core';
import { StatusText } from './StatusFormatter.styled';

export const StatusFormatter: TableColumnConfig['component'] = ({ data }) => {
    return <StatusText status={data}>{data ? 'Active' : 'Inactive'}</StatusText>;
};
