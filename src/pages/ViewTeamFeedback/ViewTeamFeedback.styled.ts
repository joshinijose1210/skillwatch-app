import { ParentStyledTabs } from '@common';
import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const FeedbackWrapper = styled.div`
    border-bottom: 2px solid ${({ theme }) => theme.colors.grey[200]};
    padding: 1rem 1rem 2rem;
    display: flex;
    gap: 2px;
    p {
        margin: 0;
    }
    .team-feedback {
        overflow-wrap: break-word;
        width: 100%;
    }
    &:last-child {
        border-bottom: none;
    }
`;

export const StyledTabs = styled(ParentStyledTabs)`
    #feedback-tabs-list {
        overflow: hidden;
    }
    #feedback-tabs-panel-positive,
    #feedback-tabs-panel-constructive,
    #feedback-tabs-panel-improvement,
    #feedback-tabs-panel-appreciation {
        margin: 0;
        padding: 1rem;
        border: 2px solid ${({ theme }) => theme.colors.blue[200]};
        border-radius: 5px;
        border-top-left-radius: 0;
        width: 98%;
    }

    button[aria-selected='false'] div div span:nth-of-type(2) {
        color: #666;
        background-color: ${({ theme }) => theme.colors.grey[200]};
    }

    button[aria-selected='false']:hover div div span:nth-of-type(2) {
        background-color: ${({ theme }) => theme.colors.grey[200]};
    }

    button[aria-selected='false'] svg path {
        fill: #666;
    }
`;

export const TabContentWrapper = styled.div`
    border: 2px solid aliceblue;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 100%;
`;

export const RightColumn = styled.div``;

export const Feedback = styled.div`
    margin-bottom: 1rem;
    font-size: 1.5rem;
    line-height: 1.8rem;
    letter-spacing: 0;
`;

export const StyledDate = styled(Text)`
    line-height: 0.5rem;
    color: ${({ theme }) => theme.customColors.fullGrey};
    opacity: 0.5;
    font-weight: 700;
    margin-top: 5px;
    padding-left: 1.2rem;
`;
