import { Box, Text } from '@medly-components/core';
import styled from 'styled-components';
import bulbOn from '@constants/images/icons/lightbulb_off.png';
import bulbOff from '@constants/images/icons/lightbulb_on.png';
import { BadgeWrapper } from '@components/reusableComponents/Badge/Badge.styled';

export const Section = styled(Box)`
    padding: 0;
    margin-top: 2rem;
    flex-direction: row;
    gap: 6rem;
`;

export const Container = styled(Box)`
    flex-direction: column;
    gap: 2rem;
    padding: 0;
    width: 50%;
`;

export const Kra = styled(BadgeWrapper)`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 0.5rem;
    width: 22rem;
    height: 12rem;
    padding: 0 1rem;
    flex: 1 1 0;
    background-color: #276cd31a;
    color: #08439b;
`;

export const KrasContainer = styled(Box)`
    flex-direction: row;
    gap: 2rem;
    padding: 0;
`;

export const MetricsContainer = styled(Box)`
    min-width: 50%;
    flex-direction: column;
`;

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
    textWeight: 'Strong'
})`
    font-size: ${({ theme }) => theme.contentFontSize};
    p {
        font-weight: 400;
        margin-top: 10px;
    }

    p.list-text {
        margin-bottom: 0;
    }
`;
export const KraListHeader = styled(Text).attrs({
    textVariant: 'h4',
    textWeight: 'Medium'
})`
    font-size: ${({ theme }) => theme.contentFontSize};
    margin-bottom: 1rem;
    margin-left: -16px;
    span {
        font-weight: 400;
    }
    &.plain-text {
        margin-left: -38px;
        margin-bottom: 0;
    }
`;

export const StepText = styled(Text).attrs({
    textVariant: 'h4',
    textWeight: 'Regular'
})`
    font-size: ${({ theme }) => theme.contentFontSize};
    white-space: pre;
    margin-left: -16px;
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
    margin-left: 0;

    .KPI-title {
        margin-bottom: 2rem !important;
    }
`;

export const ResultText = styled(Text)`
    font-size: ${({ theme }) => theme.contentFontSize};
    margin-top: 1rem;
`;
