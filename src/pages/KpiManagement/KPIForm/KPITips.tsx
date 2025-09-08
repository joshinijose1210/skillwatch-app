import { Text } from '@medly-components/core';
import * as Styled from './KPITips.styled';
import { TipHeaderText } from '@pages/FeedbackForm/FeedbackForm.styled';
import { Step, StepsList } from '@pages/FeedbackForm/FeedbackTipsDesc.styles';
import { StyledTipsTitle } from '@common';

const KPITips = () => {
    const examples = [
        {
            title: 'API Performance Optimization',
            role: 'Backend Software Developer',
            description: 'Improve API response time by 20% in Q2 by optimizing query efficiency and reducing server-side processing time.'
        },
        {
            title: 'Requirements Accuracy',
            role: 'Business Analyst',
            description:
                'Ensure 95% accuracy in translating business requirements into functional specifications with minimal rework required by developers.'
        },
        {
            title: 'Recruitment Efficiency',
            role: 'Human Resources',
            description:
                'Achieve a time-to-hire rate of 30 days or less for 90% of open positions while maintaining a quality hire rating of 90% (based on hiring manager feedback).'
        }
    ];

    const kpiQuestions = [
        'Are the KPI titles clear and short?',
        'Are the KPIs specific and measurable?',
        "Are they aligned with the company's goals?",
        'Are they realistic and relevant to the role?',
        'Do they have clear timelines?',
        'Do they focus on outcomes rather than just tasks?'
    ];

    return (
        <Styled.HelpBox>
            <TipHeaderText>
                <StyledTipsTitle>Tips</StyledTipsTitle>
                <Styled.BulbImg />
            </TipHeaderText>
            <Text style={{ fontSize: '14px' }} textWeight="Strong">
                Quick Checklist for Writing KPIs
            </Text>
            <StepsList>
                {kpiQuestions.map((kpi, index) => (
                    <Step key={index}>
                        <Text style={{ fontSize: '14px' }} textWeight="Regular">
                            {kpi}
                        </Text>
                    </Step>
                ))}
            </StepsList>
            <Text style={{ fontSize: '14px' }} textWeight="Regular">
                Examples:
            </Text>
            {examples.map((kpi, index) => (
                <Styled.TipsList key={index}>
                    <Styled.StepText marginBottom="1rem" style={{ fontSize: '14px' }} textWeight="Medium">
                        {kpi.role}
                    </Styled.StepText>
                    <br />
                    <Styled.StepText marginBottom="1rem" style={{ fontSize: '14px' }} textWeight="Regular">
                        Title - {kpi.title}
                    </Styled.StepText>
                    <br />
                    <Styled.StepText marginBottom="0" style={{ fontSize: '14px' }} textWeight="Regular">
                        Description - {kpi.description}
                    </Styled.StepText>
                </Styled.TipsList>
            ))}
        </Styled.HelpBox>
    );
};

export default KPITips;
