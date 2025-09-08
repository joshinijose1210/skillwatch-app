export type FeedbackTypeOption = 'positive' | 'improvement' | 'appreciation';
export type FeedbackTypeId = 1 | 2 | 3;
export type Action = 'Add' | 'View' | 'Edit';
export type Errors = Record<FeedbackTypeId, string>;

export interface FeedbackTypeObject {
    label: string;
    value: FeedbackTypeOption;
    feedbackTypeId: FeedbackTypeId;
}

export interface FeedbackItem {
    feedbackId?: number;
    feedbackTypeId: FeedbackTypeId;
    feedbackText: string;
    markdownText: string | null; // this should never be sent as empty string : ''
}

export interface FeedbackSectionProps {
    feedbackTagText: FeedbackTypeOption;
    feedbackTagNumber: FeedbackTypeId;
    action: Action;
}

export interface FeedbackFormContainerProps {
    handleAccordinToggle: (value: FeedbackTypeOption) => void;
    activeAccordion: FeedbackTypeOption | '';
}

export interface Tag {
    feedbackTypeId: FeedbackTypeId;
    feedbackType: FeedbackTypeOption;
}
export interface AccordionInputFieldProps {
    feedbackTypeOptions: FeedbackTypeObject[];
    handleAccordinToggle: (value: FeedbackTypeOption) => void;
    activeAccordion: FeedbackTypeOption | '';
    handleChange: (value: string, type: FeedbackTypeObject['feedbackTypeId']) => void;
    action: Action;
    feedbackErrors: Errors;
    getInputValue: (feedbackId: FeedbackTypeObject['feedbackTypeId']) => string;
}

// API response
export interface FeedbackDataItemResponse {
    feedbackId: number;
    feedback: string;
    feedbackTypeId: FeedbackTypeId;
    feedbackType: string;
    isDraft: boolean;
}
export interface SingleFeedbackResponse {
    organisationId: number;
    requestId: number;
    isSubmitted: boolean;
    isExternalRequest: boolean;
    requestedOn: string; // ISO date string
    submittedOn: string; // ISO date string
    actionItemId: number;
    actionItem: string;
    requestedById: number;
    requestedByEmployeeId: string;
    requestedByFirstName: string;
    requestedByLastName: string;
    feedbackToId: number;
    feedbackToEmployeeId: string;
    feedbackToFirstName: string;
    feedbackToLastName: string;
    feedbackFromId: number;
    feedbackFromEmployeeId: string;
    feedbackFromFirstName: string;
    feedbackFromLastName: string;
    externalFeedbackFromEmail: string;
    request: string;
    feedbackData: FeedbackDataItemResponse[];
}

export interface Payload {
    requestId: number;
    feedbackToId: number | string;
    feedbackFromId: number | string;
    organisationId: number | string;
    isDraft: boolean;
    feedbackData: {
        feedbackId?: number;
        feedbackTypeId: FeedbackTypeId;
        feedbackText: string;
        markdownText: string | null;
    }[];
}
export interface EditedDataPayload extends Omit<Payload, 'feedbackData'> {
    feedbackData: {
        feedbackId?: number;
        feedbackTypeId: FeedbackTypeId;
        feedbackText: string;
        markdownText: string | null;
        isNewlyAdded: boolean;
        isRemoved: boolean;
    }[];
}
