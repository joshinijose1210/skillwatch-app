import { FC } from 'react';
import { StylePlaceHolder, StyleTextArea, StyleTextDescription } from './TextDescription.styled';
import { TextDescriptionProps } from './types';

export const TextDescription: FC<TextDescriptionProps> = props => {
    return (
        <>
            <StyleTextDescription>
                <StylePlaceHolder>{props.placeholder}</StylePlaceHolder>
                <StyleTextArea feedbackData={props.feedback} dangerouslySetInnerHTML={{ __html: props.feedback }} />
            </StyleTextDescription>
        </>
    );
};
