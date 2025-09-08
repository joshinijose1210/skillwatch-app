export const feedbackTipsData = [
    {
        feedback: 'positive',
        heading: 'Spot the Good Stuff!',
        subHeading: 'Reinforce behaviours that go above and beyond expectations.',
        tips: {
            whatToDo: [
                'Be specific: Mention what the person did and how it helped.',
                'Recognize above-and-beyond efforts, not just tasks that are part of the job.',
                'Focus on behaviors and impact, not just outcomes.',
                'Time it right: Give feedback close to when the action occurred.'
            ],
            whatNotToDo: [
                `Giving praise for “just doing the job” — Example: “You attended all the meetings this week.” That's expected, not praise-worthy.`,
                'Generic compliments — Avoid “Great work!” without context.',
                'Not acknowledging silent contributors — People who help behind the scenes also deserve appreciation.'
            ]
        },
        exampleText: `"Loved how you took the initiative to redesign the onboarding doc. It made the process smoother for the new hires and saved the HR team hours!"`,
        slackShortcut: `To quickly share feedback for your teammates, use these handy Slack shortcuts from any Slack channel or direct message where SkillWatch is integrated.`
    },
    // {
    //     feedback: 'constructive',
    //     heading: 'How to give constructive feedback?',
    //     subHeading:
    //         'Constructive feedback is a way to address areas for improvement while also providing guidance and support. When giving constructive feedback:',
    //     tips: [
    //         'Be specific: Identify the behavior or action that needs to change, and be clear about your expectations.',
    //         'Focus on solutions: Offer suggestions for how the person can improve and achieve better results.',
    //         'Use "I" statements: Frame your feedback in terms of your own experience and reactions, rather than blaming or criticizing the other person.',
    //         'Be respectful: Keep the conversation professional and avoid personal attacks or insults.'
    //     ],
    //     exampleText: `Example: "I noticed that you've been missing deadlines lately, and it's impacting the team's ability to complete our work on time. Can we talk about ways to better manage your workload and ensure you're meeting your commitments?"`
    // },
    {
        feedback: 'improvement',
        heading: 'Keep It Constructive',
        subHeading: 'Help the person grow by pointing out areas where they can improve.',
        tips: {
            whatToDo: [
                `Be constructive, not critical. Focus on behaviours, not personality.`,
                'Be objective: Use examples instead of opinions.',
                `Suggest ways to improve. Don't just state the issue — help solve it.`,
                'Show intent: Make it clear that the feedback is for growth, not blame.'
            ],
            whatNotToDo: [
                `Sugarcoating the message, which confuses the recipient.`,
                'Avoiding feedback altogether to “not hurt feelings” — this prevents growth.',
                'Delivering it publicly or sarcastically, which leads to defensiveness.'
            ]
        },
        exampleText: `"In recent stand-ups, your updates have been a bit too detailed and hard to follow. Try summarising into 2-3 key points so everyone stays aligned."`,
        slackShortcut: `To quickly share feedback for your teammates, use these handy Slack shortcuts from any Slack channel or direct message where SkillWatch is integrated.`
    },
    {
        feedback: 'appreciation',
        heading: 'Make your team feel valued',
        subHeading: 'Build morale, encourage a culture of gratitude, and reinforce team bonding.',
        tips: {
            whatToDo: [
                `Appreciate effort, collaboration, and attitude, not just big wins.`,
                `Call out helpful, thoughtful actions — like mentoring, documentation, or stepping in for a teammate.`,
                `Celebrate wins — they build confidence and team spirit.`
            ],
            whatNotToDo: [
                `Only appreciating managers or high performers.`,
                `Forgetting to thank people who help behind the scenes.`,
                `Assuming someone “knows” they're appreciated without saying it.`,
                `Avoid comparisons: “Unlike XYZ, you...” is demotivating.`
            ]
        },
        exampleText:
            '"Thanks for staying late last week to help debug the API issue. Your extra effort helped us meet the release deadline — much appreciated!"',
        slackShortcut: `To quickly share feedback for your teammates, use these handy Slack shortcuts from any Slack channel or direct message where SkillWatch is integrated.`
    }
];
