import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { FeedbackForm } from './FeedbackForm';
import { routeConstants } from '@constants';
import * as reactRouterDom from 'react-router-dom';
import { myFeedbackFormMockData } from '@mocks/myFeedback';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { AddFeedbackMockData } from '@mocks/addFeedback';

const mockNavigate = jest.fn();
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

beforeEach(() => {
    useLocationMock.mockReturnValue({
        ...myFeedbackFormMockData.locationMockData,
        pathname: `${routeConstants.myFeedback}/1/add-feedback`,
        state: { ...myFeedbackFormMockData.mockState }
    });
    mock.reset();
});

afterEach(cleanup);

describe('Feedback component', () => {
    it('should take snapshot', async () => {
        const { container } = RTKRender(<FeedbackForm />);
        expect(container).toMatchSnapshot();
    });

    it('should fill in data and send when save button is clicked', async () => {
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.myFeedback}/1/add-feedback`,
            state: { ...myFeedbackFormMockData.mockState }
        });
        mock.onGet(AddFeedbackMockData.feedbackData.get.url).replyOnce(
            AddFeedbackMockData.feedbackData.get.responseCode,
            AddFeedbackMockData.feedbackData.get.data
        );
        mock.onGet(AddFeedbackMockData.employeesListData.get.url).replyOnce(
            AddFeedbackMockData.employeesListData.get.responseCode,
            AddFeedbackMockData.employeesListData.get.data
        );
        mock.onPost(AddFeedbackMockData.post.save.url).replyOnce(200, {});
        RTKRender(<FeedbackForm />);
        expect(screen.getByText('Add Feedback')).toBeInTheDocument();
        const feedbackTypeDropdown = await screen.findByLabelText('Feedback Type');
        expect(screen.getByText('Add Feedback')).toBeInTheDocument();
        const employeeName = await screen.findByPlaceholderText<HTMLInputElement>('Select Employee Name');
        const editor = screen.getByTestId('textquill');
        const saveAsDraftButton = screen.getByTestId('saveAsDraftButton');
        const sendButton = screen.getByTestId('sendButton');
        const text = 'jadsbbhshabjhjdasjadsbbhshabjhjdasjadsbbhshabjhjdasjadsbbhshabjhjdas';
        const pElement = editor.querySelector('.ql-editor > p') as HTMLParagraphElement;
        expect(employeeName).toBeInTheDocument();
        expect(feedbackTypeDropdown).toBeInTheDocument();
        expect(pElement).toBeInTheDocument();
        expect(saveAsDraftButton).toBeInTheDocument();
        expect(saveAsDraftButton).toBeDisabled();
        fireEvent.change(pElement, { target: { textContent: text } });
        await waitFor(() => expect(pElement).toHaveTextContent(text));
        fireEvent.click(employeeName);
        const employeeOptions = await screen.findAllByText('User Test (SR003)');
        fireEvent.click(employeeOptions[0]);
        await waitFor(() => expect(employeeName.value).toBe('User Test (SR003)'));
        await waitFor(() => expect(saveAsDraftButton).toBeEnabled());
        fireEvent.click(sendButton);
        expect(await screen.findByText('Feedback submitted successfully')).toBeInTheDocument();
    });

    it('should show error toast when fill in data and send when save button is clicked but fails', async () => {
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.myFeedback}/1/add-feedback`,
            state: { ...myFeedbackFormMockData.mockState }
        });
        mock.onGet(AddFeedbackMockData.feedbackData.get.url).replyOnce(
            AddFeedbackMockData.feedbackData.get.responseCode,
            AddFeedbackMockData.feedbackData.get.data
        );
        mock.onGet(AddFeedbackMockData.employeesListData.get.url).replyOnce(
            AddFeedbackMockData.employeesListData.get.responseCode,
            AddFeedbackMockData.employeesListData.get.data
        );
        mock.onPost(AddFeedbackMockData.post.save.url).replyOnce(404, { message: 'something went wrong' });
        RTKRender(<FeedbackForm />);
        const feedbackTypeDropdown = await screen.findByLabelText('Feedback Type');
        const employeeName = await screen.findByPlaceholderText<HTMLInputElement>('Select Employee Name');
        const editor = screen.getByTestId('textquill');
        const saveAsDraftButton = screen.getByTestId('saveAsDraftButton');
        const sendButton = screen.getByTestId('sendButton');
        const text = 'jadsbbhshabjhjdasjadsbbhshabjhjdasjadsbbhshabjhjdasjadsbbhshabjhjdas';
        const pElement = editor.querySelector('.ql-editor > p') as HTMLParagraphElement;
        expect(employeeName).toBeInTheDocument();
        expect(feedbackTypeDropdown).toBeInTheDocument();
        expect(pElement).toBeInTheDocument();
        expect(saveAsDraftButton).toBeInTheDocument();
        expect(saveAsDraftButton).toBeDisabled();
        fireEvent.change(pElement, { target: { textContent: text } });
        await waitFor(() => expect(pElement).toHaveTextContent(text));
        fireEvent.click(employeeName);
        const employeeOptions = await screen.findAllByText('User Test (SR003)');
        fireEvent.click(employeeOptions[0]);
        await waitFor(() => expect(employeeName.value).toBe('User Test (SR003)'));
        await waitFor(() => expect(saveAsDraftButton).toBeEnabled());
        fireEvent.click(sendButton);
        expect(await screen.findByText('something went wrong')).toBeInTheDocument();
    });

    it('should show success toast when fill in data and save as draft when saveAsDraft button is clicked is succesful', async () => {
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.myFeedback}/1/add-feedback`,
            state: { ...myFeedbackFormMockData.mockState, action: 'Edit', srNo: 1 }
        });
        mock.onGet(AddFeedbackMockData.feedbackData.get.url).replyOnce(
            AddFeedbackMockData.feedbackData.get.responseCode,
            AddFeedbackMockData.feedbackData.get.data
        );
        mock.onGet(AddFeedbackMockData.employeesListData.get.url).replyOnce(
            AddFeedbackMockData.employeesListData.get.responseCode,
            AddFeedbackMockData.employeesListData.get.data
        );
        mock.onPut(AddFeedbackMockData.post.saveAsDraft.url).replyOnce(200, {});
        RTKRender(<FeedbackForm />);
        expect(await screen.findByText('Edit Feedback')).toBeInTheDocument();
        const feedbackTypeDropdown = await screen.findByLabelText('Feedback Type');
        const employeeName = await screen.findByPlaceholderText<HTMLInputElement>('Select Employee Name');
        const editor = screen.getByTestId('textquill');
        const saveAsDraftButton = screen.getByTestId('saveAsDraftButton');
        const text = 'this is the test feedback that should have atleast 50 characters.';
        const pElement = editor.querySelector('.ql-editor > p') as HTMLParagraphElement;
        expect(employeeName).toBeInTheDocument();
        expect(feedbackTypeDropdown).toBeInTheDocument();
        expect(pElement).toBeInTheDocument();
        expect(saveAsDraftButton).toBeInTheDocument();
        expect(saveAsDraftButton).toBeDisabled();
        fireEvent.change(pElement, { target: { textContent: text } });
        await waitFor(() => expect(pElement).toHaveTextContent(text));
        fireEvent.click(employeeName);
        fireEvent.change(feedbackTypeDropdown, { target: { value: 'Appreciation' } });
        const employeeOptions = await screen.findAllByText('User Test (SR003)');
        fireEvent.click(employeeOptions[0]);
        await waitFor(() => expect(employeeName.value).toBe('User Test (SR003)'));
        await waitFor(() => expect(saveAsDraftButton).toBeEnabled());
        fireEvent.click(saveAsDraftButton);
        expect(await screen.findByText('Feedback saved successfully')).toBeInTheDocument();
    });

    it('should show error toast when fill in data and save as draft when saveAsDraft button is clicked but api fails to save', async () => {
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.myFeedback}/1/add-feedback`,
            state: { ...myFeedbackFormMockData.mockState, action: 'Edit', srNo: 1 }
        });
        mock.onGet(AddFeedbackMockData.feedbackData.get.url).replyOnce(
            AddFeedbackMockData.feedbackData.get.responseCode,
            AddFeedbackMockData.feedbackData.get.data
        );
        mock.onGet(AddFeedbackMockData.employeesListData.get.url).replyOnce(
            AddFeedbackMockData.employeesListData.get.responseCode,
            AddFeedbackMockData.employeesListData.get.data
        );
        mock.onPut(AddFeedbackMockData.post.saveAsDraft.url).replyOnce(404, { message: 'something didnt work' });
        RTKRender(<FeedbackForm />);
        expect(await screen.findByText('Edit Feedback')).toBeInTheDocument();
        const feedbackTypeDropdown = await screen.findByLabelText('Feedback Type');
        const employeeName = await screen.findByPlaceholderText<HTMLInputElement>('Select Employee Name');
        const editor = screen.getByTestId('textquill');
        const saveAsDraftButton = screen.getByTestId('saveAsDraftButton');
        const text = 'this is the test feedback that should have atleast 50 characters.';
        const pElement = editor.querySelector('.ql-editor > p') as HTMLParagraphElement;
        expect(employeeName).toBeInTheDocument();
        expect(feedbackTypeDropdown).toBeInTheDocument();
        expect(pElement).toBeInTheDocument();
        expect(saveAsDraftButton).toBeInTheDocument();
        expect(saveAsDraftButton).toBeDisabled();
        fireEvent.change(pElement, { target: { textContent: text } });
        await waitFor(() => expect(pElement).toHaveTextContent(text));
        fireEvent.click(employeeName);
        fireEvent.change(feedbackTypeDropdown, { target: { value: 'Appreciation' } });
        const employeeOptions = await screen.findAllByText('User Test (SR003)');
        fireEvent.click(employeeOptions[0]);
        await waitFor(() => expect(employeeName.value).toBe('User Test (SR003)'));
        await waitFor(() => expect(saveAsDraftButton).toBeEnabled());
        fireEvent.click(saveAsDraftButton);
        expect(await screen.findByText('something didnt work')).toBeInTheDocument();
    });

    it('should fetch and fill in data for edit form', async () => {
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.myFeedback}/1/add-feedback`,
            state: {
                ...myFeedbackFormMockData.mockState,
                action: 'Edit',
                feedbackTypeId: 2,
                feedbackType: 'Improvement',
                feedback: 'this is feedback test while edit state',
                actionFrom: 'ReceivedFeedback',
                feedbackFromId: 134
            }
        });
        mock.onGet(AddFeedbackMockData.feedbackData.get.url).replyOnce(
            AddFeedbackMockData.feedbackData.get.responseCode,
            AddFeedbackMockData.feedbackData.get.data
        );
        mock.onGet(AddFeedbackMockData.employeesListData.get.url).replyOnce(
            AddFeedbackMockData.employeesListData.get.responseCode,
            AddFeedbackMockData.employeesListData.get.data
        );
        RTKRender(<FeedbackForm />);
        const feedbackTypeDropdown = screen.getByPlaceholderText<HTMLInputElement>('Select Feedback Type');
        const editor = screen.getByTestId('textquill');
        const pElement = editor.querySelector('.ql-editor > p') as HTMLParagraphElement;
        await waitFor(() => expect(pElement).toHaveTextContent(/this is feedback test while edit state/i));
        await waitFor(() => expect(feedbackTypeDropdown).toHaveValue('Improvement'));
    });
});
