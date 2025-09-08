import { Checkbox, Text } from '@medly-components/core';
import styled from 'styled-components';

export const PermissionFormattersWrapper = styled.div`
    display: flex;
    column-gap: 2rem;
`;

export const StyledCheckbox = styled(Checkbox)`
    padding: 0;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
`;

export const SubModuleName = styled(Text)`
    display: flex;
    align-items: center;
    margin-left: 3.5rem;
    svg {
        margin-right: 1rem;
    }
`;

export const MainModuleName = styled(Text)`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.grey[600]};
`;
