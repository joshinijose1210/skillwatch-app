import { CheckInReviewActionFormatter, FullNameFormatter, ManagerFullNameFormatter } from '@components';
import { AverageRatingFormatter } from '@components/columnFormatters/AverageRatingFormatter';
import { MyCheckInActionFormatter } from '@components/columnFormatters/MyCheckInActionFormatter/MyCheckInActionFormatter';
import { TableColumnConfig } from '@medly-components/core';

// TODO: Reduce the repetitive field values.
export const ManagerReviewColumns = (user: string): TableColumnConfig[] => {
    switch (user) {
        case 'hr':
            return [
                {
                    title: 'Review Cycle',
                    field: 'reviewCycle',
                    fitContent: true
                },
                {
                    title: 'Employee Name',
                    field: '',
                    component: FullNameFormatter,
                    fitContent: true
                },
                {
                    title: 'Manager 1 Name',
                    field: 'firstManagerId',
                    component: ManagerFullNameFormatter,
                    fitContent: true
                },
                {
                    title: 'Manager 2 Name',
                    field: 'secondManagerId',
                    component: ManagerFullNameFormatter,
                    fitContent: true
                },
                {
                    title: 'Overall Status',
                    field: 'overallStatus',
                    fitContent: true
                },
                {
                    title: 'Check-In Rating',
                    field: 'checkInAverageRating',
                    component: AverageRatingFormatter,
                    align: 'center',
                    sortable: true,
                    fitContent: true
                },
                {
                    title: 'Action',
                    field: '',
                    component: CheckInReviewActionFormatter,
                    align: 'center',
                    fitContent: true
                }
            ];
        case 'manager':
            return [
                {
                    title: 'Review Cycle',
                    field: 'reviewCycle',
                    fitContent: true
                },
                {
                    title: 'Employee Name',
                    field: '',
                    component: FullNameFormatter,
                    fitContent: true
                },
                {
                    title: 'Manager 1 Name',
                    field: 'firstManagerId',
                    component: ManagerFullNameFormatter,
                    fitContent: true
                },
                {
                    title: 'Manager 2 Name',
                    field: 'secondManagerId',
                    component: ManagerFullNameFormatter,
                    fitContent: true
                },
                {
                    title: 'Overall Status',
                    field: 'overallStatus',
                    fitContent: true
                },
                {
                    title: 'Average Rating',
                    field: 'checkInAverageRating',
                    component: AverageRatingFormatter,
                    align: 'center',
                    fitContent: true
                },
                {
                    title: 'Action',
                    field: '',
                    component: CheckInReviewActionFormatter,
                    align: 'center',
                    fitContent: true
                }
            ];
        default:
            return [
                {
                    title: 'Review Cycle',
                    field: 'reviewCycle',
                    fitContent: true
                },
                {
                    title: 'Manager 1 Name',
                    field: 'firstManagerId',
                    component: ManagerFullNameFormatter,
                    fitContent: true
                },
                {
                    title: 'Manager 2 Name',
                    field: 'secondManagerId',
                    component: ManagerFullNameFormatter,
                    fitContent: true
                },
                {
                    title: 'Overall Status',
                    field: 'overallStatus',
                    fitContent: true
                },
                {
                    title: 'Average Rating',
                    field: 'checkInAverageRating',
                    component: AverageRatingFormatter,
                    align: 'center',
                    fitContent: true
                },
                {
                    title: 'Action',
                    field: '',
                    component: MyCheckInActionFormatter,
                    align: 'center',
                    fitContent: true
                }
            ];
    }
};
