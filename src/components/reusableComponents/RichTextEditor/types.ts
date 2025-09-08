export interface IQuillBox {
    fullWidth?: boolean;
    height?: number;
    bgColor?: string;
    editor?: string;
}

export interface RichTextEditorProps extends IQuillBox {
    editor: string;
    input: string;
    setInput: (value: string) => void;
    disabled?: boolean;
    feedbackTag?: number;
    placeholder?: string;
    label?: string;
    errorValidationCharCount?: number;
    useBlur?: boolean;
    marginBottom?: number;
    marginLeft?: number;
    isOptional?: boolean;
    dataTestId?: string;
    minLength?: number;
    maxLength?: number;
}
