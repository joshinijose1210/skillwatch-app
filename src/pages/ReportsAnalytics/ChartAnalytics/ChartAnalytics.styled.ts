import styled from 'styled-components';

export const ChartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    height: 32rem;
    gap: 2rem;
    width: 100%;

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
    width: 70%;
    height: 34rem;
`;

export const PieChartWrapper = styled(ChartWrapper)`
    width: 25%;

    > div:nth-child(2) {
        height: 20rem !important;
        @media (min-width: 1400px) {
            height: 22rem !important;
        }
    }
`;

export const FullChartWrapper = styled(ChartWrapper)`
    width: 100%;
    height: 38rem;
`;

export const Text = styled.p`
    font-size: 11px;
    text-overflow: ellipsis;
    max-width: 90px;
    overflow: hidden;
    font-family: sans-serif;
    text-align: center;
    margin: 5px;
`;
