import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const TipHeader = styled(Text)`
    margin: 1rem 0;
    font-size: ${({ theme }) => theme.tipsFontSize.heading1};
    color: ${({ theme }) => theme.tipsColor.heading1};
`;

export const StepsList = styled.ul`
    list-style: none;
    margin-bottom: 0;

    &.tips-steps {
        margin-top: -6px;
    }

    &.score-list {
        margin-top: -6px;
    }
`;

export const Step = styled.li`
    margin-top: 1rem;
    position: relative;
    &::before {
        display: inline-block;
        content: '';
        border-radius: 0.375rem;
        height: 0.75rem;
        width: 0.75rem;
        margin-right: 0.5rem;
        position: absolute;
        left: -35px;
        top: 5px;
        background-color: #bdbdbd;
    }
    ::marker {
        top: 0;
    }
`;

export const FeedbackFormStepItem = styled.li`
    position: relative;
    &::before {
        display: inline-block;
        content: '';
        border-radius: 0.375rem;
        height: 0.75rem;
        width: 0.75rem;
        margin-right: 0.5rem;
        position: absolute;
        left: -35px;
        top: 5px;
        background-color: #bdbdbd;
    }
    ::marker {
        top: 0;
    }
`;

export const StyledText = styled(Text)<{ marginTop?: number }>`
    margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}rem` : 'unset')};
    font-size: 14px;
`;
