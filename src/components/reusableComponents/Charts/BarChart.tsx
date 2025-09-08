import { RatingChartData } from '@constants/data';
import { ResponsivePieCanvas } from '@nivo/pie';
import { useState } from 'react';
import { ChartTitle, ChartWrapper } from './Chart.styled';
import { BarChartProps } from './types';

export const BarChart = ({ rating }: BarChartProps) => {
    const ratingData = RatingChartData[Math.floor(rating) - 1];
    ratingData.value = (360 / 5) * rating;
    const initialColor = [
        {
            id: '',
            label: 'initial',
            value: 360 - ratingData.value,
            color: '#cfd4dc'
        }
    ];
    const [chartData] = useState([ratingData, initialColor[0]]);
    return (
        <ChartWrapper>
            <ChartTitle>
                {rating}
                <br />
                <span>Average</span>
            </ChartTitle>
            <ResponsivePieCanvas
                data={rating > 0 ? chartData : initialColor}
                colors={rating > 0 ? chartData.map(({ color }) => color) : initialColor.map(({ color }) => color)}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                margin={{ top: 30, right: 30, bottom: 30, left: 20 }}
                innerRadius={0.75}
                padAngle={0}
                endAngle={360}
                cornerRadius={0}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={45}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]]
                }}
            />
        </ChartWrapper>
    );
};
