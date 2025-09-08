import { Button, Text } from '@medly-components/core';
import styled from 'styled-components';

export const KPIElement = styled.div`
    text-align: left;
`;

export const KPIWrapper = styled.div`
    width: 50%;
    padding-right: 2rem;
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
        color: ${({ theme }) => theme.contentColor} !important;
        span {
            color: ${({ theme }) => theme.contentColor} !important;
        }
    }
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

export const ErrorDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    color: ${({ theme }) => theme.colors.red[400]};
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
