import { Chip, Text } from '@medly-components/core';
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
    background-color: ${({ theme, label }) =>
        label == 'Positive' || label == 'Completed'
            ? theme.customColors.positive
            : label == 'Improvement' || label == 'Pending'
            ? theme.customColors.improvement
            : label == 'Appreciation'
            ? theme.customColors.appreciation
            : theme.colors.yellow[700]};
`;
