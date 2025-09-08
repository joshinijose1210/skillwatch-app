import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { RequestFeedbackForm } from './RequestFeedbackForm';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { ManagerReviewMockData } from '@mocks/managerReview';
import * as reactRouterDom from 'react-router-dom';
import { feedbackFormMockData } from '@mocks/feedbackForm';
import { userMockState } from '@mocks/userMockState';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
    useLocationMock.mockReturnValue({
        ...ManagerReviewMockData.LocationMockData,
        state: { ...feedbackFormMockData.mockState, action: 'Add' }
    });
    const test = 'Request feedback form component should render with proper data if view any request';
    if (expect.getState().currentTestName?.includes(test)) {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            pathname: 'my-feedback/Request-Feedback/1/View-Requested-Feedback',
            state: {
                ...feedbackFormMockData.mockState,
                action: 'View',
                isExternalRequest: true,
                externalFeedbackFromEmail: 'test@gmail.com'
            }
        });
    }
    cleanup();
});

afterEach(cleanup);

describe('Request feedback form component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<RequestFeedbackForm />);
        expect(container).toMatchSnapshot();
    });

    it('should render propely', () => {
        RTKRender(<RequestFeedbackForm />);
        expect(screen.getByText('Request')).toBeInTheDocument();
        const SentBtn = screen.getByTestId('sendBtn');
        expect(SentBtn).toBeInTheDocument();
        expect(SentBtn).toBeDisabled();
    });

    it('should add request if correct data is entered', async () => {
        const { url, data2 } = feedbackFormMockData.employee;
        mock.onGet(url).replyOnce(200, data2);
        const { url: actionItemUrl, data: actionItemData } = feedbackFormMockData.actionItems;
        mock.onGet(actionItemUrl).replyOnce(200, actionItemData);
        mock.onPost('https://dummy-api.example.com/api/feedback-request/').replyOnce(200, {});
        const { container, rerender } = RTKRender(<RequestFeedbackForm />);
        rerender(<RequestFeedbackForm />);
        const input = container.querySelector('#feedbackfrom-input');
        expect(input).not.toBeNull();
        fireEvent.click(screen.getByTestId('employeeOne'));
        await screen.findByText('T S (SR0007)');
        fireEvent.click(screen.getByText('T S (SR0007)'));
        await new Promise(resolve => setTimeout(resolve, 0));
        fireEvent.click(screen.getByTestId('employeeTwo'));
        await screen.findByText('A S (123)');
        fireEvent.click(screen.getByText('A S (123)'));
        await new Promise(resolve => setTimeout(resolve, 0));
        const editor = container
            .querySelector('[data-placeholder="Please mention the project/task for which you want the feedback"]')
            ?.getElementsByTagName('p');
        if (editor !== undefined) {
            fireEvent.change(editor[0], {
                target: { innerHTML: 'This a test feedback request just to verify the functionality of the component.' }
            });
        }
        const SentBtn = screen.getByTestId('sendBtn');
        await waitFor(() => expect(SentBtn).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(SentBtn);
        await screen.findByText('Request Feedback submitted successfully');
    });

    it('should check if external email input and validations are working correctly', async () => {
        const { url, data2 } = feedbackFormMockData.employee;
        mock.onGet(url).replyOnce(200, data2);
        const { url: actionItemUrl, data: actionItemData } = feedbackFormMockData.actionItems;
        mock.onGet(actionItemUrl).replyOnce(404, actionItemData);
        const { container } = RTKRender(<RequestFeedbackForm />, { initialState: userMockState });
        expect(screen.getByText('Request')).toBeInTheDocument();
        const SentBtn = screen.getByTestId('sendBtn');
        fireEvent.click(screen.getByTestId('toggle'));
        fireEvent.click(screen.getByLabelText('Enter email'));
        fireEvent.change(screen.getByLabelText('Enter email'), { target: { value: 'external@gmail.com' } });
        fireEvent.click(screen.getByText('Create "external@gmail.com"'));
        await waitFor(() => expect(screen.getByLabelText('Enter email')).toHaveValue(''));
        fireEvent.change(screen.getByLabelText('Enter email'), { target: { value: 'abc@scalereal.com' } });
        fireEvent.click(screen.getByText('Create "abc@scalereal.com"'));
        expect(await screen.findByText('Cannot send request to same user.')).toBeInTheDocument();
        const editor = container
            .querySelector('[data-placeholder="Please mention the project/task for which you want the feedback"]')
            ?.getElementsByTagName('p');
        if (editor !== undefined) {
            fireEvent.change(editor[0], { target: { innerHTML: 'limit should be of 50 characters' } });
        }
        await screen.findByText('Please write more than 50 characters.');
        expect(SentBtn).toBeDisabled();
    });

    it('should render with proper data if view any request', () => {
        const { url, data } = feedbackFormMockData.employee;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<RequestFeedbackForm />);
        expect(screen.getByText('View Requested Feedback')).toBeInTheDocument();
        expect(screen.getByText('Test request')).toBeInTheDocument();
        expect(screen.getByText('requested data')).toBeInTheDocument();
    });
});
