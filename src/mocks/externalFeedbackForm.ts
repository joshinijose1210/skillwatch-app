const BASE_URL = 'https://dummy-api.example.com';

export const externalFeedbackMockData = {
    ID: 'b1aa8970-87a2-41f5-81d2-1309deab629d',
    REQUEST_ID: 'MTM0',
    url: `${BASE_URL}/api/feedback-request/external?linkId=b1aa8970-87a2-41f5-81d2-1309deab629d&requestId=134`,
    postUrl: `${BASE_URL}/api/feedback-request/external`,
    data: {
        requestId: 134,
        requestedByFirstName: 'TestHR',
        request: 'text for context',
        requestedByLastName: 'Test',
        feedbackToId: 74,
        feedbackToFirstName: 'TestHR',
        feedbackToLastName: 'Test',
        feedbackToTeam: 'Human Resources',
        feedbackFromId: 78,
        feedbackFromEmail: 'test@test.com',
        organisationName: 'CompanyOne'
    },
    postData: {
        linkId: 'string',
        feedbackToId: 74,
        feedbackFromId: 78,
        feedback: [
            {
                feedbackTypeId: 1,
                feedbackText: 'aksljnd jkasnjdn jklasnjkl dnljkas nljkndlkjsanlk jndkajs njknasjk njklasdn ',
                markdownText: 'aksljnd jkasnjdn jklasnjkl dnljkas nljkndlkjsanlk jndkajs njknasjk njklasdn '
            },
            {
                feedbackTypeId: 2,
                feedbackText: 'aksljnd jkasnjdn jklasnjkl dnljkas nljkndlkjsanlk jndkajs njknasjk njklasdn ',
                markdownText: 'aksljnd jkasnjdn jklasnjkl dnljkas nljkndlkjsanlk jndkajs njknasjk njklasdn '
            },
            {
                feedbackTypeId: 3,
                feedbackText: 'aksljnd jkasnjdn jklasnjkl dnljkas nljkndlkjsanlk jndkajs njknasjk njklasdn ',
                markdownText: 'aksljnd jkasnjdn jklasnjkl dnljkas nljkndlkjsanlk jndkajs njknasjk njklasdn '
            }
        ],
        requestId: 134
    },
    tags: {
        url: 'https://dummy-api.example.com/api/feedback-type/',
        data: [
            {
                feedbackTypeId: 1,
                feedbackType: 'Positive'
            },
            {
                feedbackTypeId: 2,
                feedbackType: 'Improvement'
            },
            {
                feedbackTypeId: 3,
                feedbackType: 'Appreciation'
            }
        ]
    }
};
