import { Breadcrumb as MedlyBreadcrumb, Text, Toast } from '@medly-components/core';
import { SvgIcon } from '@medly-components/icons';
import { defaultTheme } from '@theme';
import styled from 'styled-components';

export const Header = styled('header')`
    min-height: 6.2rem;
    border-bottom: 1px solid ${({ theme }) => theme.customColors.borderColor};
    background-color: ${defaultTheme.colors.white};
    box-shadow: 0 0.2rem 8 ${defaultTheme.colors.grey[50]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    @media (max-width: 1279px) {
        padding-left: 1.6rem;
        padding-right: 1.6rem;
    }

    @media (min-width: 1280px) {
        padding-left: calc(1.6rem + (((100vw - 1280px) / 160) * 16));
        padding-right: calc(2.8rem + (((100vw - 1280px) / 160) * 16));
    }

    @media (min-width: 1440px) {
        padding-left: 2.4rem;
        padding-right: 2.4rem;
    }
`;

export const LeftSide = styled('div')`
    display: flex;
    align-items: center;

    & > * {
        margin-right: ${({ theme }) => theme.spacing.S2};
    }

    svg {
        font-size: 2rem;
        * {
            fill: #999;
        }
    }
`;

export const DashboardHeading = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Welcome = styled(Text)`
    font-size: 16px;
    color: ${({ theme }) => theme.pageTitleColor};
    line-height: 35px;
    position: relative;
    left: -0.8rem;
`;

export const RightSide = styled('div')`
    display: flex;
    align-items: center;
    & > * {
        margin-left: ${({ theme }) => theme.spacing.S2};
    }
`;

export const BreadcrumbItem = styled(MedlyBreadcrumb.Item)`
    margin-left: -0.6rem;
    ${Text.Style} {
        color: #999;
        font-size: ${defaultTheme.font.variants.h6.fontSize};
        font-weight: ${defaultTheme.font.weights.Medium};
        line-height: 2.4rem;
        letter-spacing: -0.02rem;
    }
`;

export const StyledToast = styled(Toast)`
    cursor: pointer;
    margin-right: 1.5rem;
    transition: transform 0.2s;
    box-shadow: 1px 0 6px ${defaultTheme.colors.grey[400]};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-left: 0.4rem solid orange;

    div:first-child {
        align-items: center;
    }

    div:nth-child(1) {
        background-color: rgba(255, 165, 0, 0.1);
    }

    div:nth-child(2) {
        padding: 0.8rem 1.6rem;
    }

    div:nth-child(3) {
        display: none;
    }

    svg:nth-child(1) {
        * {
            fill: orange;
        }
    }

    svg[title='toast-close-icon'] {
        margin-left: 1rem;
    }
`;

export const ToastContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent !important;
    ${SvgIcon} {
        transition: all 100ms ease-out;
        background-color: transparent;
        * {
            fill: ${({ theme }) => theme.colors.black};
        }
        &:hover {
            background-color: ${({ theme }) => theme.colors.grey[100]};
        }
    }
`;
