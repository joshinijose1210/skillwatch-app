import { Button, Text } from '@medly-components/core';
import styled from 'styled-components';

export const ListHeaderText = styled(Text)<{ titleColor?: string }>`
    font-size: 2rem;
    color: ${({ titleColor, theme }) => titleColor || theme.pageTitleColor};
`;
export const ListHeaderButton = styled(Button)<{ variant: string }>`
    ${props =>
        props.variant === 'flat' &&
        `
            span {
                font-size: 1.6rem;
                font-weight: 600;
                line-height: 1.6rem;
                text-decoration: underline;
            }

            &::after {
                display: none;
            }
        `}
`;

export const ListTitle = styled.div``;

export const TwoButtons = styled.div`
    display: flex;
    column-gap: 1rem;
`;
