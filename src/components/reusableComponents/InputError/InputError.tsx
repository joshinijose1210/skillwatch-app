import { Text } from '@medly-components/core';
import { InputErrorProps } from './types';

export const InputError = ({ error }: InputErrorProps) => {
    return (
        <Text textAlign="center" textVariant="h5" textColor="red">
            {error}
        </Text>
    );
};
