/* eslint-disable react/no-unescaped-entities */
import { Text } from '@medly-components/core';
import { FC } from 'react';
import * as Styled from './FeedbackTipsDesc.styles';
import { DescriptionProps, GetDescriptionType } from './types';
import { feedbackTipsData } from './feedbackTipsData';
import { parseBoldText } from './parseBoldText';
import { StyledTipsText } from '@pages/EmployeeManagement/EmployeeForm/EmployeeForm.styled';

const FeedbackTipContent = ({
    heading,
    subHeading,
    tips,
    exampleText,
    isItallic = false,
    isFeedbackTips,
    feedbackTips,
    slackShortcut
}: DescriptionProps) => (
    <>
        <Styled.TipHeader textWeight="Strong">{parseBoldText(heading)}</Styled.TipHeader>
        <br />
        <Styled.StyledText marginTop={2} textWeight="Strong">
            Purpose:
        </Styled.StyledText>
        <br />
        <Styled.StyledText>{subHeading}</Styled.StyledText>

        {isFeedbackTips && feedbackTips ? (
            <>
                <br />
                <Styled.StyledText marginTop={2} textWeight="Strong">
                    What to do:
                </Styled.StyledText>
                <br />
                <Styled.StepsList className="tips-steps">
                    {feedbackTips.whatToDo.map((item, index) => (
                        <Styled.FeedbackFormStepItem style={{ marginTop: index === 0 ? '1rem' : 0 }} key={index}>
                            <Styled.StyledText>{parseBoldText(item)}</Styled.StyledText>
                        </Styled.FeedbackFormStepItem>
                    ))}
                </Styled.StepsList>
                <Styled.StyledText marginTop={2} textWeight="Strong">
                    What not to do:
                </Styled.StyledText>
                <br />
                <Styled.StepsList className="tips-steps">
                    {feedbackTips.whatNotToDo.map((item, index) => (
                        <Styled.FeedbackFormStepItem style={{ marginTop: index === 0 ? '1rem' : 0 }} key={index}>
                            <Styled.StyledText>{parseBoldText(item)}</Styled.StyledText>
                        </Styled.FeedbackFormStepItem>
                    ))}
                </Styled.StepsList>
            </>
        ) : (
            tips && (
                <Styled.StepsList className="tips-steps">
                    {tips.map((item, index) => (
                        <Styled.FeedbackFormStepItem style={{ marginTop: index === 0 ? '1rem' : 0 }} key={index}>
                            <Styled.StyledText>{parseBoldText(item)}</Styled.StyledText>
                        </Styled.FeedbackFormStepItem>
                    ))}
                </Styled.StepsList>
            )
        )}

        {exampleText && (
            <>
                <Styled.StyledText marginTop={2} textWeight="Strong">
                    Example:
                </Styled.StyledText>
                <br />
                <Text style={{ fontSize: '14px' }}>{isItallic ? <i>{exampleText}</i> : exampleText}</Text>
            </>
        )}

        {slackShortcut && (
            <>
                <Styled.StyledText marginTop={2} textWeight="Strong">
                    Slack Shortcut:
                </Styled.StyledText>
                <br />
                <Text style={{ fontSize: '14px' }}>{slackShortcut}</Text>
                <Styled.StepsList>
                    <Styled.FeedbackFormStepItem>
                        <Styled.StyledText>/add-feedback</Styled.StyledText>
                    </Styled.FeedbackFormStepItem>
                    <Styled.FeedbackFormStepItem>
                        <Styled.StyledText>/edit-feedback</Styled.StyledText>
                    </Styled.FeedbackFormStepItem>
                </Styled.StepsList>
            </>
        )}
    </>
);

const GetDescription: FC<GetDescriptionType> = ({ feedbackTag }) => {
    const tipsData = feedbackTipsData.find(item => item.feedback === feedbackTag);
    return (
        <>
            {tipsData?.heading && (
                <FeedbackTipContent
                    heading={tipsData.heading}
                    isFeedbackTips
                    subHeading={tipsData.subHeading}
                    feedbackTips={tipsData.tips as DescriptionProps['feedbackTips']}
                    exampleText={tipsData.exampleText}
                    slackShortcut={tipsData.slackShortcut}
                />
            )}
        </>
    );
};

export default GetDescription;
