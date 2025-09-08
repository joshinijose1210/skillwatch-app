import React from 'react';

export interface TextFieldProps {
    dataTestid: string;
    disabled: boolean;
    variant?: 'outlined' | 'filled' | 'fusion';
    size?: 'S' | 'M';
    label: string;
    placeholder: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
