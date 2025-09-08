import { DateRangeType } from '@medly-components/core';

export interface FilterState {
    dateRange: DateRangeType;
    feedbackType: number;
}

export type Partial<T> = { [P in keyof T]?: T[P] };
