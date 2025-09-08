import { Text } from '@medly-components/core';
import { CheckMaterialIcon, ClearIcon } from '@medly-components/icons';
import { FlexWrapper } from './PasswordError.style';
import { MessageProps } from './types';

export const PasswordValidation = ({ value, messageText }: MessageProps) => {
    return (
        <FlexWrapper>
            {value ? (
                <ClearIcon size="XS" variant="solid" margin="5px" bgColor="red" iconColor="white" />
            ) : (
                <CheckMaterialIcon size="XS" variant="solid" margin="5px" bgColor="green" iconColor="white" />
            )}
            <Text textColor={value ? 'red' : 'green'}>{messageText}</Text>
        </FlexWrapper>
    );
};
