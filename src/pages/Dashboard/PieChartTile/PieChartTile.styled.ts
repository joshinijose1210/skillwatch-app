import { SingleSelect, Text } from '@medly-components/core';
import styled from 'styled-components';

export const StyledBox = styled.div<{ isLineChart?: boolean }>`
    margin-bottom: 1rem;
    border: 1px solid #fff;
    background-color: rgb(235 241 250 / 40%);
    border-radius: 8px;
    width: calc(50% - 1rem);
    padding: 2rem 2rem;
`;

export const ChartContainer = styled.div<{ isLineChart?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    height: 20rem;
    padding: 2rem 0;
    width: 90%;
    margin: 0 auto;

    @media (max-width: 1150px) {
        gap: 2rem;
    }
    @media (max-width: 1024px) {
        gap: 0;
    }
`;

export const HeadContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    @media (max-width: 1100px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
`;

export const TileTitle = styled(Text)`
    color: ${({ theme }) => theme.pageTitleColor};
    font-weight: 600;
`;

export const InfoSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 2.4rem;
    row-gap: 1.2rem;
`;

export const ColorScheme = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const Color = styled.div<{ bgColor: string }>`
    width: 1.1rem;
    height: 1.1rem;
    background-color: ${({ bgColor }) => bgColor};
    margin-right: 0.5rem;
    border-radius: 50px;
    position: absolute;
`;

export const StyledSingleSelect = styled(SingleSelect)`
    max-height: 4rem;
    max-width: 30rem;
    margin: 0;
    font-size: 13px;

    div > div > input {
        line-height: 1.9rem;
        &::placeholder {
            font-size: 13px;
            color: transparent;
        }
    }

    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }
`;

export const StyledRating = styled.span`
    font-size: xx-large;
    color: ${({ theme }) => theme.customColors.defaultChartColor};

    @media (max-width: 1050px) {
        font-size: 30px;
    }
`;

export const TypeText = styled(Text)`
    margin-left: 1.5rem;
    font-size: 1.2rem;
`;
