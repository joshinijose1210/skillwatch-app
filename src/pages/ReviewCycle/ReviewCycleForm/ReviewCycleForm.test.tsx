import { reviewCycleMockData } from '@mocks/reviewCycle';
import { RTKRender, fireEvent, screen, waitFor } from '@utils/test-utils';
import routeConstants from '@constants/routeConstants';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as reactrouterdom from 'react-router-dom';
import { ReviewCycle } from '../ReviewCycle';
import { ReviewCycleForm } from './ReviewCycleForm';

const mock = new MockAdapter(axios);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeEach(() => {
    const useLocationMock = jest.spyOn(reactrouterdom, 'useLocation');
    const { LocationMockData, editLocationMockState } = reviewCycleMockData;
    if (expect.getState().currentTestName?.includes('Add Review Cycle')) {
        useLocationMock.mockReturnValue({
            ...LocationMockData,
            pathname: routeConstants.addReviewCycle,
            state: {
                action: 'Add'
            }
        });
    } else if (expect.getState().currentTestName?.includes('Update Review Cycle')) {
        useLocationMock.mockReturnValue({
            ...LocationMockData,
            pathname: routeConstants.editReviewCycle,
            state: editLocationMockState
        });
    } else {
        useLocationMock.mockReturnValue(LocationMockData);
    }
});

