import { DateFormatter, GoalProgressFormatter, SuggestionTextFormatter } from '@components';

import { PreviousGoalsActionButton } from '@components/columnFormatters/PreviousGoalsActionButton';
import { TableColumnConfig } from '@medly-components/core';

export const GoalColumns: TableColumnConfig[] = [
    { title: 'Deadline', field: 'targetDate', sortable: true, component: DateFormatter, fitContent: true },
    { title: 'Goal', field: 'actionItem', component: SuggestionTextFormatter, fraction: 2 },
    { title: 'Progress', field: 'progressName', component: GoalProgressFormatter, fitContent: true },
    { title: 'Action', field: 'action', component: PreviousGoalsActionButton, fitContent: true }
];
