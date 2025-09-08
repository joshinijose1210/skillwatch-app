import { Text } from '@medly-components/core';
import * as Styled from '../../RequestedFeedback/RequestFeedbackForm/RequestFeedbackTipsDesc.styles';

type Props = {
    focus: string;
    tips: string[];
    whyItMatters: string;
};

export const KraTipsList = ({ focus, tips, whyItMatters }: Props) => (
    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
            <Text style={{ fontSize: '14px', fontWeight: 700 }}>Focus: </Text>
            <div>
                <Text style={{ fontSize: '14px', fontStyle: 'italic' }}>{focus}</Text>
            </div>
        </div>
        <div>
            <Text style={{ fontSize: '14px', fontWeight: 700 }}>Tips:</Text>
            <Styled.StepsList>
                {tips.map((tip, index) => (
                    <Styled.Step key={index}>
                        <Text style={{ fontSize: '14px' }}>{tip}</Text>
                    </Styled.Step>
                ))}
            </Styled.StepsList>
        </div>
        <div>
            <Text style={{ fontSize: '14px', fontWeight: 700 }}>Why It Matters:</Text>
            <div>
                <Text style={{ fontSize: '14px' }}>{whyItMatters}</Text>
            </div>
        </div>
    </div>
);
