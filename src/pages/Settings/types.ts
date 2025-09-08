export interface DomainData {
    name: string;
    id: number;
    organisationId: number;
    error?: string;
    isDomainUsed?: boolean;
}

export interface SettingStatus {
    isManagerReviewMandatory: boolean;
    isAnonymousSuggestionAllowed: boolean;
    isBiWeeklyFeedbackReminderEnabled: boolean;
}
