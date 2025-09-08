import { RTKRender, fireEvent, screen } from '@utils/test-utils';
import { ReviewCycleActionItems } from './ReviewCycleActionItems';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { actionItemsMockData } from '@mocks/actionItems';
import { routeConstants } from '@constants';
import * as reactRouterDom from 'react-router-dom';
import format from 'date-fns/format';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

const CURRENT_DAY = new Date().setHours(0, 0, 0);
const ONE_DAY = 86400000;
const NEXT_DAY = format(new Date(CURRENT_DAY + ONE_DAY), 'dd-MM-yyyy');
const RECIEVED_DAY = NEXT_DAY.split('-').join(' - ');

beforeAll(() => {
    const { employeeDetails, averageRating, LocationMockData, mockState } = actionItemsMockData;
    mock.onGet(employeeDetails.url).replyOnce(200, employeeDetails.data);
    mock.onGet(averageRating.url).replyOnce(200, averageRating.data);
    const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
    useLocationMock.mockReturnValue({ ...LocationMockData, state: mockState });
});

describe('ReviewCycleActionItems component', () => {
    it('should take snapshot and render properly', async () => {
        const { employeeDetails, checkInData } = actionItemsMockData;
        mock.onGet(employeeDetails.url).replyOnce(200, employeeDetails.data);
        mock.onGet(checkInData.url).replyOnce(200, checkInData.dataWithAction);
        const { container } = RTKRender(<ReviewCycleActionItems />);
        expect(container).toMatchSnapshot();
        await screen.findByText('Review Summary');
        expect(screen.getByText('A I (SR021)')).toBeInTheDocument();
        expect(screen.getByText('M P (SR0033)')).toBeInTheDocument();
        expect(screen.getByText('Goals')).toBeInTheDocument();
        expect(screen.getByText('Ratings')).toBeInTheDocument();
    });

    it('should navigate to previous page when back button is clicked after confirmation', async () => {
        const { employeeDetails } = actionItemsMockData;
        mock.onGet(employeeDetails.url).replyOnce(200, employeeDetails.data);
        RTKRender(<ReviewCycleActionItems />);
        await screen.findByText('Goals');
        const actionInput = await screen.findByTestId('action-input-0');
        fireEvent.change(actionInput, { target: { value: 'test action item added' } });
        fireEvent.click(screen.getByTestId('back-btn'));
        await screen.findByText('Are you sure you wish to go back? Any unsaved changes will be lost.');
        fireEvent.click(screen.getByTestId('modal-no'));
        fireEvent.click(screen.getByTestId('back-btn'));
        await screen.findByText('Are you sure you wish to go back? Any unsaved changes will be lost.');
        fireEvent.click(screen.getByTestId('modal-yes'));
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it('should add more action and remove action item work properly', async () => {
        RTKRender(<ReviewCycleActionItems />);
        await screen.findByText('Goals');
        fireEvent.click(await screen.findByTestId('add-btn'));
        expect(screen.getByTestId('action-input-1')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('clear-btn-1'));
        expect(screen.queryByTestId('action-input-1')).not.toBeInTheDocument();
    });

    it('should show error when action item length is not proper', async () => {
        RTKRender(<ReviewCycleActionItems />);
        await screen.findByText('Goals');
        fireEvent.change(await screen.findByTestId('action-input-0'), { target: { value: 'test' } });
        expect(screen.getByText('Please write more than 10 letters.')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('action-input-0'), {
            target: {
                value: 'Provide constructive feedback and guidance to the junior team member to help them improve their task execution and overall performance. Schedule a follow-up meeting to track progress and provide ongoing support and feedback as needed.'
            }
        });
        expect(screen.getByText('Please write less than 150 letters.')).toBeInTheDocument();
    });

    it('should save as draft work properly', async () => {
        const { checkInData } = actionItemsMockData;
        mock.onPut(checkInData.postUrl).replyOnce(201, {});
        mock.onGet(checkInData.url).replyOnce(200, checkInData.data);
        RTKRender(<ReviewCycleActionItems />);
        await screen.findByText('Goals');
        fireEvent.change(await screen.findByTestId('action-input-0'), { target: { value: 'test action item added' } });
        const DatePicker = screen.getByTestId('date-btn-0');
        fireEvent.change(DatePicker, { target: { value: NEXT_DAY } });
        expect(DatePicker).toHaveValue(RECIEVED_DAY);
        fireEvent.click(screen.getByTestId('draft-btn'));

        await screen.findByText('Check-in with manager saved successfully!');
    });

    it('should submit data work properly', async () => {
        const { checkInData } = actionItemsMockData;
        mock.onPut(checkInData.postUrl).replyOnce(201, {});
        mock.onGet(checkInData.url).replyOnce(200, checkInData.data);
        RTKRender(<ReviewCycleActionItems />);
        await screen.findByText('Goals');
        fireEvent.change(await screen.findByTestId('action-input-0'), { target: { value: 'test action item added' } });
        const DatePicker = screen.getByTestId('date-btn-0');
        fireEvent.change(DatePicker, { target: { value: NEXT_DAY } });
        expect(DatePicker).toHaveValue(RECIEVED_DAY);
        fireEvent.click(screen.getByTestId('save-btn'));
        await screen.findByText('Are you sure you wish to submit? Once submitted, the review can not be edited.');
        fireEvent.click(screen.getByTestId('modal-yes'));
        await screen.findByText('Check-in with manager completed successfully!');
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.reviewTimeline);
    });
});
