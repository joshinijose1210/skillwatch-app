export interface UserData {
    requestId: number;
    requestedByFirstName: string;
    requestedByLastName: string;
    feedbackToId: number;
    feedbackToFirstName: string;
    feedbackToLastName: string;
    feedbackToTeam: string;
    feedbackFromId: number;
    organisationName: string;
    request: string;
    requestedById: string | number;
}
