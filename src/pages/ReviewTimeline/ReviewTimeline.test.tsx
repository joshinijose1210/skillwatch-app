import { routeConstants } from '@constants';
import { empUserState } from '@mocks/userMockState';
import { RTKRender, fireEvent, screen, waitFor } from '@utils/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { reviewTimelineMockData } from '@mocks/reviewTimeline';
import { ReviewTimeline } from './ReviewTimeline';
import { apiInstance } from '@utils';

const mock = new MockAdapter(apiInstance);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate
}));

jest.useFakeTimers().setSystemTime(new Date('2023-08-25'));

beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: jest.fn().mockReturnValue(null),
        unobserve: jest.fn().mockReturnValue(null),
        disconnect: jest.fn().mockReturnValue(null)
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

describe('Review timeline', () => {
    it('should render properly', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.defaultGet;
        mock.onGet(url).replyOnce(responseCode, data);
        const { container } = RTKRender(<ReviewTimeline />);
        expect(container).toMatchSnapshot();
    });

    it('should show Start Review Cycle for user with permission when no review cycle is active', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.inactiveReviewCycleGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(await screen.findByText('Start Review Cycle')).toBeInTheDocument();
    });

    it('should show Error message for user without permission when no review cycle is active', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.inactiveReviewCycleGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />, { initialState: empUserState });
        expect(await screen.findByText('No Review Cycle active at the moment.')).toBeInTheDocument();
        expect(screen.queryByText('Start Review Cycle')).not.toBeInTheDocument();
    });

    it('should redirect user with permission to add review cycle page when clicked on Start Review Cycle', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.inactiveReviewCycleGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        fireEvent.click(screen.getByText('Start Review Cycle'));
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.addReviewCycle, { state: { action: 'Add' } });
    });

    it('should show review cycle as scheduled when the review cycle is created but not started', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.scheduledReviewCycleGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Review Cycle scheduled')).toBeInTheDocument();
    });

    it('should show review cycle as started when the active review cycle has started', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.startedReviewCycleGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Review Cycle started')).toBeInTheDocument();
    });

    it('should show Start Self Review when active review cycle reaches self review timeline', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.selfReviewStartedGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Start Self Review')).toBeInTheDocument();
    });

    it('should redirect user to self review form when clicked on Start Self Review', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.selfReviewStartedGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        fireEvent.click(screen.getByText('Start Self Review'));
        expect(mockNavigate).toHaveBeenCalledWith('/performance-review/self-review/performance-guidelines', expect.any(Object));
    });

    it('should show Self Review date passed if self review timeline is over and user has not submitted the self review', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.selfReviewPassedGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Self Review date passed')).toBeInTheDocument();
    });

    it('should show Self Review submitted if self review is submitted', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.selfReviewCompletedGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Self Review submitted')).toBeInTheDocument();
    });

    it('should redirect user to self review form(view) self review is complete', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.selfReviewCompletedGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        fireEvent.click(screen.getByText('Self Review submitted'));
        expect(mockNavigate).toHaveBeenCalledWith(
            '/performance-review/self-review/20th Aug 2023 - 6th Nov 2023/review-summary',
            expect.any(Object)
        );
    });

    it('should show Manager review pending if user is employee, manager review window has started but not given', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.managerReviewPendingGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />, { initialState: empUserState });
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Manager review pending')).toBeInTheDocument();
    });

    it('should show Manager review in progress if user is employee, manager review window has started and in draft', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.managerReviewProgressGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />, { initialState: empUserState });
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Manager review in progress')).toBeInTheDocument();
    });

    it('should show Manager review completed if user is employee, manager review window has started and is submitted by at least first manager', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.managerReviewCompletedGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />, { initialState: empUserState });
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Manager Review completed')).toBeInTheDocument();
    });

    it('should show Start Manager Review if user is manager, and manager review window has started', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.startManagerReviewGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Start Manager Review')).toBeInTheDocument();
    });

    it('should show Manager Review date passed if user is manager, manager review window has started', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.managerReviewPassedGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Manager Review date passed')).toBeInTheDocument();
    });

    it('should redirect user to review form(edit) if user is manager, and the review is in draft', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.finishManagerReviewGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        fireEvent.click(screen.getByText('Stephen Thomas (SR00224) - In Draft'));
        expect(mockNavigate).toHaveBeenCalledWith("/performance-review/team's-review/performance-guidelines", expect.any(Object));
    });

    it('should show Optional against a team member if user is second manager of that member', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.finishManagerReviewGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Yo Yo (9987) - Pending (Optional)')).toBeInTheDocument();
    });

    it('should redirect user to manager review form when click on any employee link', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.finishManagerReviewGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        fireEvent.click(screen.getByText('Yo Yo (9987) - Pending (Optional)'));
        expect(mockNavigate).toHaveBeenCalledWith("/performance-review/team's-review/performance-guidelines", expect.any(Object));
    });

    it('should show Manager Review completed if user has submitted all reviews and his manager review is complete', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.managerReviewCompletedManagerGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Manager Review completed')).toBeInTheDocument();
    });

    it('should show Check in with Manager pending when user is employee, and his check in is pending', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.checkInPendingGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />, { initialState: empUserState });
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Check-in with Manager pending')).toBeInTheDocument();
    });

    it('should show Check in with Manager in progress when user is employee, and his check-in is in progress', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.checkInProgressGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />, { initialState: empUserState });
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Check-in with Manager in progress')).toBeInTheDocument();
    });

    it('should show Check in with Manager completed when user is employee, and his check-in is in progress', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.checkInCompletedGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />, { initialState: empUserState });
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Check-in with Manager completed')).toBeInTheDocument();
    });

    it('should show Start Check in with Manager, when user is manager, and check-in timeline is started', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.checkInStartGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Start Check-in with Manager')).toBeInTheDocument();
    });

    it('should show Check in passed, when user is manager, check-in timeline is passed but no review is submitted', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.checkInPassedGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Check-in with Manager date passed')).toBeInTheDocument();
    });

    it('should redirect user to check in form when clicked on emp link', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.checkInStartGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        fireEvent.click(screen.getByText('Yo Yo (9987) - Pending'));
        expect(mockNavigate).toHaveBeenCalledWith("/performance-review/team's-check-in/performance-guidelines", expect.any(Object));
    });

    it('should redirect user to check in form(edit), when user is manager, and review is in draft', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.finishCheckInGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        fireEvent.click(screen.getByText('Stephen Thomas (SR00224) - In Draft'));
        expect(mockNavigate).toHaveBeenCalledWith("/performance-review/team's-check-in/performance-guidelines", expect.any(Object));
    });

    it('should show Check-in with Manager completed, when user is manager, and all reviews are complete', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.checkInDoneGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Check-in with Manager completed')).toBeInTheDocument();
    });

    it('should redirect user to check in form of team member when clicked on emp link', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.checkInDoneGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        fireEvent.click(screen.getByText('Yo Yo (9987) - Completed'));
        expect(mockNavigate).toHaveBeenCalledWith(
            "/performance-review/team's-check-in/20th Aug 2023 - 6th Nov 2023/review-summary",
            expect.any(Object)
        );
    });

    it('should show Review Cycle will end on ... if review cycle is in progress', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.checkInDoneGet;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Review Cycle will end on 6th Nov 2023')).toBeInTheDocument();
    });

    it('should show Review Cycle completed if the review cycle timeline has completed', async () => {
        const { url, data, responseCode } = reviewTimelineMockData.reviewTimeline.reviewCycleComplete;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReviewTimeline />);
        await waitFor(() => screen.findByText('Review Timeline'));
        expect(screen.getByText('Review Cycle completed')).toBeInTheDocument();
    });
});
