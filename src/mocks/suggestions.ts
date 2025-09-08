export const suggestionMockData = {
    url: 'https://dummy-api.example.com/api/suggestion/?organisationId=1&suggestionById=72&reviewCycleId=&isDraft=true,false&page=undefined&progressIds=-99&limit=10&sortBy=dateDesc',
    receivedUrl:
        'https://dummy-api.example.com/api/suggestion/?organisationId=1&suggestionById=-99&reviewCycleId=&isDraft=false&page=undefined&progressIds=-99&limit=10&sortBy=dateDesc',
    progressListUrl: 'https://dummy-api.example.com/api/suggestion/progress-list/',
    progressUpdateUrl: 'https://dummy-api.example.com/api/suggestion/progress/189',
    settingsURL: 'https://dummy-api.example.com/api/organisation/general-settings/?organisationId=1',
    settingsData: {
        organisationId: 1,
        isManagerReviewMandatory: true,
        isAnonymousSuggestionAllowed: true
    },
    responseCode: 200,
    data: {
        totalSuggestions: 2,
        suggestions: [
            {
                id: 189,
                organisationId: 21,
                date: 1715323333657,
                suggestion: '<p>gfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>',
                suggestedById: 69,
                suggestedByEmployeeId: 'C0001',
                suggestedByFirstName: 'Test',
                suggestedByLastName: 'User',
                isDraft: false,
                isAnonymous: false,
                progressId: 1,
                progressName: 'Pending'
            },
            {
                id: 188,
                organisationId: 21,
                date: 1715321803496,
                suggestion: '<p>yutrtuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu</p>',
                suggestedById: 69,
                suggestedByEmployeeId: 'C0001',
                suggestedByFirstName: 'Test',
                suggestedByLastName: 'User',
                isDraft: true,
                isAnonymous: false,
                progressId: 1,
                progressName: 'Pending'
            }
        ]
    },
    progressFilterAllUrl:
        'https://dummy-api.example.com/api/suggestion/?organisationId=1&suggestionById=-99&reviewCycleId=&isDraft=false&page=undefined&progressIds=-99&limit=10&sortBy=dateDesc',
    progressFilterAllData: {
        totalSuggestions: 2,
        suggestions: [
            {
                id: 12,
                organisationId: 3,
                date: 1749704241131,
                suggestion:
                    "<p>When providing suggestions to a company, it' essential to communicate effectively and offer constructive ideas.When providing suggestions to a company, it' essential to communicate effectively and offer constructive ideas.</p>",
                isDraft: false,
                isAnonymous: true,
                progressId: 2,
                progressName: 'Completed'
            },
            {
                id: 12,
                organisationId: 3,
                date: 1749704241131,
                suggestion:
                    "<p>When providing suggestions to a company, it' essential to communicate effectively and offer constructive ideas.When providing suggestions to a company, it' essential to communicate effectively and offer constructive ideas.</p>",
                isDraft: false,
                isAnonymous: true,
                progressId: 2,
                progressName: 'Completed'
            },
            {
                id: 12,
                organisationId: 3,
                date: 1749704241131,
                suggestion:
                    "<p>When providing suggestions to a company, it' essential to communicate effectively and offer constructive ideas.When providing suggestions to a company, it' essential to communicate effectively and offer constructive ideas.</p>",
                isDraft: false,
                isAnonymous: true,
                progressId: 2,
                progressName: 'Completed'
            },
            {
                id: 11,
                organisationId: 3,
                date: 1749703135479,
                suggestion:
                    '<p><span style="background-color: rgb(247, 248, 249); color: rgb(96, 120, 144);">Advocate for a paperless office to reduce environmental impact and increase efficiency</span></p>',
                isDraft: false,
                isAnonymous: true,
                progressId: 1,
                progressName: 'Pending'
            },
            {
                id: 11,
                organisationId: 3,
                date: 1749703135479,
                suggestion:
                    '<p><span style="background-color: rgb(247, 248, 249); color: rgb(96, 120, 144);">Advocate for a paperless office to reduce environmental impact and increase efficiency</span></p>',
                isDraft: false,
                isAnonymous: true,
                progressId: 1,
                progressName: 'Pending'
            },
            {
                id: 11,
                organisationId: 3,
                date: 1749703135479,
                suggestion:
                    '<p><span style="background-color: rgb(247, 248, 249); color: rgb(96, 120, 144);">Advocate for a paperless office to reduce environmental impact and increase efficiency</span></p>',
                isDraft: false,
                isAnonymous: true,
                progressId: 1,
                progressName: 'Pending'
            },
            {
                id: 11,
                organisationId: 3,
                date: 1749703135479,
                suggestion:
                    '<p><span style="background-color: rgb(247, 248, 249); color: rgb(96, 120, 144);">Advocate for a paperless office to reduce environmental impact and increase efficiency</span></p>',
                isDraft: false,
                isAnonymous: true,
                progressId: 1,
                progressName: 'Pending'
            },
            {
                id: 11,
                organisationId: 3,
                date: 1749703135479,
                suggestion:
                    '<p><span style="background-color: rgb(247, 248, 249); color: rgb(96, 120, 144);">Advocate for a paperless office to reduce environmental impact and increase efficiency</span></p>',
                isDraft: false,
                isAnonymous: true,
                progressId: 1,
                progressName: 'Pending'
            }
        ]
    },

    progressFilterUrl:
        'https://dummy-api.example.com/api/suggestion/?organisationId=3&suggestionById=-99&reviewCycleId=89&isDraft=false&page=1&progressIds=1&limit=10&sortBy=dateDesc',
    progressFilterPendingData: {
        totalSuggestions: 4,
        suggestions: [
            {
                id: 16,
                organisationId: 3,
                date: 1749713888458,
                suggestion:
                    '<p><span style="color: rgb(96, 120, 144);">eas.</span></p><ul><li>Do Your Research: Understand the company\' goals, values, and current strategies before making suggestions. Research industry best practices to provide informed recommendations.</li><li>Be Clear and Concise: Clearly articulate your suggestion in a concise manner to ensure easy understanding. Avoid unnecessary jargon or technical language that may confuse the audience.</li><li>Provide Context: Explain the reasoning behind your suggestion. Clearly state the problem or opportunity that your suggestion addresses.</li><li>Consider Feasibility: Ensure your suggestions are realistic and feasible within the company\' resources, budget, and timeframe.</li></ul><p><br></p>',
                isDraft: false,
                isAnonymous: true,
                progressId: 1,
                progressName: 'Pending'
            },

            {
                id: 14,
                organisationId: 3,
                date: 1749713672017,
                suggestion:
                    "<p><span style=\"color: rgb(96, 120, 144);\">When providing suggestions to a company, it' essential to communicate effectively and offer constructive ideas.</span></p><ul><li>Do Your Research: Understand the company' goals, values, and current strategies before making suggestions. Research industry best practices to provide informed recommendations.</li><li>Be Clear and Concise: Clearly articulate your suggestion in a concise manner to ensure easy understanding. Avoid unnecessary jargon or technical language that may confuse the audience.</li><li>Provide Context: Explain the reasoning behind your suggestion. Clearly state the problem or opportunity that your suggestion addresses.</li><li>Consider Feasibility: Ensure your suggestions are realistic and feasible within the company' resources, budget, and timeframe.</li><li>Focus on Benefits: Emphasise the positive impact of your suggestion on the company' goals, efficiency, or team members.</li></ul><p><br></p>",
                isDraft: false,
                isAnonymous: true,
                progressId: 1,
                progressName: 'Pending'
            },
            {
                id: 11,
                organisationId: 3,
                date: 1749703135479,
                suggestion:
                    '<p><span style="background-color: rgb(247, 248, 249); color: rgb(96, 120, 144);">Advocate for a paperless office to reduce environmental impact and increase efficiency</span></p>',
                isDraft: false,
                isAnonymous: true,
                progressId: 1,
                progressName: 'Pending'
            },
            {
                id: 10,
                organisationId: 3,
                date: 1749454935684,
                suggestion: '<p>we should have new learnings everyday to improve our knowledge.</p>',
                isDraft: false,
                isAnonymous: true,
                progressId: 1,
                progressName: 'Pending'
            }
        ]
    },
    progressList: [
        {
            progressId: 1,
            progressName: 'Pending'
        },
        {
            progressId: 2,
            progressName: 'Completed'
        },
        {
            progressId: 3,
            progressName: 'Deferred'
        }
    ],
    locationMockData: {
        pathname: '/',
        state: null,
        search: '',
        hash: '',
        key: ''
    },
    mockState: {
        action: '',
        id: 189,
        organisationId: 21,
        date: 1715323333657,
        suggestion: '<p>gfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>',
        suggestedById: 69,
        suggestedByEmployeeId: 'C0001',
        suggestedByFirstName: 'Test',
        suggestedByLastName: 'User',
        isDraft: false,
        isAnonymous: false,
        progressId: 1,
        progressName: 'Pending'
    }
};

export const notificationCountData = {
    url: 'https://dummy-api.example.com/api/suggestion/pending-count/?organisationId=3&reviewCycleId=89',
    data: { pendingSuggestions: 2 },
    notPendingData: { pendingSuggestions: 1 }
};
