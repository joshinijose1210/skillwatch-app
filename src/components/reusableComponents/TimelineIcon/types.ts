import { ItemStatus } from '@pages/ReviewTimeline/types';

export interface TimelineIconProps {
    state: ItemStatus;
    number?: number;
    isSubTask?: boolean;
    subTaskState?: ItemStatus;
    isAccordionTask?: boolean;
}
