import { Text } from '@medly-components/core';
import * as Styled from './PerformanceGuidelines.styled';
import { TipHeaderText } from '@pages/FeedbackForm/FeedbackForm.styled';
import { Step, StepsList } from '@pages/FeedbackForm/FeedbackTipsDesc.styles';
import DOMPurify from 'dompurify';
import React from 'react';
import { StyledTipsTitle } from '@common';

const tips = [
    {
        id: 'tip-2',
        headerTitle: 'Step 2: Calculate KRA Averages: ',
        headerText: 'The average score for each KRA is calculated as follows:',
        contents: [
            { pointer: 'Knowledge & Skill Growth:', text: '(3 + 2) ÷ 2 =', result: '2.5' },
            { pointer: 'Results:', text: '(3 + 2 + 3) ÷ 3 =', result: '2.67' },
            { pointer: 'Attitude Fitment:', text: '(3 + 3) ÷ 2 =', result: '3.0' }
        ]
    },
    {
        id: 'tip-3',
        headerTitle: 'Step 3: Apply Weighted Scores: ',
        headerText: 'Each KRA average is multiplied by its assigned weight:',
        contents: [
            { pointer: 'Knowledge & Skill Growth (30%) →', text: '2.5 × 0.30 =', result: '0.75' },
            { pointer: 'Results (60%) →', text: '2.67 × 0.60 =', result: '1.6' },
            { pointer: 'Attitude Fitment (10%) →', text: '3.0 × 0.10 =', result: '0.3' }
        ]
    },
    {
        id: 'tip-4',
        headerTitle: 'Step 4: Calculate Final Score: ',
        headerText: 'Summing up the weighted scores:',
        contents: [{ pointer: '', text: '0.75 + 1.602 + 0.30 =', result: '2.65' }]
    }
];
const scores = [
    {
        kra: 'Knowledge & Skill Growth:',
        contents: [
            { text: '1st KPI Score: 3' },
            {
                text: '2nd KPI Score: 2'
            }
        ]
    },
    {
        kra: 'Results:',
        contents: [
            {
                text: '1st KPI Score: 3'
            },
            {
                text: '2nd KPI Score: 2'
            },
            {
                text: '3rd KPI Score: 3'
            }
        ]
    },
    {
        kra: 'Attitude Fitment:',
        contents: [
            {
                text: '1st KPI Score: 3'
            },
            {
                text: '2nd KPI Score: 3'
            }
        ]
    }
];

const HelpBox = () => {
    return (
        <Styled.HelpBox>
            <TipHeaderText>
                <StyledTipsTitle>Tips</StyledTipsTitle>
                <Styled.BulbImg />
            </TipHeaderText>
            <Text textVariant="h4" textWeight="Strong">
                How is your performance calculated?
            </Text>
            <Text style={{ fontSize: '14px' }} textVariant="h4" textWeight="Regular">
                Your performance is evaluated based on the given Key Performance Indicators (KPIs). Here’s how the calculation works:
            </Text>
            <Styled.ListHeader>
                Step 1: Assign KPI Scores
                <br />
                <p className="list-text">Let&apos;s assume the KPI scores for each Key Result Area (KRA) are as follows:</p>
            </Styled.ListHeader>
            {scores.map(({ kra, contents }, index) => {
                return (
                    <StepsList key={index} className="score-list">
                        <Step key={index}>
                            <Styled.KraListHeader key={index}>{kra}</Styled.KraListHeader>
                        </Step>
                        <StepsList>
                            {contents.map((content, index) => (
                                <Step key={index}>
                                    <Styled.StepText dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.text) }} />
                                </Step>
                            ))}
                        </StepsList>
                    </StepsList>
                );
            })}
            {tips.map(({ id, headerTitle, headerText, contents }) => (
                <Styled.TipsList key={id}>
                    <Styled.ListHeader>
                        {headerTitle}
                        <br />
                        <p>{headerText}</p>
                    </Styled.ListHeader>
                    <StepsList className="tips-steps">
                        {contents.map(({ pointer, text, result }, contentIndex) => (
                            <React.Fragment key={`content-${contentIndex}`}>
                                {pointer !== '' ? (
                                    <Step>
                                        <Styled.KraListHeader>
                                            {pointer}&nbsp;<span>{text}&nbsp;</span>
                                            {result}
                                        </Styled.KraListHeader>
                                    </Step>
                                ) : (
                                    <Styled.KraListHeader className="plain-text">
                                        {text}&nbsp;{result}
                                    </Styled.KraListHeader>
                                )}
                            </React.Fragment>
                        ))}
                    </StepsList>
                </Styled.TipsList>
            ))}
            <Styled.ResultText textVariant="h4" textWeight="Strong">
                Final Performance Score: 2.65
            </Styled.ResultText>
            <Text style={{ fontSize: '14px' }} textVariant="h4" textWeight="Regular">
                This process ensures that each KRA contributes to the overall performance based on its assigned weight.
            </Text>
        </Styled.HelpBox>
    );
};

export default HelpBox;
