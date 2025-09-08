import {
    DateFormatter,
    SuggestionTextFormatter,
    FullNameSubmittedSuggestionFormatter,
    SuggestionStatusFormatter,
    SuggestionActionButton,
    SuggestionProgressFormatter
} from '@components';

import { TableColumnConfig } from '@medly-components/core';

export const SubmittedCols: TableColumnConfig[] = [
    { title: 'Date', field: 'date', sortable: true, component: DateFormatter },
    { title: 'Suggestion', field: 'suggestion', component: SuggestionTextFormatter, fraction: 2 },
    { title: 'Status', field: 'isDraft', component: SuggestionStatusFormatter },
    { title: 'Progress', field: 'progressName', component: SuggestionProgressFormatter },
    { title: 'Action', field: 'action', component: SuggestionActionButton }
];

export const ReceivedCols: TableColumnConfig[] = [
    { title: 'Date', field: 'date', sortable: true, component: DateFormatter },
    { title: 'Suggestion', field: 'suggestion', component: SuggestionTextFormatter, fraction: 2 },
    { title: 'Suggested By', field: 'suggestedByFirstName', component: FullNameSubmittedSuggestionFormatter },
    { title: 'Progress', field: 'progressName', component: SuggestionProgressFormatter },
    { title: 'Action', field: 'action', component: SuggestionActionButton }
];
