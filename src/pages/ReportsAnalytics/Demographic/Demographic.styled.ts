import { Box, Text } from '@medly-components/core';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    border: 1px solid #fff;
    background-color: ${({ theme }) => theme.customColors.anlyticsPageCardBackground};
    flex-direction: column;
    padding: 3rem;
    gap: 3rem;
    align-items: baseline;
    border-radius: 8px;
`;

export const GenderAnalyticsSection = styled.div`
    width: 60%;
    display: flex;
    justify-content: space-between;
    flex: 1;
    margin-right: 10rem;
`;

export const StyledContent = styled.div`
    width: 98%;
    display: flex;
    justify-content: space-between;
    margin: auto;
`;

export const GenderContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
        width: 1.8rem;
        height: 5.9rem;
    }
    .female,
    .other {
        width: 2.5rem;
        height: 6.2rem;
    }
`;

export const GenderContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    span,
    strong {
        font-size: 1.6rem;
    }
    .value {
        font-size: 2rem;
    }

    ${Box.Style} {
        align-items: center;
        gap: 0.5rem;
        padding: 0;
    }
`;

export const AverageContentSection = styled(GenderContent)`
    align-items: center;
    justify-content: center;
    border-left: 1px solid #d9d9d9;
    padding: 1rem 3rem;
    width: 16%;
    ${Box.Style} {
        gap: 0.4rem;
    }
`;

export const StyledDivider = styled(Text)`
    font-size: 2.2rem;
`;

export const StyledText = styled(Text)`
    font-size: 1.4rem !important;
`;

export const DemographicLabel = styled(Text).attrs({
    textColor: '#666'
})`
    font-size: ${({ theme }) => theme.analyticsFontSize.content} !important;
`;
