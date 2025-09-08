import { DateFormatter, FeedbackTagFormatter, FullNameReceivedFeedbackFormatter, ViewFeedbackButton } from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const ReceivedFeedbackCols: TableColumnConfig[] = [
    { title: 'Date', field: 'date', sortable: true, component: DateFormatter, fraction: 0.4 },
    { title: 'Feedback From', field: 'empFirstName', component: FullNameReceivedFeedbackFormatter, fraction: 0.5 },
    { title: 'Feedback Type', field: 'feedbackType', fraction: 0.5, component: FeedbackTagFormatter },
    { title: 'Action', field: 'action', component: ViewFeedbackButton, fraction: 0.4 }
];
