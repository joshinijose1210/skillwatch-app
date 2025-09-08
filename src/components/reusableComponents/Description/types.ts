export interface DescriptionProps {
    isExternalFeedback?: boolean;
    externalFeedbackFromEmailId?: string;
    feedback: string;
    tagId: number;
    feedbackFrom: string;
    feedbackTo: string;
    feedbackFromId: string;
    feedbackToId: string;
    isReceivedFeedback?: boolean;
    fromEmpName?: string;
    toEmpName?: string;
    feedbackFromEmployeeId?: string;
    feedbackToEmployeeId?: string;
    tagName?: string;
    date?: Date;
    toRoleName?: string;
    fromRoleName?: string;
}
