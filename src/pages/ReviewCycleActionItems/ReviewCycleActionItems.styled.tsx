import { ProgressBarContainer } from '@components/reusableComponents/Charts/Chart.styled';
import { Box, DatePicker, Text, TextField } from '@medly-components/core';
import { ChartContainer, StyledBox } from '@pages/Dashboard/PieChartTile/PieChartTile.styled';
import styled from 'styled-components';

export const StyledAddActionItem = styled(Text)`
    color: ${({ theme }) => theme.colors.blue[500]};
    cursor: pointer;
    display: inline-block;

    :hover {
        text-decoration: underline;
    }
`;

export const LabelAndName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 34rem;

    @media (max-width: 1746px) {
        gap: 14rem;
    }
`;

export const LeftDivFlex = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
    width: 42%;
    background-color: rgb(235 241 250 / 40%);
    border-radius: 8px;
    padding: 2rem 2rem;
`;
export const RightDivFlex = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;
export const LineChartContainer = styled(ProgressBarContainer)`
    gap: 2rem;
`;
export const ChartWrapper = styled(ChartContainer)``;
export const StyledChart = styled(StyledBox)`
    width: 100% !important;
`;

export const EmployeeDetailsDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    gap: 3rem;
`;
export const ReviewDataWrapper = styled.div`
    display: flex;
`;

export const ActionItemsWrapper = styled.div`
    padding: 0;
`;

export const ActionItemAndDeleteButtonDiv = styled.div`
    display: flex;
    align-items: center;
    column-gap: 2rem;
    margin-bottom: 1rem;
    justify-content: space-between;
`;

export const AddActionItemButtonDiv = styled.div`
    padding: 1rem 0 1rem 0;
`;

export const SubmitButtonDiv = styled.div`
    display: flex;
    justify-content: end;
    column-gap: 1rem;
    margin: 0;
`;

export const ClearButton = styled.button`
    all: unset;
    cursor: pointer;
    svg {
        display: block;
    }
`;

export const NoClearButton = styled.button`
    all: unset;
    opacity: 0;
`;
export const StyledDatePicker = styled(DatePicker)`
    max-height: 45px;
    width: 25rem;
    flex-direction: inherit;

    div > div > input::placeholder,
    &:hover div > div > input::placeholder {
        color: transparent;
    }

    #deadline-calendar > div > div {
        flex-direction: row-reverse;
    }
`;

export const DateWithCrossBox = styled.div`
    display: flex;
`;

export const InfoContainerBox = styled(Box)`
    background-color: transparent;
    row-gap: 1rem;
    flex-grow: 1;
    max-width: 35%;
    width: auto;
    padding: 0;
    align-items: flex-start;
    flex-direction: column;
    overflow: auto;
`;

export const InfoBox = styled(Box)`
    background-color: transparent;
    column-gap: 3rem;
    width: 100%;
    flex-direction: row;
    padding: 0;

    .team-info {
        margin-left: 31px;
    }

    .designation-info {
        margin-left: 2px;
    }
`;

export const StyledTextField = styled(TextField)<{ marginBottom?: boolean }>`
    margin-bottom: ${({ marginBottom }) => marginBottom && '3rem'};
    max-height: 45px;
    flex: 1;
    div > div > input {
        line-height: 1.9rem;
        &::placeholder {
            color: transparent;
        }
    }
    div > div > label {
        line-height: 2.1rem;
        color: #666 !important;
    }

    span {
        position: absolute;
        top: 42px;
    }
`;

export const StyledLabel = styled(Text).attrs({
    textVariant: 'body1',
    textWeight: 'Medium'
})`
    font-size: ${({ theme }) => theme.contentFontSize};
    color: ${({ theme }) => theme.contentColor};
`;

export const StyledHeading = styled(Text).attrs({
    textWeight: 'Medium'
})`
    font-size: ${({ theme }) => theme.tipsFontSize.heading1};
    color: ${({ theme }) => theme.contentColor} !important;
`;

export const StyledLabelValue = styled(StyledLabel).attrs({
    textWeight: 'Regular'
})``;
