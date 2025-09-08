import { Feedback } from '@common';

export interface ViewTeamFeedbackState {
    name: string;
    reviewCycle: string;
    employeeId: number;
    reviewCycleId: number;
}

export interface FeedbackWithAppreciationInfo extends Feedback {
    appreciationFromFirstName?: string;
    appreciationToFirstName?: string;
    appreciationFromEmployeeId?: string;
    appreciationFromLastName?: string;
    appreciation?: string;
}

export interface FeedbackData {
    positiveFeedbackCount: number;
    improvementFeedbackCount: number;
    appreciationFeedbackCount: number;
    totalFeedbacks: number;
    feedbacks?: FeedbackWithAppreciationInfo[];
}
