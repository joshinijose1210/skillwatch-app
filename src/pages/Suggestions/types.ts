export type SuggestionTypes = { [key: string]: any }[];

export interface SuggestionComment {
    date: number | string;
    comment: string;
    id: number;
}

export interface SuggestionRowData {
    id: number;
    organisationId: number;
    date: string;
    suggestion: string;
    suggestedById: number;
    suggestedByEmployeeId: string;
    suggestedByFirstName: string;
    suggestedByLastName: string;
    isDraft: boolean;
    progressId: number;
    progressName: string;
    comments?: SuggestionComment[];
}

export interface ViewSuggestionComment {
    date: string;
    comment: string;
    id: number;
}

export type TabType = 'index' | 'submittedSuggestion' | 'receivedSuggestion';
