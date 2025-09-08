import { Chip, Text } from '@medly-components/core';
import { ProgressId } from '@pages/ViewPreviousGoals/types';
import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

export const ActionItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    column-gap: 1rem;
    align-items: flex-start;

    ${Text.Style} {
        font-size: 1.4rem;
    }

    &:hover {
        ${Text.Style} {
            color: ${({ theme }) => theme.colors.blue[500]};
        }
    }
`;

export const ActionItemsDiv = styled.div`
    gap: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2rem;
`;

export const NoActionItemDiv = styled.div`
    min-height: 124px;
    padding: 0 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledText = styled(Text)`
    display: flex;
    align-items: flex-start;

    svg {
        margin-top: 0;
    }
`;

export const StyledChip = styled(Chip)<{ progressId: ProgressId }>`
    border: white;
    margin: 0;
    padding: 0.5rem;
    min-width: 100px;
    ${Text.Style} {
        font-size: 1.1rem !important;
        color: #fff;
    }
    background-color: ${({ theme, progressId }) =>
        progressId === 1
            ? theme.customColors.ToDoColor //gray
            : progressId === 2
            ? theme.customColors.inProgressColor //yellowish-orange
            : progressId === 3
            ? theme.customColors.completedColor //green
            : theme.colors.yellow[700]};
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
    height: 100%;
    display: flex;
    margin-bottom: 1rem;
`;
