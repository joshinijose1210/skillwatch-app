import { Text } from '@medly-components/core';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    ViewButton,
    StyledText,
    StyledHead,
    StyledAccord,
    AccordionContainer
} from './MetricsTable.styled';
import { Fragment } from 'react';
import { Loader } from '@components';
import { MetricStateData, ReviewDataRatingsType, Employee, Metric } from './types';
import { useMetricsTable } from './useMetrics';
import { StyledAccordionTitle } from '@common';

export const MetricsTable = ({
    reviewDataRatings,
    latestManagerData,
    employeeDetails
}: {
    reviewDataRatings: ReviewDataRatingsType;
    latestManagerData?: Partial<MetricStateData>;
    employeeDetails?: Employee;
}) => {
    const {
        isKrasLoading,
        headings,
        transformedData,
        hasPath,
        ColsIndexToShow,
        managerKey,
        isManagerReview,
        reRouteTo,
        path,
        activeIndex,
        handleAccordionToggle
    } = useMetricsTable(reviewDataRatings, latestManagerData, employeeDetails);

    if (isKrasLoading) return <Loader />;
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <tr>
                        {headings.map((heading: string, index: number) =>
                            index <= ColsIndexToShow || heading === 'Action' ? (
                                <th key={index}>
                                    <Text textAlign={index === 0 ? 'left' : 'center'} textVariant="h4" textWeight="Medium">
                                        {heading}
                                    </Text>
                                </th>
                            ) : null
                        )}
                    </tr>
                </TableHead>

                <tbody>
                    {Object.entries(transformedData).map(([kraName, metrics], index) => (
                        <Fragment key={index}>
                            <TableRow isKra>
                                <TableCell colSpan={headings.length}>
                                    <StyledAccord active={index === activeIndex} onChange={() => handleAccordionToggle(index)}>
                                        <AccordionContainer className={`col-${ColsIndexToShow}`} style={{ width: '100%' }}>
                                            <StyledHead>
                                                <StyledAccordionTitle textWeight="Medium">{kraName}</StyledAccordionTitle>
                                            </StyledHead>
                                        </AccordionContainer>
                                    </StyledAccord>
                                </TableCell>
                            </TableRow>

                            {activeIndex === index &&
                                metrics.map((metric: Metric, metricIndex: number) => (
                                    <TableRow key={metricIndex} isKra={false}>
                                        <TableCell>
                                            <StyledText style={{ display: 'flex', gap: '0.5rem', paddingLeft: '2rem' }}>
                                                <li /> {metric.name}
                                            </StyledText>
                                        </TableCell>
                                        <TableCell>
                                            <StyledText>{metric.value}</StyledText>
                                        </TableCell>
                                        <TableCell>
                                            <StyledText>{metric.self}</StyledText>
                                        </TableCell>
                                        {(hasPath || isManagerReview) && (
                                            <TableCell>
                                                <StyledText>{managerKey === 'manager2' ? metric.manager2 : metric.manager1}</StyledText>
                                            </TableCell>
                                        )}
                                        {hasPath && (
                                            <TableCell>
                                                <StyledText>{metric.manager2}</StyledText>
                                            </TableCell>
                                        )}
                                        {!isManagerReview && !path.includes('self-review') && !path.includes('/both-managers') && (
                                            <TableCell>
                                                <StyledText>{metric.checkIn}</StyledText>
                                            </TableCell>
                                        )}
                                        <TableCell>
                                            <ViewButton onClick={() => reRouteTo(metric.name)}>View</ViewButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </Fragment>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};
