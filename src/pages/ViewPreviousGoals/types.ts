export type ProgressId = 1 | 2 | 3;
export type ProgressName = string;
export interface ActionItem {
    readonly id: number;
    actionItem: string;
    createdAt: number;
    progressName: ProgressName;
    progressId: ProgressId;
    targetDate: number;
}

export interface GoalCycle {
    startDate: number;
    endDate: number;
    actionItems: ActionItem[];
}
export interface ViewTeamFeedbackState {
    name: string;
    reviewCycle: string;
    employeeId: number;
    reviewCycleId: number;
}

export type PreviousGoalActionItemsResponse = GoalCycle[];

// Goal Modal component
export interface GoalModalProps {
    refetchData: () => void;
}
