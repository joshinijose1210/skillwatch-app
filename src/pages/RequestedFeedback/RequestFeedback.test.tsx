import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { routeConstants } from '@constants';
import MyFeedback from '@pages/MyFeedback';
import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { requestFeedbackMockData } from '@mocks/requestFeedback';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeAll(() => {
    const { url, data } = requestFeedbackMockData.feedback;
    mock.onGet(url).replyOnce(200, data);
    const { url: employeeUrl, data: employeeData } = requestFeedbackMockData.employee;
    mock.onGet(employeeUrl).replyOnce(200, employeeData);
});

beforeEach(mock.reset);

afterEach(cleanup);

describe('RequestedFeedback tabs', () => {
    it('should take snapshot and render properly', async () => {
        const { container } = RTKRender(<MyFeedback />);
        fireEvent.click(screen.getByTestId('inbox')); //Request Received tab should be open before snapshot is taken
        expect(container).toMatchSnapshot();
        const { url, data } = requestFeedbackMockData.feedback;
        mock.onGet(url).replyOnce(200, data);
        const { url: employeeUrl, data: employeeData } = requestFeedbackMockData.employee;
        mock.onGet(employeeUrl).replyOnce(200, employeeData);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getAllByText('Request Feedback')[0]).toBeInTheDocument();
    });

    it('should tab change propely', async () => {
        RTKRender(<MyFeedback />);
        fireEvent.click(screen.getByTestId('sent'));
        expect(await screen.findAllByText('Feedback From')).toHaveLength(2);
        fireEvent.click(screen.getByTestId('inbox'));
        expect(await screen.findAllByText('Requested From')).toHaveLength(2);
    });

    it('should redirect to add feedback page when clicked on add-feedback', () => {
        const { url, data } = requestFeedbackMockData.feedback;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<MyFeedback />);
        fireEvent.click(screen.getByTestId('inbox'));
        fireEvent.click(screen.getAllByText('Request Feedback')[0]);
        expect(mockNavigate).toHaveBeenCalledWith(
            `${routeConstants.threeSixtyDegreeFeedback}${routeConstants.requestFeedback}/undefined/Request`,
            {
                state: { requestId: undefined }
            }
        );
    });

    it('should redirect when click on view', async () => {
        const { url, data } = requestFeedbackMockData.feedback;
        mock.onGet(url).replyOnce(200, data);
        const { url: employeeUrl, data: employeeData } = requestFeedbackMockData.employee;
        mock.onGet(employeeUrl).replyOnce(200, employeeData);
        RTKRender(<MyFeedback />);
        fireEvent.click(screen.getByTestId('inbox'));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('View')[0]);
        expect(mockNavigate).toHaveBeenCalledWith(
            `${routeConstants.threeSixtyDegreeFeedback}${routeConstants.requestFeedback}/undefined/View-Requested-Feedback`,
            {
                state: {
                    ...requestFeedbackMockData.navigationState.state,
                    action: 'View'
                }
            }
        );
    });

    it('should filter work properly', async () => {
        const { url, url2, url3, url4, data } = requestFeedbackMockData.feedback;
        mock.onGet(url)
            .replyOnce(200, data)
            .onGet(url2)
            .replyOnce(200, data)
            .onGet(url3)
            .replyOnce(200, {})
            .onGet(url4)
            .replyOnce(200, data);
        const { url: employeeUrl, data: employeeData } = requestFeedbackMockData.employee;
        mock.onGet(employeeUrl).replyOnce(200, employeeData);
        RTKRender(<MyFeedback />);
        fireEvent.click(screen.getByTestId('inbox'));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getByTestId('employeeDropdown'));
        fireEvent.click(screen.getAllByText('M A (SR0067)')[0]);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getByTestId('feedbackToDropdown'));
        fireEvent.click(screen.getByText('U H (SR0069)'));
        mock.onGet(employeeUrl).replyOnce(200, employeeData);
        expect(await screen.findByText('No result')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('statusDropdown'), { target: { value: 'Complete' } });
        fireEvent.click(screen.getByText('Completed'));
        await waitFor(() => expect(screen.queryAllByText('View')[0].innerHTML).toEqual('View'), { timeout: 3000 });
    });

    it('should sorting work propely', async () => {
        const { url, sortUrl, data } = requestFeedbackMockData.feedback;
        mock.onGet(url).replyOnce(200, data).onGet(sortUrl).replyOnce(200, data);
        RTKRender(<MyFeedback />);
        fireEvent.click(screen.getByTestId('inbox'));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        const spanElement = screen.getByText('Date');
        fireEvent.click(spanElement);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        await waitFor(() => expect(screen.queryAllByText('View')[0].innerHTML).toEqual('View'), { timeout: 3000 });
    });
});
