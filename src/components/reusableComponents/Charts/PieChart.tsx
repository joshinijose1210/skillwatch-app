import { Text } from '@medly-components/core';
import { ResponsivePieCanvas } from '@nivo/pie';
import { ChartTitle, ChartWrapper, TooltipColor, TooltipContainer } from './Chart.styled';
import { PieChartPropTypes } from './types';

interface TooltipProps {
    datum: any;
}

const CustomTooltip: React.FC<TooltipProps> = ({ datum }) => {
    return (
        <TooltipContainer>
            <TooltipColor bgcolor={datum.color} />
            <Text textVariant="body1">{datum.id}:</Text>
            <Text textVariant="h5" textWeight="Strong">
                {datum.label}
            </Text>
        </TooltipContainer>
    );
};
export const PieChart = ({
    title,
    data,
    noData,
    padAngle = 0,
    isInteractive = true,
    enableArcLabels = true,
    enableArcLinkLabels = true,
    margin = 20
}: PieChartPropTypes) => (
    <ChartWrapper>
        <ChartTitle>{title}</ChartTitle>
        <ResponsivePieCanvas
            data={data}
            enableArcLabels={enableArcLabels}
            enableArcLinkLabels={enableArcLinkLabels}
            isInteractive={isInteractive}
            innerRadius={0.65}
            padAngle={padAngle}
            cornerRadius={0}
            margin={{ top: margin, right: margin, bottom: margin, left: margin }}
            activeOuterRadiusOffset={4}
            borderColor={{
                from: 'color',
                modifiers: [['darker', 0.6]]
            }}
            colors={data.map(node => node.color)}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsDiagonalLength={15}
            arcLinkLabelsStraightLength={15}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsColor={{ from: 'color' }}
            arcLinkLabelsOffset={-10}
            arcLabelsTextColor="#333333"
            arcLinkLabel="value"
            tooltip={CustomTooltip}
            arcLabel={d => (noData ? '0' : d.value === 0 ? '' : `${d.value}`)}
        />
    </ChartWrapper>
);
