import { Loader, PieChart } from '@components/reusableComponents';
import { ResponsiveBar } from '@nivo/bar';
import { FC, memo, useCallback } from 'react';
import { Color, ColorScheme, CustomTooltip, InfoSection, TileTitle, TypeText } from '../ChartSection/ChartSection.styled';
import { ChartContainer, ChartWrapper, FullChartWrapper, PieChartWrapper } from './ChartAnalytics.styled';
import formatAxisLabel from './FormateAxixLabel';
import { dataCategories, graphColorScheme } from './constants';
import { GraphColorSchemeType, Props } from './types';
import { useChartAnalytics } from './useChartAnalytics';

export const ChartAnalytics: FC<Props> = memo(({ analyticsData, isLoading }) => {
    const { employeeTypeGraphData, employeeExperienceGraph, employeeExperienceYMax, employeeTeamCountGraph, maxEmployeeInTeam } =
        useChartAnalytics(analyticsData);
    const tooltip = useCallback(
        ({ value }: { value: number }) => <CustomTooltip>{`${value} ${value > 1 ? 'Employees' : 'Employee'}`}</CustomTooltip>,
        []
    );

    return (
        <>
            <ChartContainer>
                <ChartWrapper>
                    <TileTitle textVariant="h4">Employee Count by Total Experience</TileTitle>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <ResponsiveBar
                            data={employeeExperienceGraph}
                            margin={{ top: 40, bottom: 80, left: 0, right: 40 }}
                            padding={0.6}
                            tooltip={tooltip}
                            colors={'#5CBE4C'}
                            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                            minValue={0}
                            maxValue={employeeExperienceYMax}
                            enableGridY={false}
                            axisBottom={{
                                tickSize: 0,
                                tickPadding: 15,
                                tickRotation: 0,
                                legendPosition: 'middle',
                                legendOffset: 20
                            }}
                            axisLeft={null}
                            animate={true}
                        />
                    )}
                </ChartWrapper>
                <PieChartWrapper>
                    <TileTitle textVariant="h4">Employee Type</TileTitle>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <PieChart
                            data={employeeTypeGraphData}
                            padAngle={0.7}
                            enableArcLinkLabels={false}
                            enableArcLabels
                            title={<span>Overview</span>}
                            noData={employeeTypeGraphData[0].id === 'No Data'}
                        />
                    )}
                    <InfoSection>
                        {dataCategories.map((category: string) => (
                            <ColorScheme key={category}>
                                <Color bgColor={graphColorScheme[category as keyof GraphColorSchemeType]} />
                                <TypeText>{category}</TypeText>
                            </ColorScheme>
                        ))}
                    </InfoSection>
                </PieChartWrapper>
            </ChartContainer>
            <ChartContainer>
                <FullChartWrapper>
                    <TileTitle textVariant="h4">Employee Count per Team</TileTitle>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <ResponsiveBar
                            data={employeeTeamCountGraph}
                            margin={{ top: 40, bottom: 120, left: 0, right: 40 }}
                            padding={0.3}
                            tooltip={tooltip}
                            colors={'#F2A142'}
                            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                            minValue={0}
                            maxValue={maxEmployeeInTeam}
                            enableGridY={false}
                            axisBottom={{
                                tickSize: 0,
                                tickPadding: 0,
                                tickRotation: 45,
                                legendPosition: 'middle',
                                legendOffset: 20,
                                renderTick: formatAxisLabel
                            }}
                            axisLeft={null}
                            animate={true}
                        />
                    )}
                </FullChartWrapper>
            </ChartContainer>
        </>
    );
});

ChartAnalytics.displayName = 'ChartAnalytics';
