import Upload from '../../../constants/images/logos/upload1.png';
import {
    CloseButton,
    DropFileInput,
    DropFileText,
    DropZoneContainer,
    DropZoneWrapper,
    ErrorText,
    StyledEm,
    StyledI,
    StyledImage
} from './DropZone.styled';
import { DropZoneProps } from './types';
import useDropZone from './useDropZone';

export const DropZone = ({ supportedFiles, onDrop, file, accept }: DropZoneProps) => {
    const { acceptedFiles, importError, reset, getInputProps, getRootProps, setImportError } = useDropZone({
        onDrop,
        accept
    });

    if (file && file.type === 'image/png') {
        const fileSize = file.size / 1024;
        acceptedFiles.forEach((file: File) => {
            const img = new Image();
            img.onload = () => {
                const { width, height } = img;
                const minWidth = 25;
                const minHeight = 25;
                if (width < minWidth || height < minHeight) {
                    setImportError('Kindly upload the PNG file of minimum height 25px and minimum width 25px.');
                }
                if (fileSize > 512) {
                    setImportError('This file is too large to be uploaded. The Maximum file size is currently set to 512kb.');
                }
            };
            img.src = URL.createObjectURL(file);
        });
    }
    const fileName = file?.name;
    const supportFilesStr = supportedFiles.join(supportedFiles.length === 2 ? ' and ' : ', ');
    return (
        <DropZoneWrapper>
            {fileName ? (
                <DropZoneContainer>
                    <StyledImage src={Upload} alt="upload" />
                    <StyledEm>
                        <StyledI>{fileName}</StyledI>
                        <CloseButton onClick={reset}>x</CloseButton>
                    </StyledEm>
                </DropZoneContainer>
            ) : (
                <DropZoneContainer {...getRootProps()}>
                    <StyledImage src={Upload} alt="upload" />
                    <DropFileText id="button"> Drop File or Upload File here.</DropFileText>
                    <DropFileInput data-testid="dropLogo" {...getInputProps()} />
                </DropZoneContainer>
            )}
            {file && importError && <ErrorText>{importError}</ErrorText>}
            <StyledEm>{`(Only ${supportFilesStr} file will be accepted)`}</StyledEm>
        </DropZoneWrapper>
    );
};
