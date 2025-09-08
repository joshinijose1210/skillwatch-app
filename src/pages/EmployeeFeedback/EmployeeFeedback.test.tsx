import { fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import { EmployeeFeedbackMockData } from '@mocks/employeefeedback';
import { apiInstance } from '@utils';
import MockAdapter from 'axios-mock-adapter';
import EmployeeFeedback from './EmployeeFeedback';
import { routeConstants } from '@constants';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate
}));

beforeAll(() => {
    const { feedbackTypeData } = EmployeeFeedbackMockData.get;
    mock.onGet(feedbackTypeData.url).replyOnce(feedbackTypeData.responseCode, feedbackTypeData.data);
});

describe('Employee Feedback', () => {
    it('should render properly', () => {
        const { initialData, feedbackTypeData } = EmployeeFeedbackMockData.get;
        mock.onGet(initialData.url)
            .replyOnce(initialData.responseCode, initialData.data)
            .onGet(feedbackTypeData.url)
            .replyOnce(feedbackTypeData.responseCode, feedbackTypeData.data);
        const { container } = RTKRender(<EmployeeFeedback />);
        expect(container).toMatchSnapshot();
    });

    it('should test Search Employee', async () => {
        const { initialData, searchEmployeeFromData } = EmployeeFeedbackMockData.get;
        mock.onGet(initialData.url)
            .replyOnce(initialData.responseCode, initialData.data)
            .onGet(searchEmployeeFromData.url)
            .replyOnce(searchEmployeeFromData.responseCoe, searchEmployeeFromData.data);
        const { container } = RTKRender(<EmployeeFeedback />);
        const initialResult = await screen.findAllByText('Rushad Eliyas Shaikh (SR0051)');
        expect(initialResult.length).toEqual(2);
        const searchEmployee = screen.getByTestId('search-employee');
        const searchBtn = screen.getByTitle('search icon');
        fireEvent.change(searchEmployee, { target: { value: 'Moly Agarwal' } });
        fireEvent.click(searchBtn);
        const searchResult = await screen.findAllByText('Moly Agarwal (SR0050)');
        expect(searchResult.length).toEqual(1);
        await waitFor(() => expect(initialResult.length).toEqual(2), { timeout: 3000 });
        const searchClearIcon = container.querySelector('[title="close icon"]');
        searchClearIcon && fireEvent.click(searchClearIcon);
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.employeeFeedback}/1`), { timeout: 3000 });
    });

    it('should test sorting functionality', async () => {
        const { initialData } = EmployeeFeedbackMockData.get;
        mock.onGet(initialData.url)
            .replyOnce(initialData.responseCode, initialData.data)
            .onGet(initialData.sortUrl)
            .replyOnce(initialData.responseCode, initialData.data);

        RTKRender(<EmployeeFeedback />);

        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        const spanElement = screen.getByText('Date');
        fireEvent.click(spanElement);
        await waitFor(() => expect(screen.getAllByText('View')[0]).toBeInTheDocument(), { timeout: 3000 });
    });

    it('should test datepicker', async () => {
        const { dateBasedTestData } = EmployeeFeedbackMockData.get;
        mock.onGet(dateBasedTestData.url).replyOnce(dateBasedTestData.responseCode, dateBasedTestData.data);
        const { container } = RTKRender(<EmployeeFeedback />);
        const datepicker = screen.getByTitle('medly-date-range-picker-calendar-icon');
        fireEvent.click(datepicker);

        await waitFor(() => container.querySelector('#review-cycle-calendar-months-wrapper'));
        const searchEmployee = screen.getByTestId('search-employee');
        fireEvent.change(searchEmployee, { target: { value: 'Rushad' } });
        fireEvent.change(screen.getAllByPlaceholderText('DD - MM - YYYY')[0], { target: { value: '11 - 10 - 2023' } }); // From
        fireEvent.change(screen.getAllByPlaceholderText('DD - MM - YYYY')[1], { target: { value: '15 - 10 - 2023' } }); // To

        expect(await screen.findByText('11/10/2023')).toBeInTheDocument();
        expect(await screen.findByText('14/10/2023')).toBeInTheDocument();
        fireEvent.change(searchEmployee, { target: { value: '' } });
        fireEvent.change(screen.getAllByPlaceholderText('DD - MM - YYYY')[0], { target: { value: '15 - 10 - 2023' } }); // From
        fireEvent.change(screen.getAllByPlaceholderText('DD - MM - YYYY')[1], { target: { value: '11 - 10 - 2023' } }); // To

        const dateClearIcon = container.querySelector('[data-testid="date-picker"] + svg');
        dateClearIcon && fireEvent.click(dateClearIcon);
        await waitFor(() => expect(screen.queryByText('11/10/2023')).not.toBeInTheDocument(), { timeout: 3000 });
    });

    it('should test pagination', async () => {
        const { repeatedData, paginatedData } = EmployeeFeedbackMockData.get;
        mock.onGet(repeatedData.url)
            .replyOnce(repeatedData.responseCode, repeatedData.data)
            .onGet(paginatedData.url)
            .replyOnce(paginatedData.responseCode, paginatedData.data);
        RTKRender(<EmployeeFeedback />);

        const prevResult = await screen.findAllByText('Random Name (SR0051)');
        expect(prevResult.length).toEqual(11);
        const pagnBtn = await screen.findAllByText('2');
        fireEvent.click(pagnBtn[pagnBtn.length - 1]);
        await waitFor(() => screen.findByText('Random Name 2 (SR0052)'), { timeout: 3000 });
        const currentResult = screen.getAllByText('Random Name 2 (SR0052)');
        expect(currentResult.length).toEqual(1);
    });

    it('should test redirection when clicked on View', async () => {
        const { initialData, viewFeedbackState } = EmployeeFeedbackMockData.get;
        mock.onGet(initialData.url).replyOnce(initialData.responseCode, initialData.data);

        RTKRender(<EmployeeFeedback />);

        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('View')[0]);

        expect(mockNavigate).toHaveBeenCalledWith('/reports/feedback/undefined/view-feedback', {
            state: viewFeedbackState
        });
    });
});
