import { RatingChip } from '@components';
import { Grid } from '@components/layout/Grid/Grid';
import { Text } from '@medly-components/core';
import { useAppSelector } from '@slice';
import { FC } from 'react';
import { StyledAccordion, AccordionContent, AccordionHeader, TableSectionWrapper } from '../ReviewTimeline.styled';
import { RatingTable } from './TableSection.styled';
import { TableSectionProps } from './types';

export const TableSection: FC<TableSectionProps> = ({ data }) => {
    const selfAverageRating = (data[0] && data[0].selfAverageRating) || -1,
        firstManagerAverageRating = (data[0] && data[0].firstManagerAverageRating) || -1,
        secondManagerAverageRating = (data[0] && data[0].secondManagerAverageRating) || -1,
        checkInWithManagerAverageRating = (data[0] && data[0].checkInWithManagerAverageRating) || -1;
    const userDetails = useAppSelector(state => state.user);

    return (
        <TableSectionWrapper>
            {!(data && userDetails.roleName === 'Org Admin' && !data[0]?.empDetails) && (
                <StyledAccordion defaultActive>
                    <AccordionHeader>
                        <Text textVariant="h4">Average Rating</Text>
                    </AccordionHeader>
                    <AccordionContent noSidePadding>
                        <RatingTable>
                            <Grid row={true} alignItems="center" marginBottom={1}>
                                <Grid column={true} md={5}>
                                    <Text textVariant="body2" textWeight="Medium">
                                        Self Review:
                                    </Text>
                                </Grid>
                                <Grid column={true}>
                                    <RatingChip rating={selfAverageRating} isInReviewTimeline />
                                </Grid>
                            </Grid>
                            <Grid row={true} alignItems="center" marginBottom={1}>
                                <Grid column={true} md={5}>
                                    <Text textVariant="body2" textWeight="Medium">
                                        Manager 1 Review:
                                    </Text>
                                </Grid>
                                <Grid column={true}>
                                    <RatingChip rating={firstManagerAverageRating} isInReviewTimeline />
                                </Grid>
                            </Grid>
                            <Grid row={true} alignItems="center" marginBottom={1}>
                                <Grid column={true} md={5}>
                                    <Text textVariant="body2" textWeight="Medium">
                                        Manager 2 Review:
                                    </Text>
                                </Grid>
                                <Grid column={true}>
                                    <RatingChip rating={secondManagerAverageRating} isInReviewTimeline />
                                </Grid>
                            </Grid>
                            <Grid row={true} alignItems="center" marginBottom={1}>
                                <Grid column={true} md={5}>
                                    <Text textVariant="body2" textWeight="Medium">
                                        Check-in with Manager Review:
                                    </Text>
                                </Grid>
                                <Grid column={true}>
                                    <RatingChip rating={checkInWithManagerAverageRating} isInReviewTimeline />
                                </Grid>
                            </Grid>
                        </RatingTable>
                    </AccordionContent>
                </StyledAccordion>
            )}
        </TableSectionWrapper>
    );
};
