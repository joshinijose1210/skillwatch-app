import { RTKRender, fireEvent, screen, waitFor } from '@utils/test-utils';
import { RequestedFeedbackForm } from './RequestedFeedbackForm';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { ManagerReviewMockData } from '@mocks/managerReview';
import { requestFeedbackMockData } from '@mocks/requestFeedback';
import * as reactRouterDom from 'react-router-dom';
import { feedbackFormMockData } from '@mocks/feedbackForm';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeAll(() => {
    const { data } = requestFeedbackMockData.employee;
    mock.onGet(
        'https://dummy-api.example.com/api/employees/?teamId=-99&designationId=-99&organisationId=1&roleId=-99&sortOrderId=1&departmentId=-99'
    ).reply(200, data);
    const { url: feedbackTypeUrl, data: feedbackTypeData } = feedbackFormMockData.feedbackType;
    mock.onGet(feedbackTypeUrl).reply(200, feedbackTypeData);
});

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

describe('Requested FeedbackForm feedback form component for Add action', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...feedbackFormMockData.mockState, action: 'Add' }
        });
    });

    it('should take snapshot', () => {
        const { container } = RTKRender(<RequestedFeedbackForm />);
        expect(container).toMatchSnapshot();
    });

    it('should render propely', () => {
        RTKRender(<RequestedFeedbackForm />);
        expect(screen.getByText('Add Requested Feedback')).toBeInTheDocument();
        const SentBtn = screen.getByTestId('sendBtn');
        expect(SentBtn).toBeInTheDocument();
        expect(SentBtn).toBeDisabled();
    });

    it('should add request if correct data is entered', async () => {
        const { url: actionItemUrl, data: actionItemData } = feedbackFormMockData.actionItems;
        mock.onGet(actionItemUrl).replyOnce(200, actionItemData);
        mock.onPost('https://dummy-api.example.com/api/feedback/').replyOnce(200, {});
        const { container, rerender } = RTKRender(<RequestedFeedbackForm />);
        rerender(<RequestedFeedbackForm />);
        fireEvent.click(screen.getByText(/Appreciation Note/i));
        const editor = screen.getByTestId('appreciation');
        const htmlTag = container.querySelector('.ql-editor');
        const list = container.querySelector('.ql-list');
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        list && fireEvent.click(list);
        if (htmlTag) {
            fireEvent.click(htmlTag);
            fireEvent.change(htmlTag, {
                target: {
                    innerHTML:
                        '<ul><li><strong><s>This a test feedback request just to verify the functionality of the component.</s></strong></li></ul>'
                }
            });
        }
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        const SentBtn = screen.getByTestId('sendBtn');
        await waitFor(() => expect(SentBtn).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(SentBtn);
        await screen.findByText('Requested Feedback submitted successfully');
    });

    it('should not add request if api fails', async () => {
        const { url: actionItemUrl, data: actionItemData } = feedbackFormMockData.actionItems;
        mock.onGet(actionItemUrl).replyOnce(200, actionItemData);
        mock.onPost('https://dummy-api.example.com/api/feedback/').replyOnce(400, {});
        const { container, rerender } = RTKRender(<RequestedFeedbackForm />);
        rerender(<RequestedFeedbackForm />);
        fireEvent.click(screen.getByText(/Improvement Pointers/i));
        const editor = screen.getByTestId('improvement');
        const htmlTag = container.querySelector('.ql-editor')?.getElementsByTagName('p');
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        if (htmlTag !== undefined) {
            fireEvent.click(htmlTag[0]);
            fireEvent.change(htmlTag[0], {
                target: { innerHTML: 'This a test feedback request just to verify the functionality of the component.' }
            });
        }
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        const SentBtn = screen.getByTestId('sendBtn');
        await waitFor(() => expect(SentBtn).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(SentBtn);
        await screen.findByText('Sorry, Feedback not submitted. Please try again Later.');
    });
});

describe('Requested FeedbackForm feedback form component for Edit action', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...feedbackFormMockData.mockState, action: 'Edit' }
        });
    });

    it('should render propely', async () => {
        const { url, data } = requestFeedbackMockData.singleRequestedFeedback;
        mock.onGet(url).reply(200, data);
        RTKRender(<RequestedFeedbackForm />);
        expect(screen.getByText('Edit Requested Feedback')).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText('M A (SR0067)')), { timeout: 3000 });
        await waitFor(() => expect(screen.queryByText('R A (SR0068)')), { timeout: 3000 });
        expect(screen.getByText('Test request')).toBeInTheDocument();
        const SentBtn = screen.getByTestId('sendBtn');
        expect(SentBtn).toBeInTheDocument();
        expect(SentBtn).toBeEnabled();
    });

    it('should edit request and save as draft flow work properly', async () => {
        const { url: actionItemUrl, data: actionItemData } = feedbackFormMockData.actionItems;
        mock.onGet(actionItemUrl).replyOnce(200, actionItemData);
        mock.onPut('https://dummy-api.example.com/api/feedback/409').replyOnce(200, {});
        const { container } = RTKRender(<RequestedFeedbackForm />);
        fireEvent.click(screen.getByText(/Improvement Pointers/i));
        const editor = container.querySelector('[data-placeholder="Write feedback here..."]')?.getElementsByTagName('p');
        if (editor !== undefined) {
            fireEvent.change(editor[0], {
                target: { innerHTML: 'This a test feedback request just to verify the functionality of the component.' }
            });
        }
        const SentBtn = screen.getByTestId('draftBtn');
        await waitFor(() => expect(SentBtn).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(SentBtn);
        await screen.findByText('Requested feedback saved successfully');
    });
});
