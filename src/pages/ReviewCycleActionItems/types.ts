export interface InputField {
    actionItem: string;
    actionItemId: number;
    actionItemError?: string;
    targetDate: string;
}
export interface EmployeeInfo {
    organisationId: number;
    id: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    contactNo: string;
    designationName: string;
    departmentName: string;
    emailId: string;
    employeeNameWithEmployeeId: string;
    firstManagerEmployeeId: string;
    firstManagerId: number;
    roleName: string;
    status: boolean;
    teamName: string;
}
export interface StateData {
    actionItem: InputField[];
    draft: boolean;
    firstManagerId: number;
    secondManagerId: number;
    organisationId: number;
    published: boolean;
    reviewCycleId: number;
    reviewData: any[];
    reviewDetailsId: number;
    reviewFromId: number;
    reviewToEmployeeId: string;
    reviewToId: number;
    reviewTypeId: number;
    checkInFromId: string;
    averageRating: number;
    checkInAverageRating: number;
}
export interface ReviewData {
    id: number;
    review: string;
    rating: number;
}
export interface CheckInData {
    id: string;
    label: string;
    value: number;
    color: string;
}

export interface EmployeeSummery extends EmployeeInfo {
    contactNo: string;
    dateOfBirth: number;
    dateOfJoining: number;
    departmentId: number;
    departmentName: string;
    designationId: number;
    designationName: string;
    emailId: string;
    employeeId: string;
    employeeNameWithEmployeeId: string;
    experienceInMonths: number;
    firstManagerEmployeeId: string;
    firstManagerFirstName: string;
    firstManagerId: number;
    firstManagerLastName: string;
    firstName: string;
    genderId: number;
    id: number;
    isConsultant: boolean;
    lastName: string;
    organisationId: number;
    roleId: number;
    roleName: string;
    secondManagerEmployeeId: string;
    secondManagerFirstName: string;
    secondManagerId: number;
    secondManagerLastName: string;
    status: boolean;
    teamId: number;
    teamName: string;
}

export interface KRAWeightedScore {
    kraId: number;
    kraName: string;
    kraWeightage: number | string;
    weightedRating: number | string;
}
export interface WeightedScore {
    finalScore: number;
    kraWeightedScores: KRAWeightedScore[];
}
export interface FinalScore {
    finalScore: number;
    finalScoreLabel: string;
    finalScoreString: string;
}

type ReviewItem = {
    reviewId: number;
    id: number;
    kpiTitle: string;
    kpiDescription: string;
    kraId: number;
    kraName: string;
    review?: string;
    rating: number;
};

export type DetailedReviewData = {
    reviewTypeId: number;
    reviewDetailsId: number;
    reviewCycleId: number;
    reviewToId: number;
    reviewToEmployeeId: string;
    reviewFromId: number;
    reviewFromEmployeeId: string;
    draft: boolean;
    published: boolean;
    reviewData: ReviewItem[];
    submittedAt: number;
};
