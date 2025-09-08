import { Chip, Text } from '@medly-components/core';
import styled from 'styled-components';

export const ChipDiv = styled.div<{ border?: any }>`
    background-color: white;
    border: 1px solid ${({ border }) => border};
    border-radius: 25px;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    padding: 2px 7px;
    min-width: 18rem;

    button {
        padding: 0 10px;
    }
`;

export const ChipDivNotGiven = styled(ChipDiv)`
    border-color: rgb(96, 120, 144);
`;

export const ChipNotGiven = styled(Chip)`
    background-color: rgb(96, 120, 144);
`;

export const TextNotGiven = styled(Text)`
    color: rgb(96, 120, 144);
`;
