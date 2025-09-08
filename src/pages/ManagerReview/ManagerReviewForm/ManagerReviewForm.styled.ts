import { Accordion, Button, Text } from '@medly-components/core';
import styled, { css } from 'styled-components';

export const KpiAccordion = styled(Accordion)<{ hasError?: boolean }>`
    ${({ hasError }) =>
        hasError &&
        css`
            ${Accordion.Header.Style} {
                background-color: ${({ theme }) => theme.colors.red[200]};
                border-color: ${({ theme }) => theme.colors.red[500]};
            }
            ${Accordion.Content.Style} {
                border-top: none;
            }
        `}
`;

export const AccordionHeader = styled(Accordion.Header)<{ onClick?: React.MouseEventHandler }>`
    padding: 1rem 1.5rem;
    background-color: #e6effd;
    border: 1.5px solid #88b5ff;
    margin-top: 1rem;
`;

export const AccordionContent = styled(Accordion.Content)`
    padding: 0 1.5rem;
    background-color: #ecf0f5;
    border: 1.5px solid #88b5ff;
    overflow: visible;
`;

export const KPIWrapper = styled.div`
    width: 50%;
    position: sticky;
    top: 4rem;
`;

export const KpiDescriptionContainer = styled.div`
    overflow-wrap: break-word;
    border-radius: 1rem;
    margin-bottom: 1rem;
    margin-top: 2rem;
    ${Text.Style} {
        line-height: 1rem;
    }
    p {
        margin: 0;
        font-size: ${({ theme }) => theme.contentFontSize};
        span {
            color: ${({ theme }) => theme.contentColor} !important;
        }
    }
`;

export const ButtonSection = styled.div`
    display: flex;
    width: 100%;
    margin-top: 5rem;
    gap: 1rem;
`;

export const CancelButton = styled(Button)`
    margin-left: auto;
    &:not(:disabled):not(:hover),
    &:not(:disabled):not(:active):hover,
    &:not(:disabled):active:hover {
        color: red;
    }
    &:not(:disabled):not(:hover)::after,
    &:not(:disabled):not(:active):hover::after,
    &:not(:disabled):active:hover::after {
        border-color: red;
    }
`;

export const ReviewToDiv = styled.div`
    display: flex;
`;

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1rem;
    ${Text.Style} {
        font-size: 1.5rem;
    }
`;

export const ReviewInputContainer = styled.div`
    margin-top: 0;
`;

export const EditorContainer = styled.div`
    margin-top: 4rem;
    height: auto;
`;

export const FlexRow = styled.div<{ gap?: number }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ gap }) => gap || 0}px;
`;

export const NavigationContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
`;

export const KpiNavigtionButton = styled(Text).attrs({
    textWeight: 'Medium',
    textVariant: 'body1'
})<{ disabled?: boolean }>`
    cursor: pointer;
    color: ${({ disabled, theme }) => (disabled ? theme.colors.grey[400] : theme.contentColor)};
`;

export const StyledReviewLabel = styled(Text).attrs({
    textVariant: 'body1',
    textWeight: 'Regular'
})`
    font-size: ${({ theme }) => theme.contentFontSize};
    span {
        font-size: ${({ theme }) => theme.contentFontSize};
    }
`;
