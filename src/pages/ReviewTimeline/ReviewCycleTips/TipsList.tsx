import { Text } from '@medly-components/core';
import * as Styled from '../../RequestedFeedback/RequestFeedbackForm/RequestFeedbackTipsDesc.styles';

export const TipsList = ({ title, listContents }: { title: string; listContents: string[] }) => {
    if (!listContents.length) return null;
    return (
        <div style={{ marginTop: '1rem' }}>
            <Text style={{ fontSize: '14px' }} textWeight="Strong">
                {title || ''}:
            </Text>
            <Styled.StepsList>
                {listContents.map((content, index) => (
                    <Styled.Step key={index}>
                        <Text style={{ fontSize: '14px' }}>{content}</Text>
                    </Styled.Step>
                ))}
            </Styled.StepsList>
        </div>
    );
};
