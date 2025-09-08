import { PieChart } from '@components/reusableComponents';
import customColors from '@theme/core/colors';
import { dataCategories } from './constants';
import { ChartContainer, Color, ColorScheme, HeadContainer, InfoSection, StyledBox, TileTitle, TypeText } from './PieChartTile.styled';
import { usePieChartTile } from './usePieChartTile';

export const PieChartTile = () => {
    const { data, noData } = usePieChartTile();
    const { submittedGraphData, receivedGraphData } = data;
    return (
        <StyledBox>
            <HeadContainer>
                <TileTitle textVariant="h4">Overview</TileTitle>
            </HeadContainer>
            <ChartContainer>
                <PieChart
                    data={receivedGraphData}
                    padAngle={0.7}
                    enableArcLinkLabels={false}
                    title={
                        <span>
                            Feedback
                            <br />
                            Received
                        </span>
                    }
                    noData={noData.received}
                />
                <PieChart
                    enableArcLinkLabels={false}
                    padAngle={0.7}
                    data={submittedGraphData}
                    title={
                        <span>
                            Feedback
                            <br />
                            Submitted
                        </span>
                    }
                    noData={noData.submitted}
                />
            </ChartContainer>
            <InfoSection>
                {dataCategories.map(node => (
                    <ColorScheme key={node}>
                        <Color bgColor={(customColors as any)[node.toLowerCase()]} />
                        <TypeText>{node}</TypeText>
                    </ColorScheme>
                ))}
            </InfoSection>
        </StyledBox>
    );
};
