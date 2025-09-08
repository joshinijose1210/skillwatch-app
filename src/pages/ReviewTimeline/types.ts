import React from 'react';

export type ItemStatus = 'active' | 'disabled' | 'complete' | 'ongoing' | 'scheduled';

export type contentListItem = {
    state: ItemStatus;
    component: React.ReactNode;
};

export type ReviewTimelineAccordionProp = {
    header: string;
    contentList: contentListItem[] | [];
};

export type ItemStatusType = {
    startCycle: ItemStatus;
    selfReview: ItemStatus;
    managerReview: ItemStatus;
    managerReviewEmp?: {
        [k: string]: ItemStatus;
    };
    checkInWithManager: ItemStatus;
    checkInWithManagerEmp?: {
        [k: string]: ItemStatus;
    };
    endCycle: ItemStatus;
};

type EmployeeDetails = {
    id: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    firstManagerId: number;
    secondManagerId?: number;
    selfReviewDraft: boolean;
    selfReviewPublish: boolean;
    selfReviewDate?: number;
    firstManagerReviewDraft: boolean;
    firstManagerReviewPublish: boolean;
    secondManagerReviewDraft?: boolean;
    secondManagerReviewPublish?: boolean;
    secondManagerReviewDate?: number;
    checkInWithManagerDraft: boolean;
    checkInWithManagerPublish: boolean;
};

type ReviewBaseStateA = {
    reviewToId: number | string;
    reviewCycleId: number;
    reviewFromId: number | string | undefined;
    startDate: number;
    endDate: number;
    managerReviewStartDate: number;
    managerReviewEndDate: number;
    team: string;
    reviewToEmployeeId: string;
    firstName: string;
    lastName: string;
    reviewFromEmployeeId: string;
    managerFirstName: string;
    managerLastName: string;
    draft: boolean;
    publish: boolean;
    averageRating: number;
    submittedDate: number;
    reviewCycle: string;
    firstManagerId: number;
    action: string;
};

type ReviewBaseStateB = {
    organisationId: number;
    reviewCycleId: number;
    startDate: number;
    endDate: number;
    publish: boolean;
    selfReviewStartDate: number;
    selfReviewEndDate: number;
    managerReviewStartDate: number;
    managerReviewEndDate: number;
    selfReviewDraft: boolean;
    selfReviewPublish: boolean;
    selfReviewDate?: number;
    selfAverageRating?: number;
    firstManagerId: number;
    firstManagerEmployeeId: string;
    firstManagerFirstName: string;
    firstManagerLastName: string;
    firstManagerReviewDraft: boolean;
    firstManagerReviewPublish: boolean;
    firstManagerAverageRating: number;
    secondManagerReviewDraft?: boolean;
    secondManagerReviewPublish?: boolean;
    secondManagerAverageRating?: number;
    checkInWithManagerStartDate: number;
    checkInWithManagerEndDate: number;
    checkInWithManagerDraft: boolean;
    checkInWithManagerPublish: boolean;
    checkInWithManagerAverageRating: number;
    isOrWasManager: boolean;
    empDetails: EmployeeDetails[];
};

export type ReviewBaseState = ReviewBaseStateA | ReviewBaseStateB;
