import { Box, Text } from '@medly-components/core';
import { defaultTheme } from '@medly-components/theme';
import styled, { css } from 'styled-components';

export const AvatarMenu = styled.div`
    z-index: 10;
`;

export const Wrapper = styled.ul`
    list-style: none;
    margin-left: -4rem;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 65px;
    right: 20px;
    background-color: ${defaultTheme.colors.white};
    border-radius: 8px;
    padding: 10px;
    width: 300px;
    border: 1px solid ${defaultTheme.colors.grey[300]};
    box-shadow: 5px 5px 20px ${defaultTheme.colors.grey[400]};

    &::before {
        content: '';
        position: absolute;
        top: -5px;
        right: 20px;
        background: ${defaultTheme.colors.white};
        transform: rotate(45deg);
    }

    &.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        transition: 500ms ease;
    }

    &.inactive {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-20px);
        transition: 500ms ease;
    }
`;

export const MenuTrigger = styled.div`
    overflow: hidden;
    cursor: pointer;
    background-color: ${defaultTheme.colors.white};
`;

export const AvatarList = styled.li`
    height: 80px;
    width: 80px;
    margin: auto;
    margin-bottom: 1rem;
`;

export const EmailList = styled.li<{ isPopoverClosed: boolean }>`
    text-align: center;

    #medly-popover-wrapper h5 {
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 300px;
    }

    ${({ isPopoverClosed }) =>
        isPopoverClosed &&
        css`
            #medly-popover-wrapper #medly-popover-popup {
                display: none;
            }
        `}
`;

export const SignOutButtonList = styled.li`
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.customColors.borderColor};
    margin-top: 1rem;
`;

export const StyledLabel = styled(Text).attrs({
    textVariant: 'h5',
    textAlign: 'center',
    textWeight: 'Medium'
})`
    span {
        font-weight: normal;
    }
`;

export const StyledBox = styled(Box)`
    margin: 0;
    padding: 0;
    row-gap: 5px;
    flex-direction: column;
`;
