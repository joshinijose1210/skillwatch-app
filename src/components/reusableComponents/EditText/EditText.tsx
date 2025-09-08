import * as Styled from './EditText.styled';
import { Text } from '@medly-components/core';
import { EditTextProps } from './types';

export const EditText: React.FC<EditTextProps> = ({ onclick }: EditTextProps) => (
    <Styled.Action onClick={onclick}>
        <Text textVariant="h5">Edit</Text>
    </Styled.Action>
);
