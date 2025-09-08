import bulbOn from '@constants/images/icons/lightbulb_off.png';
import bulbOff from '@constants/images/icons/lightbulb_on.png';
import { Text } from '@medly-components/core';
import styled, { css } from 'styled-components';

interface ColorInterface {
    [key: string]: string;
}

export const colors: ColorInterface = {
    1: '#5CBE4C26',
    2: '#F2A14226',
    3: '#F0EDFF'
};

const getBackgroundColor = (theme: any, feedbackTag?: number) => {
    if (feedbackTag) {
        return css`
            background-color: ${colors[feedbackTag]};
        `;
    }
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
    color: ${({ theme }) => theme.tipsColor.content};
    &:hover ${BulbImg} {
        background-image: url(${bulbOn}) !important;
    }
`;

export const TipHeaderText = styled.div`
    color: ${({ theme }) => theme.tipsColor.title};
    display: flex;
    align-items: flex-end;
    margin-bottom: 2rem;

    ${Text.Style} {
        line-height: unset;
    }
`;
