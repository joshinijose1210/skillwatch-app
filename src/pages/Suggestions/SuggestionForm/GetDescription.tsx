import { Text } from '@medly-components/core';
import { FC } from 'react';
import * as Styled from './SuggestionTipsDesc.styles';

const GetDescription: FC = () => {
    return (
        <>
            <Styled.TipHeader style={{ fontSize: '16px' }} textWeight="Strong">
                How to provide Thoughtful and Impactful Suggestions?
            </Styled.TipHeader>
            <Text style={{ fontSize: '14px' }}>
                When providing suggestions to a company, it&apos; essential to communicate effectively and offer constructive ideas.
            </Text>
            <Styled.StepsList>
                <Styled.Step>
                    <Text style={{ fontSize: '14px' }}>
                        <strong>Do Your Research:</strong> Understand the company&apos; goals, values, and current strategies before making
                        suggestions. Research industry best practices to provide informed recommendations.
                    </Text>
                </Styled.Step>

                <Styled.Step>
                    <Text style={{ fontSize: '14px' }}>
                        <strong>Be Clear and Concise:</strong> Clearly articulate your suggestion in a concise manner to ensure easy
                        understanding. Avoid unnecessary jargon or technical language that may confuse the audience.
                    </Text>
                </Styled.Step>

                <Styled.Step>
                    <Text style={{ fontSize: '14px' }}>
                        <strong>Provide Context:</strong> Explain the reasoning behind your suggestion. Clearly state the problem or
                        opportunity that your suggestion addresses.
                    </Text>
                </Styled.Step>

                <Styled.Step>
                    <Text style={{ fontSize: '14px' }}>
                        <strong>Consider Feasibility:</strong> Ensure your suggestions are realistic and feasible within the company&apos;
                        resources, budget, and timeframe.
                    </Text>
                </Styled.Step>

                <Styled.Step>
                    <Text style={{ fontSize: '14px' }}>
                        <strong>Focus on Benefits:</strong> Emphasise the positive impact of your suggestion on the company&apos; goals,
                        efficiency, or team members.
                    </Text>
                </Styled.Step>

                <Styled.Step>
                    <Text style={{ fontSize: '14px' }}>
                        <strong>Timing is Key:</strong> Choose an appropriate time to present your suggestions. Avoid proposing major
                        changes during critical periods or when the company is dealing with urgent issues.
                    </Text>
                </Styled.Step>

                <Styled.Step>
                    <Text style={{ fontSize: '14px' }}>
                        <strong>Be Open to Feedback:</strong> Welcome feedback, whether positive or critical. Use it as an opportunity to
                        refine and improve your suggestions.
                    </Text>
                </Styled.Step>
            </Styled.StepsList>
            <Text style={{ fontSize: '14px', marginBottom: '10px' }}>
                Example: &quot;Advocate for a paperless office to reduce environmental impact and increase efficiency.&quot;
            </Text>
            <Styled.TipHeader style={{ fontSize: '16px' }} textWeight="Strong">
                Slack Shortcut:
            </Styled.TipHeader>
            <Text style={{ fontSize: '14px' }}>
                To use the Suggestion Box for sharing your ideas with HR/Admin/Founder, use these handy Slack shortcuts from any Slack
                channel or direct message where SkillWatch is integrated.
            </Text>
            <Styled.StepsList>
                <Styled.Step>
                    <Text style={{ fontSize: '14px' }}>/add-company-suggestion</Text>
                </Styled.Step>
            </Styled.StepsList>
        </>
    );
};

export default GetDescription;
