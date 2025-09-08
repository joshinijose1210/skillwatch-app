export type Props = {
    id: string | number;
    action: string;
    richTextValue: string;
    richTextError: string;
    feedbackTag?: number;
    handleInputChange: (data: { id: string | number; name: string; value: any }) => void;
    ratingOptions: { label: string; value: any }[];
    rating: any;
    ratingError: string;
    ratingLabel?: string;
    ratingPlaceholder?: string;
    useBlur?: boolean;
    reviewPlaceholder?: string;
    isOptional?: boolean;
};
