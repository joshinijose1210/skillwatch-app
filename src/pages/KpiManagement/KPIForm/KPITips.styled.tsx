import { Box, Text } from '@medly-components/core';
import styled from 'styled-components';
import bulbOn from '@constants/images/icons/lightbulb_off.png';
import bulbOff from '@constants/images/icons/lightbulb_on.png';

export const BulbImg = styled.div`
    background-image: url(${bulbOff});
    background-position: center;
    background-size: contain;
    width: 2.8rem;
    height: 2.8rem;
    background-repeat: no-repeat;
    margin-left: 0.5rem;
`;

export const HelpBox = styled(Box)`
    height: fit-content;
    flex-direction: column;
    row-gap: 1rem;
    flex-grow: 1;
    width: auto;
    padding: 2rem;
    border-radius: 2rem;
    color: ${({ theme }) => theme.colors.grey[600]};
    background-color: ${({ theme }) => theme.colors.grey[50]};
    &:hover ${BulbImg} {
        background-image: url(${bulbOn}) !important;
    }
`;

export const TipsList = styled.div``;

export const ListHeader = styled(Text).attrs({
    textVariant: 'h4',
    textWeight: 'Medium'
})`
    margin-bottom: 1rem;
    span {
        font-weight: 400;
    }
`;

export const StepText = styled(Text)<{ marginBottom?: string }>`
    margin-bottom: ${({ marginBottom }) => marginBottom};
    span {
        font-weight: 600;
    }
`;

export const FlexRow = styled.div<{ justifyContent?: string }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const KpiItemContainer = styled.div`
    margin: 1rem;
`;
