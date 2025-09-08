import bulbOn from '@constants/images/icons/lightbulb_off.png';
import bulbOff from '@constants/images/icons/lightbulb_on.png';
import { Text } from '@medly-components/core';
import styled, { css } from 'styled-components';
import { MultiSelect } from '@medly-components/core';
import { StyledToggleWrapper } from '@common';

const getBackgroundColor = (theme: any, feedbackTag?: number) => {
    return css`
        background-color: ${theme.colors.grey[50]};
    `;
};

export const FlexBoxRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 4rem;
`;

export const SendButtonBox = styled.div`
    display: flex;
    justify-content: end;
    gap: 1rem;
`;

export const FlexBoxColumn = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;
    min-width: 500px;
`;

export const ErrorBox = styled.div`
    display: flex;
    justify-content: end;
`;

export const StyledContainer = styled.div`
    display: flex;
`;

export const BulbImg = styled.div`
    background-image: url(${bulbOff});
    background-position: center;
    background-size: contain;
    width: 2.8rem;
    height: 2.8rem;
    background-repeat: no-repeat;
    margin-left: 0.5rem;
`;

export const TipContainer = styled.div<{ feedbackTag?: number }>`
    ${({ feedbackTag, theme }) => getBackgroundColor(theme, feedbackTag)}
    margin: 0 0 2rem 2rem;
    border-radius: 1rem;
    padding: 2rem;
    color: ${({ theme }) => theme.colors.grey[600]};
    &:hover ${BulbImg} {
        background-image: url(${bulbOn}) !important;
    }
`;

export const TipHeaderText = styled.div`
    color: black;
    display: flex;
    align-items: flex-end;
    margin-bottom: 2rem;

    ${Text.Style} {
        line-height: unset;
    }
`;

export const ToggleWrapper = styled(StyledToggleWrapper)`
    width: calc(50% - 20px);

    div {
        display: flex;
        justify-content: space-between;
    }
`;

export const MultiSelectWrapper = styled(MultiSelect)`
    max-height: 60px;
    max-width: 25rem;
    margin: 0;

    #enteremail-selected-chips {
        height: fit-content;
    }

    div > div {
        height: 4.5rem;
    }

    div > div > input {
        line-height: 1.9rem;
        font-size: 1.3rem;
        &::placeholder {
            color: transparent;
        }
    }

    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }
    > :last-child {
        min-width: 100%;
        width: fit-content;
        ${Text.Style} {
            font-size: 1.3rem;
        }
        > ul {
            max-height: 30rem;
        }
    }
`;
