import { Text } from '@medly-components/core';
import styled from 'styled-components';

export const TipHeader = styled(Text)`
    margin: 1rem 0;
`;

export const RequestFeedbackTipHeader = styled(Text)<{ margin?: string }>`
    margin: ${({ margin }) => `${margin}`};
`;

export const StepsList = styled.ul`
    list-style: none;
`;

export const Step = styled.li`
    margin-top: 1rem;
    position: relative;
    &::before {
        display: inline-block;
        content: '';
        border-radius: 0.375rem;
        height: 0.75rem;
        width: 0.75rem;
        margin-right: 0.5rem;
        position: absolute;
        left: -35px;
        top: 5px;
        background-color: #bdbdbd;
    }
    ::marker {
        top: 0;
    }
`;
