import React from 'react';

export interface SearchEmployeeProps {
    value: string | undefined;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    disabled?: boolean;
    placeholder?: string;
    label?: string;
}
