export enum reviewStatusConstants {
    SelfReviewPending = 'Self Review pending',
    SelfReviewInProgress = 'Self Review in progress',
    SelfReviewCompleted = 'Self Review completed',
    Manager1ReviewPending = 'Manager 1 Review pending',
    Manager1ReviewInProgress = 'Manager 1 Review in progress',
    Manager1ReviewCompleted = 'Manager 1 Review completed',
    Manager2ReviewPending = 'Manager 2 Review pending',
    Manager2ReviewInProgress = 'Manager 2 Review in progress',
    Manager2ReviewCompleted = 'Manager 2 Review completed',
    CheckInWithManagerPending = 'Check-in with Manager pending',
    CheckInWithManagerInProgress = 'Check-in with Manager in progress',
    CheckInWithManagerCompleted = 'Check-in with Manager completed',
    CheckInWithManagerDatePassed = 'Check-in with Manager Date Passed',
    // used in review status action formatters
    SelfReviewNotStarted = 'Self Review not started',
    SelfReviewDatePassed = 'Self Review date passed',
    SelfReviewSubmitted = 'Self Review submitted'
}
