export interface Appreciation {
    isExternalFeedback?: boolean;
    externalFeedbackFromEmailId?: string;
    appreciationToEmployeeId: string;
    appreciationToFirstName: string;
    appreciationFromId: string;
    appreciationToId: string;
    appreciationToLastName: string;
    appreciation: string;
    appreciationFromEmployeeId: string;
    appreciationFromRoleName: string;
    appreciationFromFirstName: string;
    appreciationFromLastName: string;
    appreciationToRoleName: string;
    submitDate: Date;
    isDummy?: boolean;
}

export type DashboardAppreciationPropType = {
    reviewCycleId: number;
};
