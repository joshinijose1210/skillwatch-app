import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { ReceivedFeedback } from './ReceivedFeedback';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { receivedFeedbackMockData } from '@mocks/receivedFeedback';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeAll(() => {
    const { url, data } = receivedFeedbackMockData.received;
    mock.onGet(url).replyOnce(200, data);
    const { url: employeeListUrl, data: EmployeeList } = receivedFeedbackMockData.employees;
    mock.onGet(employeeListUrl).replyOnce(200, EmployeeList);
    const { url: feedbackTypeUrl, data: feedbackTypeList } = receivedFeedbackMockData.feedbackType;
    mock.onGet(feedbackTypeUrl).replyOnce(200, feedbackTypeList);
});

beforeEach(() => {
    cleanup();
});

afterEach(mock.reset);

describe('Received feedback component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<ReceivedFeedback />);
        expect(container).toMatchSnapshot();
    });

    it('should render propely', async () => {
        const { url, data } = receivedFeedbackMockData.received;
        mock.onGet(url).replyOnce(200, data);
        const { url: feedbackTypeUrl, data: feedbackTypeList } = receivedFeedbackMockData.feedbackType;
        mock.onGet(feedbackTypeUrl).replyOnce(200, feedbackTypeList);
        RTKRender(<ReceivedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getByText('Received Feedback')).toBeInTheDocument();
        expect(screen.getByText('A D (SR0067)')).toBeInTheDocument();
    });

    it('should show no result when api fails', async () => {
        RTKRender(<ReceivedFeedback />);
        await screen.findByText('No result');
    });

    it('should navigate when click on view', async () => {
        const { url, data } = receivedFeedbackMockData.received;
        mock.onGet(url).replyOnce(200, data);
        const { url: feedbackTypeUrl, data: feedbackTypeList } = receivedFeedbackMockData.feedbackType;
        mock.onGet(feedbackTypeUrl).replyOnce(200, feedbackTypeList);
        RTKRender(<ReceivedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('View')[0]);
    });

    it('should filter list when filter is selected', async () => {
        const { url, url2, url3, data, filterData } = receivedFeedbackMockData.received;
        mock.onGet(url).replyOnce(200, data).onGet(url2).replyOnce(200, filterData).onGet(url3).replyOnce(200, {});
        const { url: employeeListUrl, data: EmployeeList } = receivedFeedbackMockData.employees;
        mock.onGet(employeeListUrl).replyOnce(200, EmployeeList).onGet(employeeListUrl).reply(200, EmployeeList);
        const { url: feedbackTypeUrl, data: feedbackTypeList } = receivedFeedbackMockData.feedbackType;
        mock.onGet(feedbackTypeUrl).replyOnce(200, feedbackTypeList);
        RTKRender(<ReceivedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.change(screen.getByPlaceholderText('Select Employee Name'), { target: { value: 'M P (SR0023)' } });
        fireEvent.click(screen.getByText('M P (SR0023)'));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getByText('B E (SR0023)')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('feedbackTypeDropDown'));
        await screen.findByText('Improvement');
        fireEvent.click(screen.getByText('Improvement'));
        await screen.findByText('No result');
    });

    it('should pagination work properly', async () => {
        const { url, pageUrl, data } = receivedFeedbackMockData.received;
        mock.onGet(url).replyOnce(200, data).onGet(pageUrl).replyOnce(200, {});
        RTKRender(<ReceivedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getByText(2));
        await screen.findByText('No result');
    });

    it('should sorting work propely', async () => {
        const { url, sortUrl, data } = receivedFeedbackMockData.received;
        mock.onGet(url).replyOnce(200, data).onGet(sortUrl).replyOnce(200, data);
        RTKRender(<ReceivedFeedback />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        const spanElement = screen.getByText('Date');
        fireEvent.click(spanElement);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
    });
});
