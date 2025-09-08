import styled from 'styled-components';

export const LineBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-end;
`;
export const RatingBarContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 1rem;
`;

export const ParentDiv = styled.div`
    height: 0.5rem;
    width: 100%;
    background-color: #dfe4e9;
    border-radius: 1.3rem;
`;

export const ChildDiv = styled.div<{ progress: any; bgcolor: any }>`
    height: 100%;
    width: ${({ progress }) => (progress === 0 ? 'none' : `${progress}%`)};
    background-color: ${({ bgcolor }) => bgcolor};
    border-radius: 1.3rem;
    text-align: 'right';
`;

export const RatingText = styled.span`
    font-weight: 700;
    color: ${({ theme }) => theme.customColors.defaultChartColor};
`;
export const RatingByText = styled.span`
    font-weight: 600;
    color: #666;
`;

export const ProgressBarContainer = styled.div`
    align-items: flex-end;
    width: 100%;
    gap: 3rem;
    display: flex;
    flex-direction: column;
`;
export const ChartWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 0;
`;

export const ChartTitle = styled.div`
    position: absolute;
    color: #666;
    top: 50%;
    left: 50%;
    font-weight: 600;
    transform: translate(-50%, -50%);
    text-align: center;
    @media (max-width: 1050px) {
        font-size: 1.2rem;
        line-height: 1.5rem;
    }
`;

export const TooltipContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 5px 8px;
    border: 1px solid #ccc;
    background-color: #fff;
`;

export const TooltipColor = styled.div<{ bgcolor: any }>`
    background-color: ${({ bgcolor }) => bgcolor};
    width: 15px;
    height: 15px;
`;
