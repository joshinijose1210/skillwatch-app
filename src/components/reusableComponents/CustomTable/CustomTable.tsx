import { Pagination } from '@medly-components/core';
import { SortOrder } from '@medly-components/core/dist/es/components/CardTable/types';
import { filterData } from '@utils/filterData';
import { FC, useCallback, useState } from 'react';
import { PaginationContainer, PaginationDetails, StyledDiv, StyledTable } from './CustomTable.styled';
import { CustomTableProps } from './types';
import { SortHandlerProps } from '@common/types';

export const CustomTable: FC<CustomTableProps> = ({
    isLoading,
    count,
    activePage,
    data,
    columns,
    rowAction,
    withPagination = true,
    handlePageChange,
    defaultSortField,
    defaultSortOrder,
    withMinimap,
    tableKey,
    itemsPerPage = 10,
    setSortOrder
}) => {
    const from = count === 0 ? 0 : 10 * (activePage - 1) + 1;
    const to = 10 * (activePage - 1) + data.length;
    const [order, setOrder] = useState<SortOrder>('desc'),
        [sortingField, setSortingField] = useState<string>('sr_no');

    const sortedData = filterData(sortingField, order, data);

    const handleSortData = useCallback(
        ({ sortField, sortOrder }: SortHandlerProps) => {
            if (sortField && sortOrder) {
                setSortingField(sortField);
                setOrder(sortOrder);
                if (setSortOrder) setSortOrder(sortOrder);
            }
        },
        [setSortOrder]
    );

    return (
        <StyledDiv key={tableKey}>
            <StyledTable
                isLoading={isLoading}
                totalItems={count}
                itemsPerPage={10}
                defaultActivePage={activePage}
                data={sortedData}
                columns={columns}
                rowHoverActions={rowAction}
                defaultSortField={defaultSortField}
                defaultSortOrder={defaultSortOrder}
                onSort={handleSortData}
                withMinimap={sortedData.length > 2 && withMinimap}
            />
            {withPagination && handlePageChange && !isLoading && count > 0 && (
                <PaginationContainer>
                    <Pagination
                        data-testid="pagination"
                        totalItems={count}
                        activePage={activePage}
                        itemsPerPage={itemsPerPage}
                        onPageClick={handlePageChange}
                    />
                    <PaginationDetails>
                        Viewing <PaginationDetails textWeight="Medium">{`${from} - ${to} `}</PaginationDetails> of{' '}
                        <PaginationDetails textWeight="Medium">{count}</PaginationDetails> Results
                    </PaginationDetails>
                </PaginationContainer>
            )}
        </StyledDiv>
    );
};
