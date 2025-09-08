import { Text } from '@medly-components/core';
import { SvgIcon } from '@medly-components/icons';
import { SideNav } from '@medly-components/layout';
import styled, { css } from 'styled-components';
import { SideNavProps } from './types';

export const StyledText = styled(Text)<{ pl: string }>`
    padding-left: ${({ pl }) => `${pl}rem`};
`;

export const StyledIcon = styled.div<{ show: boolean }>`
    display: inline-block;
    transform: ${({ show }) => (show ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease;
`;

export const StyledFeedback = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Logo = styled.img``;

export const CompanyName = styled(Text)``;

export const LogoWrapper = styled.div`
    margin-top: 1rem;
    min-height: 42px;
    display: flex;
    align-items: flex-end;
    padding: 0 10px;
    justify-content: center;
    cursor: pointer;

    ${Logo} {
        height: 25px;
        margin-bottom: 1rem;
    }
    ${CompanyName} {
        margin-bottom: 1rem;
    }
`;

export const StyledNavEl = styled(SideNav.Nav)<{ isActive?: boolean; isSubItem?: boolean }>`
    grid-template-columns: calc(4.5rem) calc(14.6rem);
    min-height: 3.6rem;
    width: 90%;
    margin: 0 auto;
    background-color: ${({ isSubItem, theme }) => isSubItem && theme.colors.grey[50]};

    ${Text.Style} {
        color: #666;
    }

    svg path {
        fill: #666 !important;
    }

    &:hover {
        ${Text.Style} {
            color: ${({ theme }) => theme.contentColor};
        }
        ${SvgIcon}, svg, svg path {
            fill: #333 !important;
        }
    }

    ${({ isActive }) =>
        isActive &&
        css`
            border: 1px solid ${({ theme }) => theme.colors.blue[300]};
            background-color: #eff9ff;
            ${Text.Style} {
                box-shadow: 0 0 2.4rem #eff2f4;
                font-weight: 600;
                color: #3872d2;
            }
            ${SvgIcon}, svg {
                fill: #3872d2;
            }
        `}
    ${SvgIcon}, svg {
        width: 20px;
        height: 20px;
        padding: 0.8rem 1rem;
        fill: #666;
        visibility: ${({ isSubItem }) => (isSubItem ? 'hidden' : 'initial')};
    }
`;

export const StyledSideNav = styled(SideNav)<SideNavProps>`
    width: 21rem;
    box-shadow: rgba(96, 120, 144, 0.1) 0.2rem 0 6px;
    border-right: 1px solid #ddd;

    nav {
        width: 21rem;
        & > ${SideNav.List}:first-of-type {
            padding-top: 1rem;
        }

        ul:nth-child(5) {
            display: none;
            margin-top: 1rem;
            min-height: 6rem;
            li {
                min-height: 4rem;
                margin: 0.8rem;
                svg {
                    padding: 1rem;
                }
            }
        }
    }
`;

export const VersionText = styled(Text)`
    font-weight: 200;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    opacity: 0.8;
`;

export const PoweredText = styled(Text)`
    display: flex;
    width: 100%;
    justify-content: center;
    height: 100%;
    svg {
        margin-left: 3px;
        width: fit-content !important;
        height: 11px;
    }
`;

export const PoweredWrapper = styled.div`
    margin: 0 2rem;
    padding: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #dfe4e9;
`;

export const SuperAdminLogoWrapper = styled.div`
    margin-top: 1rem;
    min-height: 42px;
    display: flex;
    align-items: flex-end;
    padding: 0 10px;
    justify-content: center;
    cursor: pointer;
    width: 90%;

    svg {
        height: 25px;
        margin-bottom: 1rem;
    }
`;
