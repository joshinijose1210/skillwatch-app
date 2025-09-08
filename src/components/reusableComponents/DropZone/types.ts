export type AcceptObj = {
    'image/*'?: string[];
    'text/*'?: string[];
    'image/svg'?: string[];
};
export interface useDropZoneProps {
    onDrop: (files: File[]) => void;
    accept: AcceptObj;
}

export interface DropZoneProps extends useDropZoneProps {
    file: any;
    supportedFiles: string[];
}

export type FileType = 'image/*' | 'text/*' | undefined;
