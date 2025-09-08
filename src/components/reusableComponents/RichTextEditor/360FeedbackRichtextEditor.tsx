import { Text } from '@medly-components/core';
import { useEffect, useState, useCallback } from 'react';
import { useQuill } from 'react-quilljs';
import * as Styled from './RichTextEditor.styled';
import { RichTextEditorProps } from './types';

export const ThreeSixtyFeedbackRichTextEditor = ({
    editor,
    input,
    setInput,
    fullWidth,
    height,
    bgColor,
    disabled = false,
    feedbackTag,
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

    useEffect(() => {
        if (quill && input !== quill.root.innerHTML) {
            quill.clipboard.dangerouslyPasteHTML(input);
        }
    }, [quill, input]);

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
                    if (quilContentLength < 50) return 'Please write more than 50 characters.';
                    if (quilContentLength > 1000) return 'Please write less than 1000 characters.';
                    return '';
                };
                setError(getError());
            });
        }
    }, [countText, disabled, quill, setInput, useBlur, isOptional]);

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
                    {!disabled && <Styled.Counter>{feedbackTag === 4 ? `${countText}/500` : `${countText}/1000`}</Styled.Counter>}
                    <Text textVariant="body2" textColor="red">
                        {error}
                    </Text>
                </Styled.QuillBox>
            </Styled.EditorWrapper>
        </>
    );
};
