export type DataType = {
    employeeId: string;
    firstName: string;
    lastName: string;
};

export type GetDescriptionType = {
    feedbackTag: string;
};

export interface DescriptionProps {
    heading: string;
    subHeading: string;
    isFeedbackTips: boolean;
    tips?: string[];
    feedbackTips?: { whatToDo: string[]; whatNotToDo: string[] };
    exampleText?: string;
    isItallic?: boolean;
    slackShortcut?: string;
}
