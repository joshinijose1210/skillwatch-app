import { RTKRender, fireEvent, screen, waitFor } from '@utils/test-utils';
import SubmittedFeedback from './SubmittedFeedback';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { routeConstants } from '@constants';
import { submitFeedbackMockData } from '@mocks/submitFeedback';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

beforeAll(() => {
    const { url: feedbackTypeUrl, data: feedbackTypeList } = submitFeedbackMockData.feedbackType;
    mock.onGet(feedbackTypeUrl).replyOnce(200, feedbackTypeList);
});

describe('SubmittedFeedback component', () => {
    test('should take snapshot', () => {
        const { container } = RTKRender(<SubmittedFeedback />);
        expect(container).toMatchSnapshot();
    });

    it('should render propely', async () => {
        const { url, data } = submitFeedbackMockData.submitted;
        mock.onGet(url).replyOnce(200, data);
        const { url: feedbackTypeUrl, data: feedbackTypeList } = submitFeedbackMockData.feedbackType;
        mock.onGet(feedbackTypeUrl).replyOnce(200, feedbackTypeList);
        RTKRender(<SubmittedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getByText('Submitted Feedback')).toBeInTheDocument();
        expect(screen.getByText('Manoj Patil (SR0033)')).toBeInTheDocument();
    });

    it('should redirect to add feedback page when clicked on add-feedback', () => {
        RTKRender(<SubmittedFeedback />);
        fireEvent.click(screen.getByText('Add Feedback'));
        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.submittedFeedback}/undefined/add-feedback`, {
            state: { action: 'Add' }
        });
    });

    it('should navigate when click on view', async () => {
        const { url, data } = submitFeedbackMockData.submitted;
        mock.onGet(url).replyOnce(200, data);
        const { url: feedbackTypeUrl, data: feedbackTypeList } = submitFeedbackMockData.feedbackType;
        mock.onGet(feedbackTypeUrl).replyOnce(200, feedbackTypeList);
        RTKRender(<SubmittedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('View')[0]);
        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.threeSixtyDegreeFeedback}/submitted-feedback/1`);
    });

    it('should filter list when filter is selected', async () => {
        const { url, url2, url3, data, filterData } = submitFeedbackMockData.submitted;
        mock.onGet(url).replyOnce(200, data).onGet(url2).replyOnce(200, filterData).onGet(url3).replyOnce(200, {});
        const { url: employeeListUrl, data: EmployeeList } = submitFeedbackMockData.employees;
        mock.onGet(employeeListUrl).replyOnce(200, EmployeeList).onGet(employeeListUrl).reply(200, EmployeeList);
        const { url: feedbackTypeUrl, data: feedbackTypeList } = submitFeedbackMockData.feedbackType;
        mock.onGet(feedbackTypeUrl).replyOnce(200, feedbackTypeList);
        RTKRender(<SubmittedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.change(screen.getByPlaceholderText('Select Employee Name'), { target: { value: 'M P (SR0023)' } });
        fireEvent.click(screen.getByText('M P (SR0023)'));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getByText('Manoj Patil (SR0033)')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('feedbackTypeDropDown'));
        await screen.findAllByText('Improvement');
        fireEvent.click(screen.getAllByText('Improvement')[0]);
        await screen.findByText('No result');
    });

    it('should pagination work properly', async () => {
        const { url, pageUrl, data } = submitFeedbackMockData.submitted;
        mock.onGet(url).replyOnce(200, data).onGet(pageUrl).replyOnce(200, {});
        RTKRender(<SubmittedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getByText(2));
        await screen.findByText('No result');
    });

    it('should sorting work propely', async () => {
        const { url, sortUrl, data } = submitFeedbackMockData.submitted;
        mock.onGet(url).replyOnce(200, data).onGet(sortUrl).replyOnce(200, data);
        RTKRender(<SubmittedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        const spanElement = screen.getByText('Date');
        fireEvent.click(spanElement);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
    });
});
