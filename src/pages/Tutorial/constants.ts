import { TutorialItem } from './types';

export const FILTER_OPTIONS = [
    { label: 'All', value: 'all' },
    { label: 'Setup', value: 'setup' },
    { label: '360-degree Feedback', value: '360-degree-feedback' },
    { label: 'KRA and KPI Management', value: 'KRA-and-KPI-Management' },
    { label: 'Performance Review', value: 'performance-review' },
    { label: 'Reports & Analytics', value: 'reports-and-analytics' }
];

const path = process.env.MODE === 'production' ? '/app' : '';

// Tutorial data source (can be replaced with dynamic API logic later)
export const TUTORIALS_DATA: TutorialItem[] = [
    {
        videoId: 'nfDYeOgeulI',
        cardLabel: 'Getting Started with SkillWatch Setup',
        cardDescription:
            'A simple guide to setting up your company, departments, teams, designations, roles & permissions, and employees — all in one smooth flow.',
        category: 'Setup',
        cardTag: ['Company', 'Department', 'Team', 'Designation', 'Roles & Permissions', 'Employees'],
        thumbnail: `${path}/thumbnails/tutorial1.jpg`
    },
    {
        videoId: 'VIY13-DyTZs',
        cardLabel: 'Giving Feedback the Right Way',
        category: '360-degree Feedback',
        cardDescription: `Whether it's positive feedback, improvement pointers, or appreciation notes — learn how to leave impactful feedback that truly helps.`,
        cardTag: ['Peer Feedback', 'Add Feedback', 'View Feedback', 'Manager Feedback', 'Performance Review'],
        thumbnail: `${path}/thumbnails/tutorial2.jpg`
    },
    {
        videoId: 'IML1FmcxQG8',
        cardLabel: 'Mastering the Art of Requesting Feedback',
        category: '360-degree Feedback',
        cardDescription: `Learn how to collect well-rounded feedback from team members, managers & clients — build a culture of growth, clarity, and continuous improvement.`,
        cardTag: ['Request Feedback', 'Multi-Person Feedback', 'Client/Stakeholder Feedback', 'Performance Review'],
        thumbnail: `${path}/thumbnails/tutorial3.jpg`
    },
    {
        videoId: 'uJUdECLBXSs',
        cardLabel: 'Slack Integration to Power Up SkillWatch!',
        cardDescription: `Plug into Slack to send feedback, request reviews, and get instant alerts for appreciation, suggestions, and performance review cycle — right where your team chats!`,
        category: 'Setup',
        cardTag: ['Slack', 'Integration', 'Add Feedback', 'Request Feedback', 'Reminders', 'Performance Review', 'Suggestion'],
        thumbnail: `${path}/thumbnails/tutorial4.jpg`
    },
    {
        videoId: 'aBibLJwCt3E',
        cardLabel: 'SkillWatch Features inside Slack: Feedback Made Effortless',
        cardDescription:
            'Discover how Slack + SkillWatch keeps feedback, reminders, and performance review updates at your fingertips — fast, easy, and integrated. All without leaving your slack chat!',
        category: '360-degree Feedback',
        cardTag: ['Add Feedback', 'Request Feedback', 'Multi-Person Feedback', 'Slack', 'Integration'],
        thumbnail: `${path}/thumbnails/tutorial5.jpg`
    },
    {
        videoId: '5CzV_KpmmhQ',
        cardLabel: 'Set KRA Weightage: Align Performance with Purpose',
        cardDescription:
            'A quick walkthrough on setting balanced weightages across KRAs (Knowledge, Results, and Attitude) to reflect your company’s expectations and ensure fair performance reviews.',
        category: 'Setup',
        cardTag: ['KRAs', 'KRA Weightage', 'Responsibilities', 'Performance Review'],
        thumbnail: `${path}/thumbnails/tutorial6.jpg`
    },
    {
        videoId: 'FdlyLney30c',
        cardLabel: 'Review Cycle Setup: From Kickoff to Check-In',
        cardDescription:
            'Learn how to define your performance review cycle and break it down into structured phases for self-reviews, manager reviews, and check-in with managers — all while staying on schedule and avoiding last minute chaos.',
        category: 'Setup',
        cardTag: ['Set Review Cycle', 'Review Timeline', 'Self Review', 'Manager Review', 'Check-in with Manager', 'Performance Review'],
        thumbnail: `${path}/thumbnails/tutorial7.jpg`
    }

    // {
    //     videoId: 'nfDYeOgeulI',
    //     cardLabel: 'Review Cycle Setup: From Kickoff to Check-In',
    //     cardDescription:
    //         'Learn how to define your performance review cycle and break it down into structured phases for self-reviews, manager reviews, and check-in with managers — all while staying on schedule and avoiding last-minute chaos.',
    //     category: 'Performance Review',
    //     cardTag: ['Review Timeline', 'Self Review', 'Manager Review', 'Check-in with Manager', 'Performance Review'],
    //     thumbnail: '/thumbnails/tutorial1.jpg'
    // }
];

export const categoryColorMap: {
    [key: string]: { bg: string; text: string };
} = {
    Setup: {
        bg: '#eff9ff',
        text: '#3872d2'
    },
    '360-degree Feedback': {
        bg: '#F2A14226',
        text: '#C0741A'
    },
    Integration: {
        bg: 'F2A14226',
        text: '#C0741A'
    },
    'KRA and KPI Management': {
        bg: '#5CBE4C26',
        text: '#29A016'
    },
    'Performance Review': {
        bg: '#4ACEBE26',
        text: '#0D9887'
    }
};
