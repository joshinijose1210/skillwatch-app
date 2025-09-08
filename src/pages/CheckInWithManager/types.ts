export interface CheckInWithManagerItem {
    reviewCycleId: number;
    startDate: Date;
    endDate: Date;
    publish: boolean;
    checkInStartDate: Date;
    checkInEndDate: Date;
    team: string;
    reviewToId: number;
    reviewToEmployeeId: string;
    firstName: string;
    lastName: string;
    selfReviewDraft: boolean;
    selfReviewPublish: boolean;
    selfAverageRating: number;
    firstManagerReviewDraft: boolean;
    firstManagerReviewPublish: boolean;
    firstManagerAverageRating: number;
    isReviewCycleActive: boolean;
    secondManagerReviewDraft: boolean;
    secondManagerReviewPublish: boolean;
    secondManagerAverageRating: number;
    checkInDraft: boolean;
    checkInPublish: boolean;
    checkInAverageRating: number;
    firstManagerId: number;
    secondManagerId?: number;
    firstManagerEmployeeId: string;
    firstManagerFirstName: string;
    firstManagerLastName: string;
    isCheckInWithManagerActive: boolean;
    isCheckInWithManagerDatePassed: boolean;
}

export interface EmployeeMixin {
    organisationId: number;
    id: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    emailId: string;
    firstManagerId: number;
}

export interface EmployeeByManager extends EmployeeMixin {}

export interface Employee extends EmployeeMixin {
    firstManagerEmployeeId: string;
    firstManagerFirstName: string;
    firstManagerLastName: string;
    employeeNameWithEmployeeId: string;
}

export interface Filters {
    employees: number[];
    reviewStatus?: number;
    filterRatingId: number;
}

export interface ReviewCycleInfo {
    reviewDetailsId?: number;
    reviewCycleId?: number;
    reviewToId?: string;
    reviewFromId?: string;
    draft?: boolean;
    published?: boolean;
    name?: string;
    message?: string;
}
