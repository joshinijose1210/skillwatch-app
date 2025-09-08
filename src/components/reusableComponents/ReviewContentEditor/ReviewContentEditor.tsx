import { RatingPicker, RichTextEditorWrapper } from '@pages/SelfReview/SelfReviewForm/SelfReviewForm.styled';
import { FC, memo, useCallback } from 'react';
import { RichTextEditor } from '../RichTextEditor';
import { Props } from './types';

export const ReviewContentEditor: FC<Props> = memo(
    ({
        id,
        action,
        richTextValue,
        handleInputChange,
        ratingOptions,
        rating,
        ratingError,
        feedbackTag,
        ratingLabel,
        reviewPlaceholder,
        ratingPlaceholder,
        useBlur,
        isOptional = false
    }) => {
        const handleOnChange = useCallback(
            (value: number | string | boolean) => {
                handleInputChange({ id, name: 'rating', value });
            },
            [id, handleInputChange]
        );

        const handleChange = useCallback(
            (value: string) => {
                handleInputChange({ id, name: 'response', value });
            },
            [handleInputChange, id]
        );

        return (
            <>
                <RichTextEditorWrapper>
                    <RichTextEditor
                        fullWidth
                        height={150}
                        bgColor="#fff"
                        placeholder={reviewPlaceholder}
                        disabled={action === 'View'}
                        editor={'feedback'}
                        input={richTextValue}
                        marginBottom={1}
                        setInput={handleChange}
                        feedbackTag={feedbackTag}
                        useBlur={useBlur}
                        isOptional={isOptional}
                    />
                </RichTextEditorWrapper>
                <RatingPicker
                    id="rating"
                    variant="outlined"
                    options={ratingOptions}
                    label={ratingLabel}
                    placeholder={ratingPlaceholder}
                    value={rating}
                    size="M"
                    minWidth="100%"
                    disabled={action === 'View'}
                    errorText={ratingError}
                    onChange={handleOnChange}
                    data-testid={`kpi-${id}`}
                />
            </>
        );
    }
);

ReviewContentEditor.displayName = 'ReviewContentEditor';
