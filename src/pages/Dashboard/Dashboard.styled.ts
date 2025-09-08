import { Button, Text } from '@medly-components/core';
import styled from 'styled-components';

export const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
`;

export const Heading = styled(Text)`
    color: ${({ theme }) => theme.pageTitleColor};
`;

export const SubText = styled(Text)``;

export const Buttons = styled.div`
    display: flex;
    gap: 5px;
    align-self: center;

    ${Button.Style} {
        padding: 0.9rem 2rem 1.1rem;
    }
`;

export const ChartContainer = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: space-between;
`;
