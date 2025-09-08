import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ContactNumber } from './ContactNoWithCode.styled';

export interface ContactNoProps {
    inputProps: {
        id?: string;
        name?: string;
        autoComplete?: string;
    };
    isError?: boolean | undefined;
    country?: string;
    placeholder?: string;
    value?: string | undefined;
    onChange?: (value: string) => void;
    disabled?: boolean;
    componentName?: string | undefined;
}

export const ContactNoWithCode = ({ country, placeholder, value, onChange, disabled, componentName, isError }: ContactNoProps) => {
    return (
        <ContactNumber component={componentName} error={isError} disabled={disabled}>
            <ReactPhoneInput country={country} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />{' '}
        </ContactNumber>
    );
};
