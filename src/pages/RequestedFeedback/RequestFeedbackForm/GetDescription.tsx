import { Text } from '@medly-components/core';
import { FC } from 'react';
import * as Styled from './RequestFeedbackTipsDesc.styles';

const requestFeedbackTips = {
    whoCanYouRequestFeedbackFrom: {
        title: 'Who Can You Request Feedback From?',
        context: [
            `Anyone in your company - your peers, or managers, or cross-functional team members`,
            `Clients, vendors, or other stakeholders (via email)`
        ]
    },
    whatYouCanDoWithThisFeature: {
        title: 'What You Can Do with This Feature?',
        context: [
            `<strong>Request for Yourself: </strong>Ask others for feedback on your performance or contribution`,
            `<strong>Request About Others: </strong>Ask someone to give feedback about your teammate`,
            `<strong>External Feedback: </strong>Enter a client or partner’s email to collect feedback from outside your company`,
            `<strong>Set Context: </strong>Provide a reason or project name so the person knows why you’re requesting feedback`,
            `<strong>Transparent Sharing: </strong>If you request feedback about someone else, they will also see the feedback given`,
            `<strong>Request at the Right Time: </strong>Send requests soon after a task/project ends for more accurate feedback.`,
            `<strong>Privacy Note</strong>: Feedback is visible to the person it’s about. You will also see the feedback if you requested it for yourself or about someone else.`
        ]
    },
    examples: [
        {
            title: 'Request Feedback for Yourself',
            context:
                'Example Context: "Hi Akash, I’d love your feedback on how I handled the stakeholder communication during the Q2 roadmap discussions. Any suggestions for improvement would be appreciated!"'
        },
        {
            title: 'Request Feedback About a Teammate:',
            context:
                'Example Context: "Hi Rahul, can you share your experience working with Aniket Sharma on the CRM migration project? I’d like to gather multi-perspective feedback for their review cycle."'
        },
        {
            title: 'Request Feedback from a Client:',
            context:
                'Example Context: "Hi James, we’re collecting feedback to understand how we can improve our collaboration. I’d appreciate it if you could share your thoughts on how Rakesh Pandit has supported you in the recent sprint."'
        }
    ],
    slackShortcut: {
        title: 'Slack Shortcut:',
        description:
            'To ask for feedback for yourself or someone else with a custom context, use these handy Slack shortcuts from any Slack channel or direct message where SkillWatch is integrated.',
        commands: [`/request-feedback`, `/request-received`]
    }
};

const GetDescription: FC = () => {
    return (
        <>
            <Styled.RequestFeedbackTipHeader margin="2rem 0 0" style={{ fontSize: '14px' }} textWeight="Strong">
                {requestFeedbackTips.whoCanYouRequestFeedbackFrom.title}
            </Styled.RequestFeedbackTipHeader>
            <Styled.StepsList style={{ marginTop: 0 }}>
                {requestFeedbackTips.whoCanYouRequestFeedbackFrom.context.map((item, index) => (
                    <Styled.Step style={{ margin: 0 }} key={index}>
                        <Text style={{ fontSize: '14px' }}>{item}</Text>
                    </Styled.Step>
                ))}
            </Styled.StepsList>

            <Styled.RequestFeedbackTipHeader margin="1rem 0 0" style={{ fontSize: '14px' }} textWeight="Strong">
                {requestFeedbackTips.whatYouCanDoWithThisFeature.title}
            </Styled.RequestFeedbackTipHeader>
            <Styled.StepsList style={{ marginTop: 0 }}>
                {requestFeedbackTips.whatYouCanDoWithThisFeature.context.map((item, index) => (
                    <Styled.Step style={{ margin: 0 }} key={index}>
                        <Text style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: item }} />
                    </Styled.Step>
                ))}
            </Styled.StepsList>

            <Styled.StepsList style={{ padding: 0 }}>
                {requestFeedbackTips.examples.map((item, index) => (
                    <>
                        <Styled.RequestFeedbackTipHeader margin="1rem 0 0" key={index} style={{ fontSize: '14px' }} textWeight="Strong">
                            {item.title}
                        </Styled.RequestFeedbackTipHeader>
                        <Text key={index} style={{ fontSize: '14px', marginTop: 0 }} dangerouslySetInnerHTML={{ __html: item.context }} />
                    </>
                ))}
            </Styled.StepsList>
            <Styled.RequestFeedbackTipHeader margin="1rem 0 0" style={{ fontSize: '14px' }} textWeight="Strong">
                {requestFeedbackTips.slackShortcut.title}
            </Styled.RequestFeedbackTipHeader>
            <Text
                style={{ fontSize: '14px', marginTop: 0, marginBottom: '1rem' }}
                dangerouslySetInnerHTML={{ __html: requestFeedbackTips.slackShortcut.description }}
            />
            <Styled.StepsList style={{ marginTop: 0 }}>
                {requestFeedbackTips.slackShortcut.commands.map((item, index) => (
                    <Styled.Step style={{ marginTop: '0' }} key={index}>
                        <Text style={{ fontSize: '14px' }}>{item}</Text>
                    </Styled.Step>
                ))}
            </Styled.StepsList>
        </>
    );
};

export default GetDescription;
