import { Text } from '@medly-components/core';
export interface EditTextProps {
    active: boolean;
    error: boolean;
}

export const CustomLabel = ({ active, error }: EditTextProps) => (
    <Text textColor={!error && active ? '#D73A43' : 'initial'}>I agree to Privacy Policy and Terms & Conditions</Text>
);
