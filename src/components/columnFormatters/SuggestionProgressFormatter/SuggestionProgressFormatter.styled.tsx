import { ProgressLabel } from '@common';
import { Chip, Text } from '@medly-components/core';
import { defaultTheme } from '@medly-components/theme';
import styled from 'styled-components';

export const StyledChip = styled(Chip)<{ label: string }>`
    border: white;
    margin: 0;
    padding: 0.5rem;
    min-width: 100px;
    ${Text.Style} {
        font-size: 1.1rem !important;
        color: #fff;
    }
    background-color: ${({ label, theme }) => {
        switch (label) {
            case ProgressLabel.Completed:
                return theme.customColors.positive;
            case ProgressLabel.ToDo:
                return theme.customColors.ToDoColor;
            case ProgressLabel.Deferred:
                return theme.customColors.unacceptable;
            case ProgressLabel.InProgress:
                return theme.customColors.improvement;
            default:
                return defaultTheme.colors.yellow[700];
        }
    }};
`;
