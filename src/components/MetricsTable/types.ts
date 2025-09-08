import { StateData } from '@pages/ReviewCycleActionItems/types';

export interface ReviewDataType {
    reviewId: number;
    id: number;
    kpiTitle: string;
    kpiDescription: string;
    kraId: number;
    kraName: string;
    review: string;
    rating: number;
}

export interface ReviewDataRatingsType {
    selfReviewData: ReviewDataType[];
    firstManagerData: ReviewDataType[];
    secondManagerData: ReviewDataType[];
    checkInWithManagerData: ReviewDataType[];
}
export interface MetricType {
    [key: string]: MetricValueType[];
}
export interface MetricValueType {
    name: string;
    value: number | string;
    self: number | string;
    manager1: number | string;
    manager2: number | string;
    checkIn: number | string;
    isKra: boolean;
    kraId: number | string;
}

export interface MetricStateData extends StateData {
    averageRating: number;
    endDate: number;
    publish: boolean;
    reviewCycle: string;
    selfReviewEndDate: number;
    selfReviewStartDate: number;
    managerReviewStartDate: number;
    managerReviewEndDate: number;
    startDate: number;
    submittedDate: string;
    updatedAt: number;
    reviewToEmployeeId: string;
    reviewToId: number;
    reviewFromId: number;
    firstName: string;
    lastName: string;
    managerFirstName: string;
    managerLastName: string;
    reviewFromEmployeeId: string;
    checkInAverageRating: number;
    checkInDraft: boolean;
    checkInEndDate: number;
    checkInPublish: boolean;
    checkInStartDate: number;
    firstManagerAverageRating: number;
    firstManagerEmployeeId: string;
    firstManagerFirstName: string;
    firstManagerId: number;
    firstManagerLastName: string;
    firstManagerReviewDraft: boolean;
    firstManagerReviewPublish: boolean;
    overallStatus: string;
    reviewCycleId: number;
    secondManagerAverageRating: number;
    secondManagerReviewDraft: boolean;
    secondManagerReviewPublish: boolean;
    selfAverageRating: number;
    selfReviewDraft: boolean;
    selfReviewPublish: boolean;
    secondManagerEmployeeId: string;
    secondManagerFirstName: string;
    secondManagerLastName: string;
}

export interface KpiObject {
    name: string;
    value: number;
    self: number | '-';
    manager1: number | '-';
    manager2: number | '-';
    checkIn: number | '-';
    isKra: boolean;
    kraId: number | string;
}

export type Employee = {
    organisationId: number;
    id: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    emailId: string;
    contactNo: string;
    genderId: number;
    dateOfBirth: number; // Assuming this is a timestamp (milliseconds)
    dateOfJoining: number; // Assuming this is a timestamp (milliseconds)
    experienceInMonths: number;
    status: boolean;
    isConsultant: boolean;
    departmentId: number;
    departmentName: string;
    teamId: number;
    teamName: string;
    designationId: number;
    designationName: string;
    roleId: number;
    roleName: string;
    firstManagerId: number;
    firstManagerEmployeeId: string;
    firstManagerFirstName: string;
    firstManagerLastName: string;
    secondManagerId: number;
    secondManagerEmployeeId: string;
    secondManagerFirstName: string;
    secondManagerLastName: string;
    employeeNameWithEmployeeId: string;
};

export type Metric = {
    name: string;
    value: number;
    self: number;
    manager1: number;
    manager2: number;
    checkIn: number;
};
