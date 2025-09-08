import { Text } from './ChartAnalytics.styled';

const formatAxisLabel = (tickProps: any) => {
    const { x, y, value, rotate } = tickProps;
    return (
        <g transform={`translate(${x},${y})`}>
            <foreignObject x="0" y="0" dy={16} width="70" height="60" transform={`translate(0,0) rotate(${rotate})`}>
                <Text>{value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase()}</Text>
            </foreignObject>
        </g>
    );
};

export default formatAxisLabel;
