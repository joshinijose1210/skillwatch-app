import {
    DateFormatter,
    EmpFeedbackActionFormatter,
    FeedbackTagFormatter,
    NameWithEmpIdFormatter,
    ShowFeedbackDataFormatter
} from '@components';
import { TableColumnConfig } from '@medly-components/core';

export const EmployeeFeedbackSchema: TableColumnConfig[] = [
    {
        title: 'Date',
        field: 'date',
        component: DateFormatter,
        sortable: true,
        fraction: 0.2
    },
    {
        title: 'Feedback From',
        field: 'feedbackFromId',
        component: NameWithEmpIdFormatter,
        fraction: 0.4
    },
    {
        title: 'Feedback',
        field: 'feedbackData',
        component: ShowFeedbackDataFormatter,
        fraction: 1
    },
    {
        title: 'Feedback About',
        field: 'feedbackToId',
        component: NameWithEmpIdFormatter,
        fraction: 0.4
    },
    {
        title: 'Feedback Type',
        field: 'feedbackType',
        fraction: 0.3,
        component: FeedbackTagFormatter
    },
    { title: 'Action', field: '', component: EmpFeedbackActionFormatter, fraction: 0.2 }
];
