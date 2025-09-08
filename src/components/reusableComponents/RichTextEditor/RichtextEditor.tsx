import { Text } from '@medly-components/core';
import { useEffect, useState, useCallback } from 'react';
import { useQuill } from 'react-quilljs';
import * as Styled from './RichTextEditor.styled';
import { RichTextEditorProps } from './types';

export const RichTextEditor = ({
    editor,
    input,
    setInput,
    fullWidth,
    height,
    bgColor,
    disabled = false,
    feedbackTag,
    minLength,
    maxLength,
    useBlur, // enable in case you are using this component in mapping
    placeholder = 'Write your feedback here...',
    marginBottom,
    marginLeft,
    isOptional = false,
    dataTestId
}: RichTextEditorProps) => {
    const [countText, setCountText] = useState(0);
    const [error, setError] = useState('');
    const [quillText, setQuillText] = useState(input);
    const [isFocused, setIsFocused] = useState(false);

    const modules = {
        toolbar: !disabled
            ? [['bold', 'italic', 'underline', 'strike'], [{ align: [] }], [{ list: 'ordered' }, { list: 'bullet' }], ['link']]
            : false,
        clipboard: {
            matchVisual: true
        }
    };
    const { quill, quillRef } = useQuill({ placeholder, modules });
    const effectiveMax = maxLength ?? (feedbackTag === 4 ? 500 : 1000);
    const effectiveMin = minLength ?? 50;

    useEffect(() => {
        if (quill && input && input.length > 0) {
            quill.clipboard.dangerouslyPasteHTML(input);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quill]);

    useEffect(() => {
        if (quill) {
            quill.enable(!disabled);
            setCountText(quill.getText().length - 1);
            quill.on('text-change', () => {
                setCountText(quill.getText().length - 1);
                if (!useBlur) setInput(quill.root.innerHTML);
                setQuillText(quill.root.innerHTML);
                const quilContentLength = quill.getText().length - 1;
                const getError = () => {
                    if (quilContentLength === 0 && isOptional) return '';
                    if (effectiveMin < effectiveMax && quilContentLength < effectiveMin)
                        return `Please write more than ${effectiveMin} characters.`;
                    if (quilContentLength > effectiveMax) return `Please write less than ${effectiveMax} characters.`;
                    return '';
                };
                setError(getError());
            });
        }
    }, [countText, disabled, quill, setInput, useBlur, isOptional, effectiveMax, effectiveMin]);

    const onBlur = useCallback(() => {
        if (quillText?.length && useBlur && isFocused) setInput(quillText);
        setIsFocused(false);
    }, [isFocused, quillText, setInput, useBlur]);

    const onMouseLeave = useCallback(() => {
        if (quillText?.length && useBlur && isFocused) setInput(quillText);
    }, [isFocused, quillText, setInput, useBlur]);

    const handleFocusEvent = useCallback(() => {
        setIsFocused(true);
    }, []);

    return (
        <>
            <Styled.EditorWrapper
                disabled={disabled}
                fullWidth={fullWidth}
                marginBottom={marginBottom}
                marginLeft={marginLeft}
                height={height}
            >
                <Styled.QuillBox editor={editor} fullWidth={fullWidth} bgColor={bgColor}>
                    <Styled.Editor
                        ref={quillRef}
                        disabled={disabled}
                        bgColor={bgColor}
                        height={height}
                        onFocus={handleFocusEvent}
                        onBlur={onBlur}
                        onMouseLeave={onMouseLeave}
                        data-testid={dataTestId ? dataTestId : 'textquill'}
                    />
                    {!disabled && <Styled.Counter> {`${countText}/${effectiveMax}`}</Styled.Counter>}
                    <Text textVariant="body2" textColor="red">
                        {error}
                    </Text>
                </Styled.QuillBox>
            </Styled.EditorWrapper>
        </>
    );
};
