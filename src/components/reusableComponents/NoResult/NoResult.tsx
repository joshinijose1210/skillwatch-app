import { Text } from '@medly-components/core';
import { NoResultProps } from './types';

export const NoResult = ({ title }: NoResultProps) => {
    return (
        <Text textVariant="h5" textAlign="center">
            {title}
        </Text>
    );
};
