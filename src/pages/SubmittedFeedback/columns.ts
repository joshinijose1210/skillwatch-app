import {
    DateFormatter,
    FeedbackStatusFormatter,
    FeedbackTagFormatter,
    FullNameSubmittedFeedbackFormatter,
    ViewFeedbackButton
} from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const SubmittedFeedbackCols: TableColumnConfig[] = [
    { title: 'Date', field: 'date', sortable: true, component: DateFormatter, fraction: 0.4 },
    { title: 'Feedback About', field: 'empFirstName', component: FullNameSubmittedFeedbackFormatter, fraction: 0.5 },
    { title: 'Feedback Type', field: 'feedbackType', fraction: 0.5, component: FeedbackTagFormatter },
    { title: 'Status', field: 'isDraft', fraction: 0.5, component: FeedbackStatusFormatter },
    { title: 'Action', field: 'action', component: ViewFeedbackButton, fraction: 0.4 }
];
