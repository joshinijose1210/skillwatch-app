import { Box, Text } from '@medly-components/core';
import { DotsLoader } from '@medly-components/loaders';
import { FC, memo } from 'react';
import { ReactComponent as FemaleIcon } from '../../../../constants/images/icons/femaleIcon.svg';
import { ReactComponent as MaleIcon } from '../../../../constants/images/icons/maleIcon.svg';
import { ReactComponent as OtherGenderIcon } from '../../../../constants/images/icons/otherGenderIcon.svg';
import { GenderAnalyticsSection, GenderContent, GenderContentWrapper, DemographicLabel, StyledDivider } from '../Demographic.styled';
import { Props } from './types';

export const GenderAnalytics: FC<Props> = memo(({ gendersData, isLoading }) => {
    return (
        <GenderAnalyticsSection>
            <GenderContentWrapper>
                <FemaleIcon className="female" />
                <GenderContent>
                    {isLoading ? (
                        <DotsLoader />
                    ) : (
                        <Box display="flex" bg="inherit">
                            <Text textColor="#333" textWeight="Strong" className="value">
                                {gendersData?.gendersCount?.femalesCount ?? 0}
                            </Text>
                            <StyledDivider textWeight="Light" className="value">
                                |
                            </StyledDivider>
                            <Text textColor="#333" textWeight="Strong" className="value">
                                {gendersData?.gendersPercentage?.femalesPercentage?.toFixed(1) ?? 0}%
                            </Text>
                        </Box>
                    )}
                    <DemographicLabel>Female</DemographicLabel>
                </GenderContent>
            </GenderContentWrapper>
            <GenderContentWrapper>
                <MaleIcon className="male" />
                <GenderContent>
                    {isLoading ? (
                        <DotsLoader />
                    ) : (
                        <Box display="flex" bg="inherit">
                            <Text textColor="#333" textWeight="Strong" className="value">
                                {gendersData?.gendersCount?.malesCount ?? 0}
                            </Text>
                            <StyledDivider textWeight="Light" className="value">
                                |
                            </StyledDivider>
                            <Text textColor="#333" textWeight="Strong" className="value">
                                {gendersData?.gendersPercentage?.malesPercentage?.toFixed(1) ?? 0}%
                            </Text>
                        </Box>
                    )}
                    <DemographicLabel>Male</DemographicLabel>
                </GenderContent>
            </GenderContentWrapper>
            <GenderContentWrapper>
                <OtherGenderIcon className="other" />
                <GenderContent>
                    {isLoading ? (
                        <DotsLoader />
                    ) : (
                        <Box display="flex" bg="inherit">
                            <Text textColor="#333" textWeight="Strong" className="value">
                                {gendersData?.gendersCount?.othersCount ?? 0}
                            </Text>
                            <StyledDivider textWeight="Light" className="value">
                                |
                            </StyledDivider>
                            <Text textColor="#333" textWeight="Strong" className="value">
                                {gendersData?.gendersPercentage?.othersPercentage?.toFixed(1) ?? 0}%
                            </Text>
                        </Box>
                    )}
                    <DemographicLabel>Other</DemographicLabel>
                </GenderContent>
            </GenderContentWrapper>
        </GenderAnalyticsSection>
    );
});

GenderAnalytics.displayName = 'GenderAnalytics';
