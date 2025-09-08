export type GraphColorSchemeType = {
    Positive: string;
    Improvement: string;
    Appreciation: string;
};

export type IStatusColors = {
    completedColor: string;
    inProgressColor: string;
    pendingColor: string;
};

export type FeedbackCount = {
    positive: number;
    improvement: number;
    appreciation: number;
};

export type FeedbackPercentage = {
    positive: number;
    improvement: number;
    appreciation: number;
};

export type IFeedbackGraph = {
    analyticsFeedbackCount: FeedbackCount;
    analyticsFeedbackPercentage: FeedbackPercentage;
};

export type StatusColorsType = 'completedColor' | 'inProgressColor' | 'pendingColor';

export type GraphDataType = {
    label: string;
    id: string;
    value: number;
    color: string;
};

export type IBarGraphData = {
    keys: string[];
    data: { [key: string]: string | number }[];
};

export type IReviewStatusDataEntries = [string, { [key: string]: string | number } | unknown];

export type CategoriesType = 'Positive' | 'Improvement' | 'Appreciation';

export interface Props {
    reviewCycleId: string;
}
export interface ReviewGraphKeys {
    [key: string]: string;
}
