import styled from 'styled-components';
import { StyledModal } from '@common';

export const StyledModalContentFlex = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
`;

export const StyledPopup = styled(StyledModal)`
    #medly-modal-inner-container {
        width: 600px;
    }
`;
