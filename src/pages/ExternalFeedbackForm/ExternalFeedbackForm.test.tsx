import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import { ExternalFeedbackForm } from './ExternalFeedbackForm';
import { routeConstants } from '@constants';
import MockAdapter from 'axios-mock-adapter';
import * as reactRouterDom from 'react-router-dom';
import { externalFeedbackMockData } from '@mocks/externalFeedbackForm';
import axios from 'axios';
import { apiInstance } from '@utils';

const { url, postUrl, ID, REQUEST_ID, data, postData } = externalFeedbackMockData;
const { url: tagsUrl, data: tagsData } = externalFeedbackMockData.tags;

// this is required because of the implementation of getExternalFeedbackQuery function in useExternalFeedbackForm which uses useAxios hook
const isolatedMockInstance = new MockAdapter(axios);

// this is because the tags data GET API implementation uses the axiosBaseQuery from utils
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

describe('External Feedback Form', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({
            pathname: `${routeConstants.externalFeedbackForm}`,
            state: null,
            search: `?id=${ID}&requestId=${REQUEST_ID}`,
            hash: '',
            key: ''
        });
        isolatedMockInstance.onGet(url).reply(200, data);
        mock.onGet(tagsUrl).reply(200, tagsData);
    });

    afterEach(() => {
        mock.reset();
        cleanup;
    });

    describe('External Feedback Form', () => {
        it('should render properly', async () => {
            const { container } = RTKRender(<ExternalFeedbackForm />, {
                initialEntries: [`${routeConstants.externalFeedbackForm}?id=${ID}&requestId=${REQUEST_ID}`]
            });
            expect(container).toMatchSnapshot();
            expect(await screen.findByText('Feedback Form')).toBeInTheDocument();
        });

        it('should text editor work properly', async () => {
            isolatedMockInstance.onPost(postUrl).reply(201, { postData });
            RTKRender(<ExternalFeedbackForm />, {
                initialEntries: [`${routeConstants.externalFeedbackForm}?id=${ID}&requestId=${REQUEST_ID}`]
            });
            expect(await screen.findByText('Feedback Form')).toBeInTheDocument();
            const submitBtn = await screen.findByTestId('submit-button');

            const appreciationEditor = screen.getByTestId('appreciation').querySelector('.ql-editor > p') as HTMLParagraphElement;
            const improvementEditor = screen.getByTestId('improvement').querySelector('.ql-editor > p') as HTMLParagraphElement;
            const positiveEditor = screen.getByTestId('positive').querySelector('.ql-editor > p') as HTMLParagraphElement;
            if (!appreciationEditor || !improvementEditor || !positiveEditor) {
                throw new Error('Editor not found');
            }

            fireEvent.change(appreciationEditor, {
                target: { textContent: 'Test appreciation feedback added to check dummy response if working or not' }
            });
            await waitFor(() =>
                expect(appreciationEditor).toContainHTML('Test appreciation feedback added to check dummy response if working or not')
            );

            fireEvent.change(improvementEditor, {
                target: { textContent: 'Test improvement feedback added to check dummy response if working or not' }
            });

            await waitFor(() =>
                expect(improvementEditor).toContainHTML('Test improvement feedback added to check dummy response if working or not')
            );

            fireEvent.change(positiveEditor, {
                target: { textContent: 'Test positive feedback added to check dummy response if working or not' }
            });

            await waitFor(() =>
                expect(positiveEditor).toContainHTML('Test positive feedback added to check dummy response if working or not')
            );

            fireEvent.blur(appreciationEditor);
            fireEvent.blur(improvementEditor);
            fireEvent.blur(positiveEditor);

            await waitFor(() => expect(submitBtn).toBeEnabled());
            fireEvent.click(submitBtn);
            expect(await screen.findByText(/Thank you for submitting your feedback./i)).toBeInTheDocument();
        });

        it('should submit API error handled properly', async () => {
            isolatedMockInstance.onPost(postUrl).reply(400, {});
            RTKRender(<ExternalFeedbackForm />, {
                initialEntries: [`${routeConstants.externalFeedbackForm}?id=${ID}&requestId=${REQUEST_ID}`]
            });
            expect(await screen.findByText('Feedback Form')).toBeInTheDocument();
            const submitBtn = await screen.findByTestId('submit-button');

            const appreciationEditor = screen.getByTestId('appreciation').querySelector('.ql-editor > p') as HTMLParagraphElement;

            fireEvent.change(appreciationEditor, {
                target: { textContent: 'Test appreciation feedback added to check dummy response if working or not' }
            });
            await waitFor(() =>
                expect(appreciationEditor).toContainHTML('Test appreciation feedback added to check dummy response if working or not')
            );

            fireEvent.blur(appreciationEditor);

            await waitFor(() => expect(submitBtn).toBeEnabled());
            fireEvent.click(submitBtn);
            expect(await screen.findByText('Unable to submit feedback.')).toBeInTheDocument();
        });

        it('should already submitted text visible', async () => {
            isolatedMockInstance.onGet(url).reply(404, {});
            RTKRender(<ExternalFeedbackForm />, {
                initialEntries: [`${routeConstants.externalFeedbackForm}?id=${ID}&requestId=${REQUEST_ID}`]
            });
            expect(await screen.findByText('Feedback has already been submitted.')).toBeInTheDocument();
        });

        it('should API error handled properly', async () => {
            isolatedMockInstance.onGet(url).reply(400, {});
            RTKRender(<ExternalFeedbackForm />, {
                initialEntries: [`${routeConstants.externalFeedbackForm}?id=${ID}&requestId=${REQUEST_ID}`]
            });
            expect(await screen.findByText(`Oops! Something went wrong :(`)).toBeInTheDocument();
        });

        it('not found page must be visible', async () => {
            useLocationMock.mockReturnValue({
                pathname: `${routeConstants.externalFeedbackForm}/invalid`,
                state: null,
                search: `?id=${ID}&requestId=${REQUEST_ID}`,
                hash: '',
                key: ''
            });
            RTKRender(<ExternalFeedbackForm />);
            expect(await screen.findByText(`Go Back`)).toBeInTheDocument();
        });
    });
});
