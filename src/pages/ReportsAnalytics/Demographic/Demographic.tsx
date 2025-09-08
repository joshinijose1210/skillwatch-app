import { Box, Text } from '@medly-components/core';
import { DotsLoader } from '@medly-components/loaders';
import { FC, memo } from 'react';
import { TileTitle } from '../ChartSection/ChartSection.styled';
import { AverageContentSection, Container, DemographicLabel, StyledContent, StyledText } from './Demographic.styled';
import { GenderAnalytics } from './GenderAnalytics/GenderAnalytics';
import { Props } from './types';

export const Demographic: FC<Props> = memo(({ isLoading, demographics }) => {
    return (
        <Container>
            <TileTitle textVariant="h4">Demographic</TileTitle>
            <StyledContent>
                <GenderAnalytics gendersData={demographics?.gendersData} isLoading={isLoading} />
                <AverageContentSection>
                    <DemographicLabel>Average Tenure</DemographicLabel>
                    <div>
                        {isLoading ? (
                            <DotsLoader />
                        ) : (
                            <Box bg="inherit">
                                <Text textWeight="Strong" className="value">
                                    {demographics?.averageTenure?.years ?? 0}
                                    {demographics?.averageTenure?.months ? `.${demographics?.averageTenure?.months}` : ''}
                                </Text>{' '}
                                <StyledText textColor="#666" textVariant="body2">
                                    {demographics?.averageTenure?.years > 1 ? 'years' : 'year'}
                                </StyledText>{' '}
                            </Box>
                        )}
                    </div>
                </AverageContentSection>
                <AverageContentSection>
                    <DemographicLabel>Average Age</DemographicLabel>
                    <div>
                        {isLoading ? (
                            <DotsLoader />
                        ) : (
                            <Box bg="inherit">
                                <Text textWeight="Strong" className="value">
                                    {demographics?.averageAge?.years ?? 0}
                                    {demographics?.averageAge?.months ? `.${demographics?.averageAge?.months}` : ''}
                                </Text>{' '}
                                <StyledText textColor="#666" textVariant="body2">
                                    {demographics?.averageAge?.years > 1 ? 'years' : 'year'}
                                </StyledText>
                            </Box>
                        )}
                    </div>
                </AverageContentSection>
            </StyledContent>
        </Container>
    );
});

Demographic.displayName = 'Demographic';
