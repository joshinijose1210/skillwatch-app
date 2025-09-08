import { Text } from '@medly-components/core';
import { useState } from 'react';
import * as Styled from './TextField.styled';
import { TextFieldProps } from './types';

export const TextField = ({ dataTestid, disabled, variant, size, label, placeholder, type, value, onChange }: TextFieldProps) => {
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 60) {
            setError('Please write less than 60 characters.');
        } else {
            setError('');
        }
        onChange(e);
    };

    return (
        <>
            <Styled.TextFieldWrapper>
                <Styled.StyledTextField
                    data-testid={dataTestid}
                    disabled={disabled}
                    variant={variant}
                    size={size}
                    label={label}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={handleChange}
                />
                {error && (
                    <Text textVariant="body2" textColor="red">
                        {error}
                    </Text>
                )}
            </Styled.TextFieldWrapper>
        </>
    );
};
