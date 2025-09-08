import { Container, StyleText } from './PasswordError.style';
import { PasswordValidation } from './PasswordValidation';
export const PasswordError = (data: any) => {
    return (
        <Container>
            <StyleText
                textWeight="Medium"
                textVariant="body2"
                textColor={!data.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/) ? 'red' : 'green'}
            >
                Must contain
            </StyleText>
            <PasswordValidation value={!data.value.match(/^(.*[a-z].*)$/)} messageText={'At least 1 letter in small case'} />
            <PasswordValidation value={!data.value.match(/^(.*[A-Z].*)$/)} messageText={'At least 1 letter in capital case'} />
            <PasswordValidation value={!data.value.match(/^(.*\d.*)$/)} messageText={'At least 1 letter in number case'} />
            <PasswordValidation value={!data.value.match(/^(.*\W.*)$/)} messageText={'At least 1 letter in special case'} />
            <PasswordValidation value={data.value.length < 8 || data.value.length > 20} messageText={'Min 8 and max 20 characters'} />
        </Container>
    );
};
