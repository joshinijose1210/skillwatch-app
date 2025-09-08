import { Feedback } from '@common';

export type DashboardAppreciationPropType = {
    reviewCycleId: number;
};

export interface IFeedback extends Feedback {
    isDummy?: boolean;
}
