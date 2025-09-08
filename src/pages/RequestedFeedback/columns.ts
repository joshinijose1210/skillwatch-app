import {
    DateFormatter,
    FeedbackRequestTagFormatter,
    FullNameRequestFeedbackFromFormatter,
    FullNameRequestFeedbackToFormatter,
    RequestFeedbackActionFormatter,
    RequestFromFormatter
} from '@components';

import { TableColumnConfig } from '@medly-components/core';

export const AllFeedbackCols: TableColumnConfig[] = [
    { title: 'Date', field: 'requestedOn', sortable: true, component: DateFormatter },
    { title: 'Feedback From', field: 'feedbackFromFirstName', component: FullNameRequestFeedbackFromFormatter },
    { title: 'Feedback About', field: 'feedbackToFirstName', component: FullNameRequestFeedbackToFormatter },
    { title: 'Status', field: 'isSubmitted', component: FeedbackRequestTagFormatter },
    { title: 'Action', field: 'action', component: RequestFeedbackActionFormatter }
];

export const RequestedFeedbackCols: TableColumnConfig[] = [
    { title: 'Date', field: 'requestedOn', sortable: true, component: DateFormatter },
    { title: 'Requested From', field: 'requestedByFirstName', component: RequestFromFormatter },
    { title: 'Feedback About', field: 'feedbackToFirstName', component: FullNameRequestFeedbackToFormatter },
    { title: 'Status', field: 'isSubmitted', component: FeedbackRequestTagFormatter },
    { title: 'Action', field: 'action', component: RequestFeedbackActionFormatter }
];
