import { LineChart, Loader, PieChart } from '@components/reusableComponents';
import { ProgressBarContainer } from '@components/reusableComponents/Charts/Chart.styled';
import { RatingChartData } from '@constants/data';
import {
    ChartContainer,
    Color,
    ColorScheme,
    HeadContainer,
    InfoSection,
    StyledBox,
    StyledRating,
    TileTitle,
    TypeText
} from '../PieChartTile/PieChartTile.styled';
import { useLineChartTile } from './useLineChartTile';

export const LineChartTile = () => {
    const { lineGraphData, checkInGraphData, loadingCycles } = useLineChartTile();

    if (loadingCycles) {
        return <Loader />;
    } else
        return (
            <StyledBox isLineChart>
                <HeadContainer>
                    <TileTitle textVariant="h4">Ratings</TileTitle>
                </HeadContainer>
                <ChartContainer>
                    <ProgressBarContainer>
                        <LineChart ratingBy={'Self'} rating={lineGraphData.avgSelfReviewRating} />
                        <LineChart ratingBy={'Manager 1'} rating={lineGraphData.avgFirstManagerRating} />
                        <LineChart ratingBy={'Manager 2'} rating={lineGraphData.avgSecondManagerReviewRating} />
                    </ProgressBarContainer>
                    <PieChart
                        enableArcLabels={false}
                        enableArcLinkLabels={false}
                        isInteractive={false}
                        title={
                            <>
                                <StyledRating>
                                    {lineGraphData.avgCheckInReviewRating === 0
                                        ? 0
                                        : String(lineGraphData.avgCheckInReviewRating.toFixed(1))}
                                </StyledRating>
                                <br />
                                <span>Check-In</span>
                            </>
                        }
                        data={checkInGraphData}
                    />
                </ChartContainer>
                <InfoSection>
                    {RatingChartData.map((node, index) => (
                        <ColorScheme key={index}>
                            <Color bgColor={node.color} />
                            <TypeText>{node.label}</TypeText>
                        </ColorScheme>
                    ))}
                </InfoSection>
            </StyledBox>
        );
};
