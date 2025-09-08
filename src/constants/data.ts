import colors from '@theme/core/colors';
import { reviewStatusConstants } from './reviewStatusConstants';

export const reviewRatingOptions = [
    { value: 1, label: '1 - Unsatisfactory (Performance is far below expectations)', color: colors.unacceptable },
    { value: 2, label: '2 - Needs Improvement (Struggles with few pointers, needs guidance)', color: colors.improvement },
    { value: 3, label: '3 - Meets Expectations (Consistently performs well in all the pointers)', color: colors.positive },
    { value: 4, label: '4 - Exceeds Expectations (Goes above expectations in multiple pointers)', color: colors.exceedsExpectations },
    { value: 5, label: '5 - Outstanding (Delivers exceptional work, acts as a role model)', color: colors.appreciation }
];

export const reviewRatingOptionsChip = [
    { value: 1, label: 'Unsatisfactory', color: colors.unacceptable },
    { value: 2, label: 'Needs Improvement', color: colors.improvement },
    { value: 3, label: 'Meets Expectations', color: colors.positive },
    { value: 4, label: 'Exceeds Expectations', color: colors.exceedsExpectations },
    { value: 5, label: 'Outstanding', color: colors.appreciation }
];

export const reviewStatusOptions = [
    { value: 1, label: reviewStatusConstants.SelfReviewPending },
    { value: 2, label: reviewStatusConstants.SelfReviewInProgress },
    { value: 3, label: reviewStatusConstants.SelfReviewCompleted },
    { value: 4, label: reviewStatusConstants.Manager1ReviewPending },
    { value: 5, label: reviewStatusConstants.Manager1ReviewInProgress },
    { value: 6, label: reviewStatusConstants.Manager1ReviewCompleted },
    { value: 7, label: reviewStatusConstants.Manager2ReviewPending },
    { value: 8, label: reviewStatusConstants.Manager2ReviewInProgress },
    { value: 9, label: reviewStatusConstants.Manager2ReviewCompleted },
    { value: 10, label: reviewStatusConstants.CheckInWithManagerPending },
    { value: 11, label: reviewStatusConstants.CheckInWithManagerInProgress },
    { value: 12, label: reviewStatusConstants.CheckInWithManagerCompleted }
];

export const teamMemberReviewStatusOptions = [
    { value: 1, label: 'Manager Review Pending' },
    { value: 2, label: 'Manager Review in Draft' },
    { value: 3, label: 'Manager Review Submitted' }
];

export const ratingOptions = [
    { value: 1, label: '1 - Unsatisfactory' },
    { value: 2, label: '2 - Needs Improvement' },
    { value: 3, label: '3 - Meets Expectations' },
    { value: 4, label: '4 - Exceeds Expectations' },
    { value: 5, label: '5 - Outstanding' }
];
export const RatingChartData = [
    {
        id: 'Unsatisfactory',
        label: 'Unsatisfactory',
        value: 0,
        color: colors.unacceptable
    },
    {
        id: 'Needs Improvement',
        label: 'Needs Improvement',
        value: 0,
        color: colors.improvement
    },
    {
        id: 'Meets Expectations',
        label: 'Meets Expectations',
        value: 0,
        color: colors.positive
    },
    {
        id: 'Exceeds Expectations',
        label: 'Exceeds Expectations',
        value: 0,
        color: colors.exceedsExpectations
    },
    {
        id: 'Outstanding',
        label: 'Outstanding',
        value: 0,
        color: colors.appreciation
    }
];
export const NoteMessage =
    'You can add domains if you wish to allow consultants or contractors from other organisation domains to be a part of your 360-degree feedback and performance review processes';

export const kpiStatusOptions = [
    { label: 'All', value: 'true,false' },
    { label: 'Active', value: 'true' },
    { label: 'Inactive', value: 'false' }
];

export const GRACE_PERIOD_MS = 86400000;
