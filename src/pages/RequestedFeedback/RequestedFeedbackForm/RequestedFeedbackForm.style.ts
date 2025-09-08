import { Accordion, Text } from '@medly-components/core';
import styled from 'styled-components';
import { accordionHeaderBackgroundColors } from './constants';
import { StyleTextArea } from '@components/reusableComponents/TextDescription/TextDescription.styled';
import { StyledProps } from '@common';

export const StyledButtonWrapper = styled('div')`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

export const FlexBoxRow = styled('div')`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
`;

const getBorderColor = (hasError: boolean, action: 'Add' | 'View' | 'Edit', active?: boolean) => {
    if (active) {
        if (action === 'View') {
            return ' #98A7B7';
        } else if (action === 'Add' || action === 'Edit') {
            return '#c7d0d8';
        }
    } else if (hasError) return '#f03';
    else return 'transparent';
};

export const StyledAccordion = styled(Accordion)<StyledProps>``;
export const StyledAccordionHead = styled(Accordion.Header)<
    {
        hasError: boolean;
        feedbackTag: number;
        active?: boolean;
        action: 'Add' | 'View' | 'Edit';
    } & StyledProps
>`
    background-color: ${({ feedbackTag }) => accordionHeaderBackgroundColors[feedbackTag]};
    border: 1px solid ${({ hasError, active, action }) => getBorderColor(hasError, action, active)};
    border-bottom: 1px solid ${({ hasError, active, action }) => getBorderColor(hasError, action, active)};
    padding: 0.5rem 1.8rem;
`;

export const StyledAccordionContent = styled(Accordion.Content)<{ active?: boolean }>`
    margin-bottom: ${({ active }) => (active ? '1rem' : 0)};
`;

export const StyledHeading = styled(Text)<{ hasMarginTop?: boolean }>`
    margin-top: ${({ hasMarginTop }) => (hasMarginTop ? '1rem' : 0)};
    font-size: 1.4rem;
`;

export const StyledFeedbackFormTextArea = styled(StyleTextArea)`
    margin-top: unset;
    padding: unset;
    p {
        font-size: ${({ theme }) => theme.contentFontSize};
        margin: unset;
    }
`;

export const StyledText = styled(Text)`
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.9rem;
    font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
`;
