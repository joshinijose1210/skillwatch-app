import { StyledMultiSelect, StyledTable } from '@common';
import { PageContent } from '@components/layout';
import { Text } from '@medly-components/core';
import { filterData, SortOrder } from '@utils/filterData';
import { FC, useCallback, useState } from 'react';
import { StyledTitle } from './FeedbackTable.styled';
import { FeedbackTableProps } from './types';
import { SortHandlerProps } from '@common/types';

const FeedbackTable: FC<FeedbackTableProps> = (props: FeedbackTableProps) => {
    const { action, data, columns, options, onNameSelection, defaultSortOrder, values, defaultSortField, isLoading } = props;
    const [order, setOrder] = useState<SortOrder>('desc'),
        [sortingField, setSortingField] = useState<string>('sr_no');

    const sortedData = filterData(sortingField, order, data);

    const handleSortData = useCallback(({ sortField, sortOrder }: SortHandlerProps) => {
        if (sortField && sortOrder) {
            setSortingField(sortField);
            setOrder(sortOrder);
        }
    }, []);
    return (
        <PageContent>
            <StyledTitle data-testid="title">
                <Text textVariant="h2" textWeight="Medium">
                    {action} Feedbacks
                </Text>
            </StyledTitle>
            <StyledTitle>
                <StyledMultiSelect
                    label="Filter By Name"
                    options={options}
                    values={values}
                    onChange={value => onNameSelection(value)}
                    variant={'outlined'}
                    size="M"
                    minWidth="30rem"
                />
            </StyledTitle>

            <StyledTable
                defaultSortOrder={defaultSortOrder}
                defaultSortField={defaultSortField}
                withPagination={true}
                totalItems={data.length}
                itemsPerPage={10}
                defaultActivePage={1}
                data={sortedData}
                onSort={handleSortData}
                columns={columns}
                isLoading={isLoading}
            />
        </PageContent>
    );
};

export default FeedbackTable;
