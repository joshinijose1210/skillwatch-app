import { StyledBox } from '../PieChartTile/PieChartTile.styled';
import { StyledEmptyBox, StyleEmptyText } from './EmptyChart.Styled';

export const EmptyChart = () => {
    return (
        <StyledBox>
            <StyledEmptyBox>
                <StyleEmptyText>More charts coming soon...</StyleEmptyText>
            </StyledEmptyBox>
        </StyledBox>
    );
};
