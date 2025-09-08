import { SelfReviewStatusFormatter } from '@components';
import { AverageRatingFormatter } from '@components/columnFormatters/AverageRatingFormatter';
import { SelfReviewActionFormatter } from '@components/columnFormatters/SelfReviewActionFormatter';
import { TableColumnConfig } from '@medly-components/core';

export const SelfReviewColumns: TableColumnConfig[] = [
    {
        title: 'Review Cycle',
        field: 'reviewCycle'
    },
    {
        title: 'Submitted Date',
        field: '',
        component: SelfReviewStatusFormatter
    },
    {
        title: 'Average Rating',
        field: 'averageRating',
        component: AverageRatingFormatter,
        align: 'center'
    },
    {
        title: 'Action',
        field: '',
        component: SelfReviewActionFormatter,
        align: 'center'
    }
];
