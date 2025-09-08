import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const Container = styled('div')`
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const StyledHeading = styled(Text)`
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: ${({ theme }) => theme.pageTitleColor};
`;

export const ContentWrapper = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: space-between;
`;
