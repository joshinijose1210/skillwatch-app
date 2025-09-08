import { StyledModalContent as ParentStyledModalContent, StyledModalActions as ParentStyledModalActions } from '@common';
import { Chip, Text } from '@medly-components/core';
import { TagChipProps } from '@pages/Tutorial/types';
import styled from 'styled-components';

export const CardContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    padding: 1.5rem;
    height: 100%;
    overflow: hidden;
`;

export const StyledModalContent = styled(ParentStyledModalContent)`
    flex: 1;
    display: flex;
    background-color: #eff9ff;
    padding: 1rem;
`;

export const StyledModalActions = styled(ParentStyledModalActions)`
    background-color: #eff9ff;
    box-shadow: 0;
    padding: 0 1rem 1.5rem 0;
`;

export const StyledButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
`;

export const ThumbnailWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 45rem;
    overflow: hidden;
`;

export const ThumbnailImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: scale-down;
    display: block;
`;

export const Overlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(20, 20, 20, 0.35);
    z-index: 1;
`;

export const PlayButtonWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        height: 8rem;
        width: 8rem;
    }
`;

export const CardTitle = styled(Text).attrs({ textVariant: 'h4', textWeight: 'Medium' })`
    color: ${({ theme }) => theme.contentColor};
    font-size: ${({ theme }) => theme.tabTitleFontSize};
    height: 4rem;
`;

export const CardDescription = styled(Text).attrs({ textWeight: 'Regular' })`
    color: ${({ theme }) => theme.contentColor};
    font-size: ${({ theme }) => theme.contentFontSize};
    height: 9rem;
`;

export const TagChip = styled(Chip)<TagChipProps>`
    color: ${({ textColor }) => textColor || '#555'};
    span {
        font-size: ${({ theme }) => theme.modalFontSize.chip} !important;
    }
`;
