export type ReviewCycleType = {
    id: number;
    startDate: Date;
    endDate: Date;
    lastModified: Date;
    draft?: boolean;
    publish?: boolean;
    updatedAt?: Date;
    selfReviewStartDate: Date;
    selfReviewEndDate: Date;
    managerReviewStartDate: Date;
    managerReviewEndDate: Date;
};

export type ReviewCycleColType = {
    reviewCycle?: string;
    lastModified?: Date;
};
