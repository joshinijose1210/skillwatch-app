export type GraphColorSchemeType = {
    Positive: string;
    Improvement: string;
    Appreciation: string;
};

export type GraphDataType = {
    label: string;
    id: string;
    value: number;
    color: string;
};

export type GraphDataStateType = {
    submittedGraphData: GraphDataType[];
    receivedGraphData: GraphDataType[];
};

export type NoCountStateType = {
    received: boolean;
    submitted: boolean;
};

export type CategoriesType = 'Positive' | 'Improvement' | 'Appreciation';
