export interface ErrorType {
    status: number;
    data: { errorMessage: string; message?: string; file?: string };
}
export interface ImportErrorType {
    status: number;
    data: string;
}

export interface ITeam {
    organisationId: number;
    id: number;
    teamId: number;
    teamName: string;
    teamStatus: boolean;
    teamCreatedAt: Date;
}

export interface ReviewCycle {
    organisationId: number;
    reviewCycleId: number;
    startDate: Date;
    endDate: Date;
    publish: boolean;
    lastModified: Date;
    selfReviewStartDate: Date;
    selfReviewEndDate: Date;
    managerReviewStartDate: Date;
    managerReviewEndDate: Date;
    checkInWithManagerStartDate: Date;
    checkInWithManagerEndDate: Date;
    isSelfReviewActive: boolean;
    isManagerReviewActive: boolean;
    isCheckInWithManagerActive: boolean;
}

export interface Feedback {
    isExternalFeedback: boolean;
    externalFeedbackFromEmailId: string;
    feedbackType: string;
    feedback: string;
    feedbackFromId: string;
    feedbackFromEmployeeId: string;
    feedbackFromFirstName: string;
    feedbackFromLastName: string;
    feedbackFromRoleName: string;
    submitDate: Date;
    isDraft: boolean;
}

export interface Department {
    id: number;
    departmentName: string;
    departmentStatus: boolean;
    departmentRefId: number;
    error: string;
    organisationId: number;
}

export interface KpiDepartmentTeamDesignations {
    departmentId: number;
    departmentName: string;
    teamId: number;
    teamName: string;
    designationIds: number[];
    designationNames: string[];
}

export enum ProgressLabel {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Deferred = 'Deferred'
}

export enum SuggestionProgressId {
    ToDo = 1,
    Completed = 2,
    Deferred = 3,
    InProgress = 4
}

export interface ReviewFormValuesState {
    response: {
        id: string;
        name: string;
        value: string;
    };
    rating: {
        id: string;
        name: string;
        value: string;
    };
}

export interface SortHandlerProps {
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface StyledProps {
    children?: React.ReactNode;
}
