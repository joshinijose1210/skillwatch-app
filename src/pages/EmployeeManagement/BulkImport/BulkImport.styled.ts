import styled from 'styled-components';

export const StyledBox = styled.div`
    border-radius: 1rem;
    margin: 1rem 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const BulkImportContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    min-height: 80vh;
    height: fit-content;
`;
export const TimelineWrapper = styled.div`
    padding: 2rem;
    text-align: center;
    width: 50%;
    background-color: ${({ theme }) => theme.colors.grey[50]};
    border: 1px solid #c7d0d8;
`;
export const TimelineList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3rem;
    color: ${({ theme }) => theme.colors.grey[600]};
`;

export const ListWrapper = styled.div`
    display: flex;
    gap: 1rem;
    align-items: flex-start;
`;

export const SeparatorLine = styled.div`
    height: 100%;
`;
export const CSVWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    min-width: 480px;
    border: 1px solid ${({ theme }) => theme.colors.grey[300]};
    border-left: 0;
    min-height: 450px;
`;

export const DropZoneWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
`;
export const DropZoneContainer = styled.div`
    border: 0.5rem ${({ theme }) => theme.colors.grey[300]};
    border-style: dashed;
    height: 20rem;
    width: 45rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const DropFileInput = styled.input`
    display: none;
    cursor: pointer;
`;
export const DropFileText = styled.label`
    color: ${({ theme }) => theme.colors.blue[400]};
    cursor: pointer;
`;
export const ErrorText = styled.div`
    color: rgb(255, 0, 51);
    cursor: pointer;
`;
export const StyledImage = styled.img`
    width: 10rem;
    height: 10rem;
`;

export const CloseButton = styled.span`
    margin-left: 2rem;
    color: black;
    cursor: pointer;
`;

export const ItalicBold = styled.i`
    font-weight: bold;
`;

export const StepsList = styled.ul`
    list-style: none;
    color: ${({ theme }) => theme.colors.grey[600]};
`;

export const Step = styled.li<{ isSubItem?: boolean }>`
    margin-top: 1rem;
    position: relative;
    &::before {
        display: inline-block;
        content: '';
        border-radius: 0.375rem;
        height: 0.75rem;
        width: 0.75rem;
        margin-right: 0.5rem;
        position: absolute;
        left: -35px;
        top: 5px;
        background-color: ${({ theme, isSubItem }) => (!isSubItem ? theme.colors.grey[300] : 'none')};
        border: ${({ theme, isSubItem }) => (isSubItem ? `2px solid ${theme.colors.grey[300]}` : 'none')};
    }
    ::marker {
        top: 0;
    }
`;
