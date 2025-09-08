import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const StatusText = styled(Text)<{ status: boolean }>`
    color: ${props => (props.status ? 'green !important' : 'red !important')};
`;
