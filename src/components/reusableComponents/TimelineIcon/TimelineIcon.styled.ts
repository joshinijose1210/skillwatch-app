import { ItemStatus } from '@pages/ReviewTimeline/types';
import styled from 'styled-components';

export const TimelineIconWrapper = styled.div<{ state: ItemStatus; isSubTask?: boolean; isAccordionTask?: boolean }>`
    width: ${({ isSubTask, isAccordionTask }) => (isAccordionTask ? '12.5px' : isSubTask ? '15px' : '35px')};
    height: ${({ isSubTask, isAccordionTask }) => (isAccordionTask ? '12.5px' : isSubTask ? '15px' : '35px')};
    position: relative;
    border-radius: 50%;
    background-color: ${({ state, theme, isSubTask }) =>
        state === 'active'
            ? isSubTask
                ? 'white'
                : theme.colors.blue[500]
            : state === 'complete'
            ? 'rgb(0, 158, 15)'
            : state === 'ongoing'
            ? '#ffd300'
            : isSubTask
            ? 'white'
            : theme.colors.blue[300]};
    border: ${({ theme, isSubTask, state }) =>
        isSubTask && (state === 'active' || state === 'disabled') && `1.5px dashed ${theme.colors.grey[700]}`};
    left: ${({ isSubTask }) => (isSubTask ? '8px' : '2px')};
    top: ${({ isSubTask }) => (isSubTask ? '4px' : 'initial')};
`;

export const Icon = styled.div<{ state: ItemStatus }>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: ${({ state }) =>
        state === 'complete' ? 'translate(-50%,0%)' : state === 'ongoing' ? 'translate(-50%, -70%)' : 'translate(-50%, -50%)'};
    color: #fff;
    font-weight: 700;
`;
