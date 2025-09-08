import { StyledToggleWrapper } from '@common';
import { TextField } from '@medly-components/core';
import styled from 'styled-components';

export const ToggleDiv = styled(StyledToggleWrapper)`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

export const StyledTextField = styled(TextField)`
    margin-bottom: 3rem;
    span {
        position: absolute;
        width: max-content;
        top: 40px;
    }
`;

export const ButtonDiv = styled.div`
    display: flex;
    margin-top: 1rem;
    justify-content: end;
`;

export const TableWrapper = styled.div`
    & tbody {
        & tr > td {
            background-color: white !important;
        }
    }
`;
