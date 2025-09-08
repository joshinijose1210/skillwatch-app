import { Text } from '@medly-components/core';
import styled, { css } from 'styled-components';

export const StyledBox = styled.div`
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    border: 1px solid #fff;
    border-radius: 8px;
`;

export const ListHeaderDiv = styled.div<{ hasBorder?: boolean }>`
    ${({ hasBorder }) =>
        hasBorder === false
            ? css``
            : css`
                  border-top: 2px solid ${({ theme }) => theme.colors.grey[200]};
              `};
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    padding-bottom: 1rem;

    ${Text.Style} {
        color: ${({ theme }) => theme.pageTitleColor};
        font-weight: 600;
    }
`;

export const ItemsWrapper = styled.div`
    padding: 2rem;
    min-height: 84px;
    align-items: center;
`;

export const Item = styled.div<{ scaleUpSvg?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;

    ${({ scaleUpSvg }) =>
        scaleUpSvg &&
        css`
            svg {
                width: 20px;
                height: 20px;
                fill: #607890;
            }
        `}
`;
