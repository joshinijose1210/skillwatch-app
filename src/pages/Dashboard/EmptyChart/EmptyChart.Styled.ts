import styled from 'styled-components';

export const StyledEmptyBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;
export const StyleEmptyText = styled.span`
    font-size: large;
    color: ${({ theme }) => theme.customColors.defaultChartColor};
`;
