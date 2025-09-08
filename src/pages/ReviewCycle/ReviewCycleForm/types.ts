import { DateRangeType } from '@medly-components/core';

export interface ReviewCycleFormInputs {
    reviewCycle: DateRangeType;
    selfReview: DateRangeType;
    managerReview: DateRangeType;
    checkInWithManager: DateRangeType;
    publish: boolean;
    organisationId: number;

    errors: {
        reviewCycle: string;
        selfReview: string;
        managerReview: string;
        checkInWithManager: string;
    };
}
