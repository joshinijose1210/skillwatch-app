import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const ChartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    height: 32rem;
    gap: 2rem;
    margin-top: 4rem;
    width: calc(70% - 1rem);

    @media (max-width: 1150px) {
        gap: 2rem;
    }
    @media (max-width: 1024px) {
        gap: 0;
    }
`;

export const ChartWrapper = styled.div`
    display: flex;
    border: 1px solid #fff;
    background-color: ${({ theme }) => theme.customColors.anlyticsPageCardBackground};
    flex-direction: column;
    padding: 3rem;
    align-items: baseline;
    border-radius: 8px;
    gap: 4rem;
    width: 46%;
    height: 34rem;

    > div:nth-child(2) {
        height: 20rem !important;
        @media (min-width: 1400px) {
            height: 22rem !important;
        }
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

export const TypeText = styled(Text)`
    margin-left: 1.5rem;
    font-size: 1.2rem;
`;

export const CustomTooltip = styled.div`
    padding: 0.5rem 0.8rem;
    border-radius: 0.2rem;
    color: #fff;
    background: #5c5c5c;
    position: relative;

    ::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #5c5c5c transparent transparent transparent;
    }
`;
