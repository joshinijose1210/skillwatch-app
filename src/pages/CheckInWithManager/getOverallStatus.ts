import { reviewStatusConstants } from '@constants/reviewStatusConstants';
import { CheckInWithManagerItem } from './types';

export const getOverAllStatus = (item: CheckInWithManagerItem): string => {
    switch (true) {
        case item.isCheckInWithManagerActive && item?.secondManagerReviewDraft && item?.selfReviewPublish:
            return reviewStatusConstants.Manager2ReviewInProgress;
        case item.isCheckInWithManagerActive &&
            item?.firstManagerAverageRating &&
            !item?.secondManagerAverageRating &&
            item?.selfReviewPublish &&
            typeof item?.secondManagerId !== 'undefined':
            return reviewStatusConstants.Manager2ReviewPending;
        case item.isCheckInWithManagerActive && item?.secondManagerReviewPublish && item?.selfReviewPublish && !item.checkInPublish:
            return reviewStatusConstants.Manager2ReviewCompleted;
        case item.isCheckInWithManagerDatePassed && !item.checkInPublish:
            return reviewStatusConstants.CheckInWithManagerDatePassed;
        case item?.checkInDraft &&
            item?.selfReviewPublish &&
            item?.firstManagerReviewPublish &&
            item.isCheckInWithManagerActive &&
            !item.isCheckInWithManagerDatePassed:
            return reviewStatusConstants.CheckInWithManagerInProgress;
        case !item?.checkInPublish && item?.selfReviewPublish && item?.firstManagerReviewPublish && !item.isCheckInWithManagerDatePassed:
            return reviewStatusConstants.CheckInWithManagerPending;
        case item?.checkInPublish && item?.selfReviewPublish && item?.firstManagerReviewPublish:
            return reviewStatusConstants.CheckInWithManagerCompleted;
        case item?.firstManagerReviewDraft && item?.selfReviewPublish:
            return reviewStatusConstants.Manager1ReviewInProgress;
        case !item?.firstManagerReviewPublish && item?.selfReviewPublish:
            return reviewStatusConstants.Manager1ReviewPending;
        case item?.firstManagerReviewPublish && item?.selfReviewPublish:
            return reviewStatusConstants.Manager1ReviewCompleted;
        case item?.selfReviewDraft && item.isReviewCycleActive:
            return reviewStatusConstants.SelfReviewInProgress;
        case !item?.selfReviewPublish && item.isReviewCycleActive:
            return reviewStatusConstants.SelfReviewPending;
        case item.selfReviewPublish && item.selfAverageRating !== -1:
            return reviewStatusConstants.SelfReviewCompleted;
        default:
            return 'Review Cycle not started';
    }
};
