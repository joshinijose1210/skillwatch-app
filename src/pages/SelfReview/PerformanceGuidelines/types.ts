import { DesignationRowData } from '@pages/DesignationManagement/types';

export interface LocationData {
    reviewCycleId: string;
    reviewCycle: string;
    startDate: Date;
    endDate: Date;
    reviewToEmployeeId: string;
    reviewToId: string;
    reviewFromId: string;
    firstName: string;
    lastName: string;
    managerFirstName: string;
    managerLastName: string;
    reviewFromEmployeeId: string;
    rowData: any;
    action: Action;
    firstManagerId: string;
    secondManagerId: string;
    checkInFromId: string;
    firstManagerFirstName: string;
    firstManagerLastName: string;
    firstManagerEmployeeId: string;
    secondManagerFirstName: string;
    secondManagerLastName: string;
    secondManagerEmployeeId: string;
    secondManagerAverageRating: string;
    secondManagerReviewDraft: string;
    secondManagerReviewPublish: string;
    selfAverageRating: string;
    selfReviewDraft: string;
    selfReviewPublish: string;
    checkInAverageRating: string;
    checkInDraft: string;
    checkInEndDate: string;
    checkInPublish: string;
    checkInStartDate: string;
    firstManagerAverageRating: string;
    firstManagerReviewDraft: string;
    firstManagerReviewPublish: string;
    overallStatus: string;
    publish: string;
}

export interface DesignationData extends DesignationRowData {
    departmentName: string;
}

export type Action = 'Add' | 'Edit' | 'View';