describe('Add Review Cycle', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<ReviewCycleForm />);
        expect(container).toMatchSnapshot();
    });

    it('should contain proper header', () => {
        RTKRender(<ReviewCycleForm />);
        expect(screen.getByText('Add Review Cycle')).toBeInTheDocument();
    });

    it('datepicker should render properly', () => {
        RTKRender(<ReviewCycle />);
        const { container } = RTKRender(<ReviewCycleForm />);
        fireEvent.click(screen.getByTestId('review-cycle-datepicker'));
        expect(screen.getByTestId('review-cycle-datepicker')).toBeVisible();
        expect(container).toMatchSnapshot();
    });

    it('review cycle should be added once values are selected', async () => {
        const { url, responseCode } = reviewCycleMockData.post;

        mock.onPost(url).replyOnce(responseCode, {});

        const { container } = RTKRender(<ReviewCycleForm />);

        const actionBtn = screen.getByTestId('actionbtn');
        expect(actionBtn).toBeDisabled();

        // Review Cycle Timeline
        const reviewCycleDp = screen.getByTitle('review-cycle-calendar-icon');
        fireEvent.click(reviewCycleDp);

        await waitFor(() => container.querySelector('#review-cycle-calendar-months-wrapper'));
        const reviewCycleDates = screen.getAllByText('15');
        fireEvent.click(reviewCycleDates[0]);
        fireEvent.click(reviewCycleDates[1]); // review cycle 15th - 15th

        fireEvent.click(screen.getByText('Review Cycle Timeline:')); // clicked outside to close the calendar

        // Self Review Timeline
        const selfReviewDp = screen.getByTitle('self-review-calendar-icon');
        fireEvent.click(selfReviewDp);

        await waitFor(() => container.querySelector('#self-review-calendar-months-wrapper'));
        const selfReviewStartDate = screen.getAllByText('15');
        fireEvent.click(selfReviewStartDate[0]);
        const selfReviewEndDate = screen.getAllByText('28');
        fireEvent.click(selfReviewEndDate[0]); // review cycle 15th - 30th

        fireEvent.click(screen.getByText('Self Review Dates:')); // clicked outside to close the calendar

        // Manager Review Timeline
        const managerReviewDp = screen.getByTitle('manager-review-calendar-icon');
        fireEvent.click(managerReviewDp);

        await waitFor(() => container.querySelector('#manager-review-calendar-months-wrapper'));
        const managerReviewStartDate = screen.getAllByText('1');
        fireEvent.click(managerReviewStartDate[1]);

        const managerReviewEndDate = screen.getAllByText('7');
        fireEvent.click(managerReviewEndDate[1]); // manager review 1st - 7th

        fireEvent.click(screen.getByText('Manager Review Dates:')); // clicked outside to close the calendar

        // Check-in with Manager Timeline
        const checkInWithManagerDp = screen.getByTitle('check-in-with-manager-calendar-icon');
        fireEvent.click(checkInWithManagerDp);

        await waitFor(() => container.querySelector('#check-in-with-manager-calendar-months-wrapper'));
        const checkInWithManagerStartDate = screen.getAllByText('8');
        fireEvent.click(checkInWithManagerStartDate[1]);

        const checkInWithManagerEndDate = screen.getAllByText('15');
        fireEvent.click(checkInWithManagerEndDate[1]); // check in with manager 08th - 15th

        const publishBtn = screen.getByTestId('publishbtn');
        fireEvent.click(publishBtn);

        expect(actionBtn).toBeEnabled();
        fireEvent.click(actionBtn);
    });

    it('clear buttons should work properly', async () => {
        const { container } = RTKRender(<ReviewCycleForm />);

        // Review Cycle Timeline
        const reviewCycleDp = screen.getByTitle('review-cycle-calendar-icon');
        fireEvent.click(reviewCycleDp);

        await waitFor(() => container.querySelector('#review-cycle-calendar-months-wrapper'));
        const reviewCycleDates = screen.getAllByText('15');
        fireEvent.click(reviewCycleDates[0]);
        fireEvent.click(reviewCycleDates[1]);

        fireEvent.click(screen.getByText('Review Cycle Timeline:'));

        // Self Review Timeline
        const selfReviewDp = screen.getByTitle('self-review-calendar-icon');
        fireEvent.click(selfReviewDp);

        await waitFor(() => container.querySelector('#self-review-calendar-months-wrapper'));
        const selfReviewStartDate = screen.getAllByText('15');
        fireEvent.click(selfReviewStartDate[0]);
        const selfReviewEndDate = screen.getAllByText('28');
        fireEvent.click(selfReviewEndDate[0]);

        fireEvent.click(screen.getByText('Self Review Dates:'));

        // Manager Review Timeline
        const managerReviewDp = screen.getByTitle('manager-review-calendar-icon');
        fireEvent.click(managerReviewDp);

        await waitFor(() => container.querySelector('#manager-review-calendar-months-wrapper'));
        const managerReviewStartDate = screen.getAllByText('1');
        fireEvent.click(managerReviewStartDate[1]);

        const managerReviewEndDate = screen.getAllByText('7');
        fireEvent.click(managerReviewEndDate[1]);

        fireEvent.click(screen.getByText('Manager Review Dates:'));

        // Check-in with Manager Timeline
        const checkInWithManagerDp = screen.getByTitle('check-in-with-manager-calendar-icon');
        fireEvent.click(checkInWithManagerDp);

        await waitFor(() => container.querySelector('#check-in-with-manager-calendar-months-wrapper'));
        const checkInWithManagerStartDate = screen.getAllByText('8');
        fireEvent.click(checkInWithManagerStartDate[1]);

        const checkInWithManagerEndDate = screen.getAllByText('15');
        fireEvent.click(checkInWithManagerEndDate[1]);

        // Clearing values of all the datepickers
        fireEvent.click(screen.getByTestId('check-in-with-manager-datepicker-cancel-icon'));
        expect(container.querySelector('#check-in-with-manager-startDate-input')).toHaveValue('');

        fireEvent.click(screen.getByTestId('manager-review-datepicker-cancel-icon'));
        expect(container.querySelector('#manager-review-startDate-input')).toHaveValue('');

        fireEvent.click(screen.getByTestId('self-review-datepicker-cancel-icon'));
        expect(container.querySelector('#self-review-startDate-input')).toHaveValue('');

        fireEvent.click(screen.getByTestId('review-cycle-datepicker-cancel-icon'));
        expect(container.querySelector('#review-cycle-startDate-input')).toHaveValue('');
    });

    it('should show proper error message', async () => {
        const { container } = RTKRender(<ReviewCycleForm />);

        const reviewCycleDp = screen.getByTitle('review-cycle-calendar-icon');
        fireEvent.click(reviewCycleDp);

        await waitFor(() => container.querySelector('#review-cycle-calendar-months-wrapper'));
        const reviewCycleDates = screen.getAllByText('15');
        fireEvent.click(reviewCycleDates[0]);

        fireEvent.click(screen.getByText('Review Cycle Timeline:')); // clicked outside to close the calendar

        const errorTxt = screen.getByText('Please select both values');
        expect(errorTxt).toBeInTheDocument();
    });

    it('should show error when something goes wrong while trying to add reviw cycle', async () => {
        const { url } = reviewCycleMockData.post;

        mock.onPost(url).replyOnce(404, {});

        const { container } = RTKRender(<ReviewCycleForm />);

        const actionBtn = screen.getByTestId('actionbtn');
        expect(actionBtn).toBeDisabled();

        // Review Cycle Timeline
        const reviewCycleDp = screen.getByTitle('review-cycle-calendar-icon');
        fireEvent.click(reviewCycleDp);

        await waitFor(() => container.querySelector('#review-cycle-calendar-months-wrapper'));
        const reviewCycleDates = screen.getAllByText('15');
        fireEvent.click(reviewCycleDates[0]);
        fireEvent.click(reviewCycleDates[1]); // review cycle 15th - 15th

        fireEvent.click(screen.getByText('Review Cycle Timeline:')); // clicked outside to close the calendar

        // Self Review Timeline
        const selfReviewDp = screen.getByTitle('self-review-calendar-icon');
        fireEvent.click(selfReviewDp);

        await waitFor(() => container.querySelector('#self-review-calendar-months-wrapper'));
        const selfReviewStartDate = screen.getAllByText('15');
        fireEvent.click(selfReviewStartDate[0]);
        const selfReviewEndDate = screen.getAllByText('28');
        fireEvent.click(selfReviewEndDate[0]); // review cycle 15th - 30th

        fireEvent.click(screen.getByText('Self Review Dates:')); // clicked outside to close the calendar

        // Manager Review Timeline
        const managerReviewDp = screen.getByTitle('manager-review-calendar-icon');
        fireEvent.click(managerReviewDp);

        await waitFor(() => container.querySelector('#manager-review-calendar-months-wrapper'));
        const managerReviewStartDate = screen.getAllByText('1');
        fireEvent.click(managerReviewStartDate[1]);

        const managerReviewEndDate = screen.getAllByText('7');
        fireEvent.click(managerReviewEndDate[1]); // manager review 1st - 7th

        fireEvent.click(screen.getByText('Manager Review Dates:')); // clicked outside to close the calendar

        // Check-in with Manager Timeline
        const checkInWithManagerDp = screen.getByTitle('check-in-with-manager-calendar-icon');
        fireEvent.click(checkInWithManagerDp);

        await waitFor(() => container.querySelector('#check-in-with-manager-calendar-months-wrapper'));
        const checkInWithManagerStartDate = screen.getAllByText('8');
        fireEvent.click(checkInWithManagerStartDate[1]);

        const checkInWithManagerEndDate = screen.getAllByText('15');
        fireEvent.click(checkInWithManagerEndDate[1]); // check in with manager 08th - 15th

        const publishBtn = screen.getByTestId('publishbtn');
        fireEvent.click(publishBtn);

        expect(actionBtn).toBeEnabled();
        fireEvent.click(actionBtn);
        expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    });
});

describe('Update Review Cycle', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<ReviewCycleForm />);
        expect(container).toMatchSnapshot();
    });

    it('actions button should work properly', async () => {
        const { url, responseCode } = reviewCycleMockData.put;
        mock.onPut(url).replyOnce(responseCode, {});

        RTKRender(<ReviewCycleForm />);

        const notifyBtn = screen.getByTestId('notifybtn');
        const actionBtn = screen.getByTestId('actionbtn');

        fireEvent.click(notifyBtn);
        fireEvent.click(actionBtn);

        expect(notifyBtn).not.toBeChecked();
    });
});
