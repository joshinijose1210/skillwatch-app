import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const FeedbackLayer = styled.div`
    display: flex;
    flex-direction: column;
    span {
        font-size: ${({ theme }) => theme.contentFontSize};
    }
`;

export const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 65%;
    gap: 2rem;
    margin-left: 1rem;
`;

export const StyledHeading = styled(Text)`
    font-size: ${({ theme }) => theme.contentFontSize};
`;
export const StyledHTMLText = styled(Text)`
    p {
        word-wrap: break-word;
        margin-block-start: 0;
        font-size: ${({ theme }) => theme.contentFontSize};
    }
`;
export const StyledEmployeeRole = styled(Text)`
    color: ${({ theme }) => theme.colors.grey[500]};
`;
