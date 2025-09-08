import { Text } from '@medly-components/core';
import customColors from '@theme/core/colors';
import styled from 'styled-components';
import { StyledAccordionHead, StyledAccordion } from '../../../src/pages/ReviewTimeline/ReviewTimeline.styled';

export const StyledHead = styled(StyledAccordionHead)`
    width: 100%;
`;
export const AccordionContainer = styled.div`
    &.col-2 svg:last-child {
        right: 5.5% !important;
    }
    &.col-4 svg:last-child {
        right: 4.7% !important;
    }

    &.col-7 svg:last-child {
        right: 3.5% !important;
    }
`;

export const StyledAccord = styled(StyledAccordion)``;

export const TableContainer = styled.div`
    margin: 20px 0;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border: none;
`;

export const TableHead = styled.thead`
    th {
        border: none;
        width: 5rem;
        max-width: 5rem;
        text-align: left;
        padding: 8px;
        font-weight: bold;
        &:first-child {
            width: 25rem !important;
            max-width: 25rem !important;
            padding-left: 0;
        }
        &:last-child {
            padding-right: 0;
        }
    }
`;

export const TableRow = styled.tr<{ isKra: boolean }>`
    &:hover {
        background-color: ${({ isKra }) => !isKra && customColors.kpiRowHighlightColor};
    }
`;

export const TableCell = styled.td`
    border: none;
    text-align: center;
    padding: 8px;
    &:first-child {
        padding-left: 0;
    }
    &:last-child {
        padding-right: 0;
    }
`;

export const ViewButton = styled.button`
    color: ${customColors.viewBlueColor};
    font-family: inherit;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.contentFontSize};
    border-radius: 4px;
    background-color: transparent;
`;

export const StyledKRAText = styled(Text).attrs({
    textVariant: 'h4',
    textWeight: 'Regular'
})`
    font-size: ${({ theme }) => theme.contentFontSize};
    color: ${({ theme }) => theme.contentColor};
`;

export const StyledText = styled(StyledKRAText).attrs({
    textAlign: 'center'
})``;
