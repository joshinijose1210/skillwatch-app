import { Accordion, Text } from '@medly-components/core';
import styled, { css } from 'styled-components';
import { ItemStatus } from './types';
import { StyledProps } from '@common/types';

export const ContentWrapper = styled.div<{ isSticky?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: ${({ isSticky }) => (isSticky ? 'flex-start' : 'inherit')};
    .vertical-timeline {
        padding: 0;
        margin: 0 0 3rem 0;
        width: fit-content;
        height: fit-content;
    }

    .vertical-timeline-element {
        margin: 3rem 0;
        &:first-child {
            margin-top: 0;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }

    .vertical-timeline-element-content:last-of-type {
        .vertical-timeline-element-date {
            display: none;
        }
    }

    #sub-item {
        margin: 1rem 0;
    }
`;

export const TimelineContentWrapper = styled.button`
    color: ${({ theme }) => theme.contentColor};
    height: 35px;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
    text-align: left;
`;

export const StyledLinkTitle = styled(Text)<{ state: ItemStatus; noUnderline?: boolean }>`
    color: ${({ theme, state }) =>
        state === 'active' || state === 'ongoing' ? theme.colors.blue[500] : state === 'complete' ? '#1f1f1f' : theme.colors.grey[700]};
    cursor: ${({ state }) => state !== 'disabled' && 'pointer'};
    font-size: ${({ theme }) => theme.contentFontSize};
    &:hover {
        ${({ state, noUnderline }) =>
            noUnderline
                ? css`
                      text-decoration: none;
                      cursor: default;
                  `
                : state !== 'disabled'
                ? css`
                      text-decoration: underline;
                  `
                : ''}
    }
`;

export const StyledLink = styled(Text)<{ state: ItemStatus; noUnderline?: boolean }>`
    color: ${({ theme, state }) =>
        state === 'active' || state === 'ongoing' ? theme.colors.blue[500] : state === 'complete' ? '#1f1f1f' : theme.colors.grey[700]};
    cursor: ${({ state }) => state !== 'disabled' && 'pointer'};
    font-size: 13px;
    &:hover {
        ${({ state, noUnderline }) =>
            noUnderline
                ? css`
                      text-decoration: none;
                      cursor: default;
                  `
                : state !== 'disabled'
                ? css`
                      text-decoration: underline;
                  `
                : ''}
    }
`;

export const StyledAccordionHead = styled(Accordion.Header)<StyledProps>`
    background-color: #e6effd;
    padding: 0.5rem 1.8rem;
`;

export const StyledAccordionContent = styled(Accordion.Content)<{ active?: boolean }>`
    background-color: #fbfbfb;
    padding: 0.5rem 1.8rem;
    margin-bottom: ${({ active }) => (active ? '1rem' : 0)};
`;

export const TableSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 38rem;
`;

export const Table = styled.div`
    border: 2px solid #bdbdbd;
    border-radius: 5px;
    height: fit-content;
    min-width: 300px;
`;

export const TableHeader = styled.div`
    border-bottom: 2px solid #bdbdbd;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 3px 6px;
`;

export const TableContent = styled.div<{ quickLinks?: boolean }>`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    row-gap: ${({ quickLinks }) => (quickLinks ? '1.5rem' : '1rem')};
`;

export const QuickLink = styled(Text)`
    align-items: center;
    color: ${({ theme }) => theme.colors.blue[500]};
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const Index = styled.div<{ backgroundColor: any }>`
    position: relative;
    background-color: ${({ backgroundColor }) => backgroundColor};
    width: 27px;
    height: 27px;
    border-radius: 15px;

    ${Text.Style} {
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const AccordionHeader = styled(Accordion.Header)<StyledProps>`
    padding: 1rem 1.5rem;
    background-color: #ecf0f5;
    border: 1.5px solid #bfbfbf;
`;

export const AccordionContent = styled(Accordion.Content)<{ noSidePadding?: boolean }>`
    padding: ${({ noSidePadding }) => (noSidePadding ? '1.5rem 0 0 0' : '1.5rem')};
    border: 1.5px solid #bfbfbf;
    border-top: none;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const ContentText = styled(Text)`
    color: ${({ theme }) => theme.colors.grey[700]};
`;

export const StyledAccordion = styled(Accordion)<StyledProps>``;
