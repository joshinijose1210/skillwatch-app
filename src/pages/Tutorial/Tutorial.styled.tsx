import { Card } from '@medly-components/core';
import styled from 'styled-components';
import { FlexBoxRowProps } from './types';

export const StyledCard = styled(Card)`
    min-width: 35rem;
    max-width: 32%;
    height: 60rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    gap: 1rem;
    /* margin: 2rem 0; */
    overflow: hidden;

    @media screen and (width>=1600px) {
        max-width: 23%;
    }
`;

export const CardsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 3rem 0;
    column-gap: 1.5rem;
    row-gap: 3rem;

    @media screen and (width>=1800px) {
        gap: 3rem;
    }
`;

export const FlexBoxRow = styled.div<FlexBoxRowProps>`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${({ gap }) => gap || '1rem'};
    align-items: center;
`;
