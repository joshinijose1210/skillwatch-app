import { Loader, PieChart } from '@components/reusableComponents';
import { ResponsiveBar } from '@nivo/bar';
import { linearGradientDef } from '@nivo/core';
import customColors from '@theme/core/colors';
import { CustomColorsType } from '@theme/core/types';
import { FC, memo, useCallback } from 'react';
import { ChartContainer, ChartWrapper, Color, ColorScheme, CustomTooltip, InfoSection, TileTitle, TypeText } from './ChartSection.styled';
import { dataCategories, statusCategories, statusColors } from './constants';
import { Props, StatusColorsType } from './types';
import { usePieChartTile } from './useChartSection';

export const ChartSection: FC<Props> = memo(({ reviewCycleId }) => {
    const { feedbackGraphData, loadingGraphData, reviewStatusGraph, loadingReviewStatusData } = usePieChartTile(reviewCycleId);
    const tooltip = useCallback(
        ({ value }: { value: number }) => <CustomTooltip>{`${value} ${value > 1 ? 'Employees' : 'Employee'}`}</CustomTooltip>,
        []
    );
    return (
        <ChartContainer>
            <ChartWrapper>
                <TileTitle textVariant="h4">Feedback</TileTitle>
                {loadingGraphData ? (
                    <Loader />
                ) : (
                    <PieChart
                        data={feedbackGraphData}
                        padAngle={0.7}
                        enableArcLinkLabels={false}
                        title={<span>Overview</span>}
                        noData={feedbackGraphData[0].id === 'No Data'}
                    />
                )}
                <InfoSection>
                    {dataCategories.map((node: string) => (
                        <ColorScheme key={node}>
                            <Color bgColor={customColors[node.toLowerCase() as keyof CustomColorsType]} />
                            <TypeText>{node}</TypeText>
                        </ColorScheme>
                    ))}
                </InfoSection>
            </ChartWrapper>
            <ChartWrapper>
                <TileTitle textVariant="h4">Review Status</TileTitle>
                {loadingReviewStatusData ? (
                    <Loader />
                ) : (
                    <ResponsiveBar
                        data={reviewStatusGraph.data}
                        keys={reviewStatusGraph.keys}
                        indexBy="reviewStatus"
                        margin={{ top: 0, right: 0, bottom: 30, left: 0 }}
                        padding={0.55}
                        enableLabel={false}
                        axisLeft={null}
                        axisBottom={{
                            tickSize: 0,
                            tickPadding: 15
                        }}
                        defs={[
                            linearGradientDef('completed', [{ offset: 0, color: `${statusColors['completedColor']}` }]),
                            linearGradientDef('inProgress', [{ offset: 0, color: `${statusColors['inProgressColor']}` }]),
                            linearGradientDef('pending', [{ offset: 0, color: `${statusColors['pendingColor']}` }])
                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'completed'
                                },
                                id: 'completed'
                            },
                            {
                                match: {
                                    id: 'inProgress'
                                },
                                id: 'inProgress'
                            },
                            {
                                match: {
                                    id: 'pending'
                                },
                                id: 'pending'
                            }
                        ]}
                        enableGridY={false}
                        tooltip={tooltip}
                    />
                )}
                <InfoSection>
                    {statusCategories.map((status: string) => (
                        <ColorScheme key={status}>
                            <Color bgColor={statusColors[`${status}Color` as StatusColorsType]} />
                            <TypeText>
                                {status === 'inProgress' ? 'In Progress' : `${status.charAt(0).toUpperCase()}${status.slice(1)}`}
                            </TypeText>
                        </ColorScheme>
                    ))}
                </InfoSection>
            </ChartWrapper>
        </ChartContainer>
    );
});

ChartSection.displayName = 'ChartSection';
