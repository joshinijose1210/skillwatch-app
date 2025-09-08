import { Accordion, Button, SingleSelect, Text, TextField } from '@medly-components/core';
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
    padding-right: 2rem;
`;

export const KpiContainer = styled.div`
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.colors.grey[100]};
    border-radius: 5px;
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

export const RatingPicker = styled(SingleSelect)`
    margin: 0;
    max-height: 45px;
    max-width: 30rem;

    div > div > input {
        line-height: 1.9rem;
        font-size: 13px;
        &::placeholder {
            font-size: 13px;
            color: transparent;
        }
    }

    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }

    #rating-options {
        max-height: 22rem;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const ResponseInput = styled(TextField)`
    margin: 1.5rem 0;
    max-width: 30rem;
    div > div > input {
        line-height: 1.9rem;
    }
    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }

    span {
        position: absolute;
        top: 120px;
    }

    div:nth-child(1) {
        box-sizing: content-box;
        height: 100px;
    }
`;

export const ButtonSection = styled.div`
    display: flex;
    width: 100%;
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

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1rem;
    ${Text.Style} {
        font-size: 1.5rem;
    }
`;

export const ScreenWidthWrapper = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const ReviewInputContainer = styled.div`
    margin-top: 0;
`;

export const EditorContainer = styled.div`
    margin-top: 2rem;
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

export const RichTextEditorWrapper = styled.div`
    height: auto;
    .ql-editor {
        height: 22rem;
        overflow-y: none;
    }
`;
