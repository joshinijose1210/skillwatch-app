export interface FeedbackDataTypes {
    date: Date;
    isExternalFeedback: boolean;
    externalFeedbackFromEmailId: string;
    feedback: string;
    feedbackToEmployeeId: string;
    feedbackFromEmployeeId: string;
    tagId: number;
    feedbackType: string;
    toEmpName: string;
    fromEmpName: string;
    toRoleName: string;
    fromRoleName: string;
}
