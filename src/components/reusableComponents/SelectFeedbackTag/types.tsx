export interface SelectFeedbackProps {
    feedbackTagValue: string | undefined;
    setFeedbackTagValue: React.Dispatch<React.SetStateAction<string>>;
    dataTestId?: string;
    disabled?: boolean;
}
