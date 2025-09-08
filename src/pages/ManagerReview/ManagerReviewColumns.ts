import {
    FullNameFormatter,
    ManagerReviewActionFormatter,
    ManagerReviewStatusFormatter,
    MyManagerFullNameFormatter,
    ReviewCycleNameFormatter
} from '@components';
import { AverageRatingFormatter } from '@components/columnFormatters/AverageRatingFormatter';
import { TableColumnConfig } from '@medly-components/core';

export const ManagerReviewColumns = (user: string): TableColumnConfig[] => {
    return user === 'manager'
        ? [
              {
                  title: 'Review Cycle',
                  field: '',
                  component: ReviewCycleNameFormatter
              },
              {
                  title: 'Team',
                  field: 'team'
              },
              {
                  title: 'Employee Name',
                  field: '',
                  component: FullNameFormatter
              },
              {
                  title: 'Review Status',
                  field: '',
                  component: ManagerReviewStatusFormatter
              },
              {
                  title: 'Average Rating',
                  field: 'averageRating',
                  component: AverageRatingFormatter
              },
              {
                  title: 'Action',
                  field: '',
                  fraction: 0.5,
                  component: ManagerReviewActionFormatter
              }
          ]
        : [
              {
                  title: 'Review Cycle',
                  field: '',
                  component: ReviewCycleNameFormatter
              },
              {
                  title: 'Team',
                  field: 'team'
              },
              {
                  title: 'Manager Name',
                  field: '',
                  component: MyManagerFullNameFormatter
              },
              {
                  title: 'Review Status',
                  field: '',
                  component: ManagerReviewStatusFormatter
              },
              {
                  title: 'Manager Average Rating',
                  field: 'averageRating',
                  component: AverageRatingFormatter,
                  align: 'center'
              },
              {
                  title: 'Action',
                  field: '',
                  fraction: 0.5,
                  component: ManagerReviewActionFormatter,
                  align: 'center'
              }
          ];
};
