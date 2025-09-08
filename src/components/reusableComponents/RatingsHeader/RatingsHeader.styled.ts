import { Text } from '@medly-components/core';
import styled from 'styled-components';
import { BadgeWrapper as defaultBadge } from '../Badge/Badge.styled';

export const StyledBadge = styled(defaultBadge)`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 0.5rem;
    width: 22rem;
    height: 12rem;
    padding: 0;
    flex: 1 1 0;
    cursor: pointer;
    transition: transform 0.3s;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
        content: '';
        opacity: 0;
        z-index: -1;
    }

    &:hover,
    &:focus {
        transform: scale3d(1.006, 1.006, 1);

        &::after {
            opacity: 1;
        }
    }
`;

export const BadgeWrapper = styled('div')`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
`;

export const Container = styled('div')`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const TileTitle = styled(Text)`
    color: ${({ theme }) => theme.pageTitleColor};
    font-weight: 600;
`;

export const StyledRatingCardText = styled(Text).attrs({
    textVariant: 'h4',
    textWeight: 'Regular'
})`
    font-size: ${({ theme }) => theme.analyticsFontSize.content};
`;
