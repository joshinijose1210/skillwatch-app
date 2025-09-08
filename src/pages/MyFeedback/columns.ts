import {
    DateFormatter,
    FeedbackStatusFormatter,
    FeedbackTagFormatter,
    FullNameReceivedFeedbackFormatter,
    FullNameSubmittedFeedbackFormatter,
    ShowFeedbackDataFormatter,
    ViewFeedbackButton
} from '@components';
import { ViewReceivedFeedbackButton } from '@components/columnFormatters/ViewReceivedFeedbackButton';
import { TableColumnConfig } from '@medly-components/core';

export const SubmittedFeedbackCols: TableColumnConfig[] = [
    { title: 'Date', field: 'date', sortable: true, component: DateFormatter, fraction: 0.05 },
    { title: 'Feedback About', field: 'empFirstName', component: FullNameSubmittedFeedbackFormatter, fraction: 0.225 },
    { title: 'Feedback', field: 'feedbackData', component: ShowFeedbackDataFormatter, fraction: 0.475 },
    { title: 'Feedback Type', field: 'feedbackType', component: FeedbackTagFormatter, fraction: 0.125 },
    { title: 'Status', field: 'isDraft', component: FeedbackStatusFormatter, fraction: 0.125 },
    { title: 'Action', field: 'action', component: ViewFeedbackButton, fraction: 0.125 }
];

export const ReceivedFeedbackCols: TableColumnConfig[] = [
    { title: 'Date', field: 'date', sortable: true, component: DateFormatter, fraction: 0.05 },
    { title: 'Feedback From', field: 'empFirstName', component: FullNameReceivedFeedbackFormatter, fraction: 0.225 },
    { title: 'Feedback', field: 'feedbackData', component: ShowFeedbackDataFormatter, fraction: 0.475 },
    { title: 'Feedback Type', field: 'feedbackType', component: FeedbackTagFormatter, fraction: 0.2 },
    { title: 'Action', field: 'action', component: ViewReceivedFeedbackButton, fraction: 0.2 }
];
