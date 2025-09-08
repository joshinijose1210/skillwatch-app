import styled from 'styled-components';

export const CloseButton = styled.span`
    margin-left: 2rem;
    color: black;
    cursor: pointer;
`;

export const DropFileInput = styled.input`
    display: none;
    cursor: pointer;
`;

export const DropFileText = styled.label`
    color: ${({ theme }) => theme.colors.blue[400]};
    cursor: pointer;
`;

export const DropZoneContainer = styled.div`
    border: 0.5rem ${({ theme }) => theme.colors.grey[300]};
    border-style: dashed;
    height: 20rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const DropZoneWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
`;

export const ErrorText = styled.div`
    color: rgb(255, 0, 51);
    text-align: center;
    cursor: pointer;
`;
export const StyledImage = styled.img`
    width: 10rem;
    height: 10rem;
`;

export const StyledEm = styled.em``;

export const StyledI = styled.i``;
