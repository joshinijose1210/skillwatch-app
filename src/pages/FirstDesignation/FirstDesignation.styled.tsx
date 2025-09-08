import { StyledTextField } from '@common';
import styled from 'styled-components';

export const StyledSkipAndGoBackDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const TextFieldDesignation = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;
export const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const DesignationName = styled(StyledTextField)`
    span {
        width: 110%;
    }
`;

export const AddDesignationButtonDiv = styled.div<{ marginTop: string }>`
    margin-top: ${props => props.marginTop};
`;
