import { Button } from '@medly-components/core';
import upload from '../../../constants/images/logos/upload1.png';
import { CloseButton, DropFileInput, DropFileText, DropZoneContainer, DropZoneWrapper, ErrorText, StyledImage } from './BulkImport.styled';
import useBulkImport from './useBulkImport';

const DropZone = () => {
    const { fileName, handleBulkUpload, importError, reset, isLoading, getRootProps, getInputProps } = useBulkImport();

    return (
        <DropZoneWrapper>
            {fileName ? (
                <DropZoneContainer>
                    <StyledImage src={upload} alt="upload" />
                    <em>
                        <i>{fileName}</i>
                        <CloseButton data-testid="resetFile" onClick={reset}>
                            x
                        </CloseButton>
                    </em>
                </DropZoneContainer>
            ) : (
                <DropZoneContainer {...getRootProps()}>
                    <StyledImage src={upload} alt="upload" />
                    <DropFileText id="button"> Drop File or Upload File here.</DropFileText>
                    <DropFileInput data-testid="dropZone" {...getInputProps()} />
                </DropZoneContainer>
            )}
            {importError && <ErrorText>{importError}</ErrorText>}
            <Button data-testid="importBtn" onClick={handleBulkUpload} isLoading={isLoading} disabled={!fileName || !!importError}>
                Start Import
            </Button>
            <em>(Only .csv file will be accepted)</em>
        </DropZoneWrapper>
    );
};
export default DropZone;
