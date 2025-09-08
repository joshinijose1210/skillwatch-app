import { ParentStyledTabs, StyledMultiSelect } from '@common';
import { Button } from '@medly-components/core';
import styled from 'styled-components';

export const StyledTabs = styled(ParentStyledTabs)`
    margin-top: 3rem;
    button {
        min-width: 25rem;
    }
    div[role='tabpanel'] {
        display: none;
    }

    button[aria-selected='false'] div div span:nth-of-type(2) {
        color: #666;
        background-color: ${({ theme }) => theme.colors.grey[200]};
    }

    button[aria-selected='false']:hover div div span:nth-of-type(2) {
        background-color: ${({ theme }) => theme.colors.grey[200]};
    }

    button[aria-selected='false'] svg path {
        fill: #666;
    }
`;

export const StyledTableWrapper = styled('div')`
    table {
        margin-top: 0;
        border-radius: 0 0.8rem 0.8rem 0.8rem;
    }
`;
export const StyledDiv = styled('div')``;

export const StyledButton = styled(Button)`
    width: fit-content;
`;

export const StyledSelect = styled(StyledMultiSelect)`
    margin-right: 1rem;
`;
