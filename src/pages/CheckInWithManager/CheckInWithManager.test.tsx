import { cleanup, RTKRender, fireEvent, waitFor, screen } from '@utils/test-utils';
import { CheckInWithManager } from './CheckInWithManager';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { CheckInWithManagerMockData } from '@mocks/checkinwithmanager';
import { PerformanceReviewMockData } from '@mocks/performancereview';
import { userMockState } from '@mocks/userMockState';
import { routeConstants } from '@constants';
import * as reactrouterdom from 'react-router-dom';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

const useLocationMock = jest.spyOn(reactrouterdom, 'useLocation');

beforeEach(() => {
    mock.reset();
});

afterEach(() => {
    cleanup();
});

describe('My Check-in with Managers', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({ ...CheckInWithManagerMockData.LocationMockData, pathname: routeConstants.myCheckInWithManager });
    });

    it('should render properly', async () => {
        const { url, responseCode, allData } = CheckInWithManagerMockData.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        const { container } = RTKRender(<CheckInWithManager />);
        expect(container).toMatchSnapshot();
    });

    it('should show Action as N/A when the Overall Status is Check-in with manager pending', async () => {
        const { url, responseCode, someData } = CheckInWithManagerMockData.get;
        mock.onGet(url).reply(responseCode, someData.checkInWithMangerPending);
        RTKRender(<CheckInWithManager />);
        expect((await screen.findAllByText('Check-in with Manager pending')).length).toEqual(2); // one is from moduleTitle another is the test data
        const na = await waitFor(() => screen.findAllByText('N/A'), { timeout: 3000 });
        expect(na.length).toEqual(3); // 1 is for Manager Two, another is average rating, last one is action i.e. the test assertion
    });

    it('should have Action: View for Overall Status: Check-in with manager completed', async () => {
        const { url, responseCode, someData } = CheckInWithManagerMockData.get;
        mock.onGet(url).replyOnce(responseCode, someData.checkInWithManagerCompeleted);
        RTKRender(<CheckInWithManager />);
        await waitFor(() => screen.findByText('View'), { timeout: 3000 });
        expect(screen.getByText('View')).toBeInTheDocument();
    });

    it('should redirect to `View My Check-in with Manager` when clicked on View button', async () => {
        const { url, responseCode, someData } = CheckInWithManagerMockData.get;
        mock.onGet(url).replyOnce(responseCode, someData.checkInWithManagerCompeleted);
        RTKRender(<CheckInWithManager />);
        await waitFor(() => screen.findByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getByText('View'));

        expect(mockNavigate).toHaveBeenCalledWith(
            '/performance-review/manager-check-in/undefined/30th Aug 2023 - 2nd Sep 2023/review-summary',
            {
                state: CheckInWithManagerMockData.mockState
            }
        );
    });

    it('should test if manager data is visible properly', async () => {
        useLocationMock.mockReturnValue({ ...CheckInWithManagerMockData.LocationMockData, pathname: routeConstants.checkInWithTeamMember });
        const { managerUrl, responseCode, someData } = CheckInWithManagerMockData.get;
        mock.onGet(managerUrl).replyOnce(responseCode, someData.checkInWithMangerPending);
        RTKRender(<CheckInWithManager />);
        const na = await waitFor(() => screen.findAllByText('N/A'), { timeout: 3000 });
        expect(na.length).toEqual(2);
    });

    it('should test pagination', async () => {
        const { url, paginationUrl, responseCode, repeatedData, paginationData } = CheckInWithManagerMockData.get;
        mock.onGet(url).replyOnce(responseCode, repeatedData).onGet(paginationUrl).replyOnce(responseCode, paginationData);
        RTKRender(<CheckInWithManager />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 4000 });
        const pagnBtn = screen.getAllByText(2);
        fireEvent.click(pagnBtn[pagnBtn.length - 1]);
        await waitFor(() => screen.findAllByText('View'), { timeout: 4000 });
        expect(screen.queryByText('30th Aug 2023 - 2nd Sep 2023')).not.toBeInTheDocument();
    });
});

describe('Performance Review', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({ ...CheckInWithManagerMockData.LocationMockData, pathname: routeConstants.performanceReview });
    });

    it('should render properly', () => {
        const { url, responseCode, allData } = PerformanceReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        const { container } = RTKRender(<CheckInWithManager />);
        expect(container).toMatchSnapshot();
    });

    it('should show Action as N/A when the Overall Status is Self Review pending', async () => {
        const { url, responseCode, someData } = PerformanceReviewMockData.get;
        const { reporteesUrl, reporteeData } = CheckInWithManagerMockData.get;
        mock.onGet(url).replyOnce(responseCode, someData.selfReviewPending);
        mock.onGet(reporteesUrl).replyOnce(responseCode, reporteeData);
        RTKRender(<CheckInWithManager />);
        const na = await waitFor(() => screen.findAllByText('N/A'), { timeout: 4000 });
        expect((await screen.findAllByText('Self Review pending')).length).toEqual(2); // one is from moduleTitle another is from the test data
        expect(na.length).toEqual(3); // 1 is for Manager Two, another is average rating, last one is action i.e. the actual test assertion
    });

    it('should have Action: Add when Overall Status is Check-in with manager pending', async () => {
        const { url, responseCode, someData } = PerformanceReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, someData.checkInWithMangerPending);
        RTKRender(<CheckInWithManager />);
        const addBtn = await waitFor(() => screen.findByText('Add'), { timeout: 4000 });
        expect(addBtn).toBeInTheDocument();
    });

    it('should sort data based on check-in rating value in ascending order', async () => {
        const { url, responseCode, allData } = PerformanceReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        RTKRender(<CheckInWithManager />);
        const checkInRatingBtn = await waitFor(() => screen.findByText('Check-In Rating'), { timeout: 4000 });
        expect(checkInRatingBtn).toBeInTheDocument();
        fireEvent.click(checkInRatingBtn);
    });

    it('should test Employee filter', async () => {
        const { employeeDataUrl, url, searchUrl, employeeData, allData, searchData, responseCode } = PerformanceReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, allData).onGet(employeeDataUrl).replyOnce(responseCode, employeeData);
        mock.onGet(searchUrl).replyOnce(responseCode, searchData);

        RTKRender(<CheckInWithManager />);

        await waitFor(() => screen.findAllByText('Aamir Islam (SR021)'), { timeout: 4000 });
        fireEvent.click(screen.getByTestId('employeefilter'));

        await waitFor(() => screen.findByText('Moly Agarwal (A00100)'), { timeout: 4000 });
        fireEvent.click(screen.getByText('Moly Agarwal (A00100)'));
        expect(screen.queryByText('Aamir Islam (SR021)')).not.toBeInTheDocument();
    });

    it('should test Check-in Rating filter', async () => {
        const { url, filterRatingUrl, responseCode, allData, filterRatingIdData } = PerformanceReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        mock.onGet(filterRatingUrl)
            .replyOnce(responseCode, filterRatingIdData)
            .onOptions(filterRatingUrl)
            .replyOnce(responseCode, filterRatingIdData);
        RTKRender(<CheckInWithManager />);
        fireEvent.click(screen.getByTestId('checkinratingfilter'));
        expect(await screen.findAllByText('Aamir Islam (SR021)')).toHaveLength(10);
        fireEvent.click(screen.getByText('5 - Outstanding'));
        expect(await screen.findByText('Aamir Islam2 (SR021)')).toBeInTheDocument();
        expect(screen.queryByText('Aamir Islam (SR021)')).not.toBeInTheDocument();
    });

    it('should test Overall Status filter', async () => {
        const { url, filterOverallStatusUrl, filterOverallStatusData, responseCode, allData } = PerformanceReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        mock.onGet(filterOverallStatusUrl).replyOnce(responseCode, filterOverallStatusData);

        RTKRender(<CheckInWithManager />);

        await waitFor(() => screen.findAllByText('Aamir Islam (SR021)'), { timeout: 4000 });
        fireEvent.click(screen.getByTestId('overallstatusfilter'));
        fireEvent.click(screen.getByText('Check-in with Manager in progress'));
        await waitFor(() => expect(screen.queryByText('Aamir Islam (SR021)')).not.toBeInTheDocument());
        expect(await screen.findByText('Aamir Islam2 (SR021)')).toBeInTheDocument();
    });

    it('should check if published self review API data visible properly', async () => {
        const { responseCode, someData } = PerformanceReviewMockData.get;
        const { selfReviewStatusUrl } = CheckInWithManagerMockData.get;

        const customData = {
            totalCheckInWithManager: 1,
            checkInWithManagers: [
                {
                    ...someData.selfReviewPending.checkInWithManagers[0],
                    selfReviewPublish: true,
                    firstManagerReviewPublish: true,
                    checkInDraft: true
                }
            ]
        };

        const localMockState = {
            ...userMockState,
            checkInWithManagerReduxState: { employees: [], filterRatingId: 2, reviewStatus: 3 }
        };

        mock.onGet(selfReviewStatusUrl).replyOnce(responseCode, customData);

        RTKRender(<CheckInWithManager />, { initialState: localMockState });
        expect(await screen.findByText('Ronak Singh (SR022)')).toBeInTheDocument();
    });

    it('should check if published firstManagerReview API data visible properly', async () => {
        const { responseCode, someData } = PerformanceReviewMockData.get;
        const { firstManagerReviewPublishedUrl } = CheckInWithManagerMockData.get;

        const customData = {
            totalCheckInWithManager: 1,
            checkInWithManagers: [
                {
                    ...someData.selfReviewPending.checkInWithManagers[0],
                    selfReviewPublish: true,
                    firstManagerReviewPublish: true,
                    checkInDraft: true
                }
            ]
        };

        const localMockState = {
            ...userMockState,
            checkInWithManagerReduxState: { employees: [], filterRatingId: 2, reviewStatus: 4 }
        };

        mock.onGet(firstManagerReviewPublishedUrl).replyOnce(responseCode, customData);

        RTKRender(<CheckInWithManager />, { initialState: localMockState });
        expect(await screen.findByText('Ronak Singh (SR022)')).toBeInTheDocument();
    });

    it('should check if first manager review draft and self review published condition work properly', async () => {
        const { responseCode, someData } = PerformanceReviewMockData.get;
        const { firstManagerReviewPublishedUrl } = CheckInWithManagerMockData.get;

        const customData = {
            totalCheckInWithManager: 1,
            checkInWithManagers: [
                {
                    ...someData.selfReviewPending.checkInWithManagers[0],
                    firstManagerReviewDraft: true,
                    selfReviewPublish: true
                }
            ]
        };

        const localMockState = {
            ...userMockState,
            checkInWithManagerReduxState: { employees: [], filterRatingId: 2, reviewStatus: 4 }
        };

        mock.onGet(firstManagerReviewPublishedUrl).replyOnce(responseCode, customData);

        RTKRender(<CheckInWithManager />, { initialState: localMockState });
        expect(await screen.findByText('Ronak Singh (SR022)')).toBeInTheDocument();
    });

    it('should check if review cycle not started condition work properly', async () => {
        const { responseCode, someData } = PerformanceReviewMockData.get;
        const { firstManagerReviewPublishedUrl } = CheckInWithManagerMockData.get;

        const customData = {
            totalCheckInWithManager: 1,
            checkInWithManagers: [
                {
                    ...someData.selfReviewPending.checkInWithManagers[0],
                    startDate: '2024-06-07T08:00:59.465Z',
                    firstManagerReviewDraft: true,
                    selfReviewPublish: true
                }
            ]
        };

        const localMockState = {
            ...userMockState,
            checkInWithManagerReduxState: { employees: [], filterRatingId: 2, reviewStatus: 4 }
        };

        mock.onGet(firstManagerReviewPublishedUrl).replyOnce(responseCode, customData);

        RTKRender(<CheckInWithManager />, { initialState: localMockState });
        expect(await screen.findByText('Ronak Singh (SR022)')).toBeInTheDocument();
    });

    it('should check if second manager review draft and self review published condition work properly', async () => {
        const { responseCode, someData } = PerformanceReviewMockData.get;
        const { firstManagerReviewPublishedUrl } = CheckInWithManagerMockData.get;

        const customData = {
            totalCheckInWithManager: 1,
            checkInWithManagers: [
                {
                    ...someData.selfReviewPending.checkInWithManagers[0],
                    checkInStartDate: '2024-06-07T08:00:59.465Z',
                    secondManagerReviewDraft: true,
                    selfReviewPublish: true,
                    secondManagerReviewPublish: true
                }
            ]
        };

        const localMockState = {
            ...userMockState,
            checkInWithManagerReduxState: { employees: [], filterRatingId: 2, reviewStatus: 4 }
        };

        mock.onGet(firstManagerReviewPublishedUrl).replyOnce(responseCode, customData);

        RTKRender(<CheckInWithManager />, { initialState: localMockState });
        expect(await screen.findByText('Ronak Singh (SR022)')).toBeInTheDocument();
    });

    it('should check if second manager review completed condition work properly', async () => {
        const { responseCode, someData } = PerformanceReviewMockData.get;
        const { firstManagerReviewPublishedUrl } = CheckInWithManagerMockData.get;

        const customData = {
            totalCheckInWithManager: 1,
            checkInWithManagers: [
                {
                    ...someData.selfReviewPending.checkInWithManagers[0],
                    checkInStartDate: '2024-06-07T08:00:59.465Z',
                    secondManagerReviewPublish: true,
                    selfReviewPublish: true
                }
            ]
        };

        const localMockState = {
            ...userMockState,
            checkInWithManagerReduxState: { employees: [], filterRatingId: 2, reviewStatus: 4 }
        };

        mock.onGet(firstManagerReviewPublishedUrl).replyOnce(responseCode, customData);

        RTKRender(<CheckInWithManager />, { initialState: localMockState });
        expect(await screen.findByText('Ronak Singh (SR022)')).toBeInTheDocument();
    });

    it('should check if check in with manager in progress condition work properly', async () => {
        const { responseCode, someData } = PerformanceReviewMockData.get;
        const { firstManagerReviewPublishedUrl } = CheckInWithManagerMockData.get;

        const customData = {
            totalCheckInWithManager: 1,
            checkInWithManagers: [
                {
                    ...someData.selfReviewPending.checkInWithManagers[0],
                    checkInStartDate: '2024-06-01T08:00:59.465Z',
                    checkInDraft: true,
                    firstManagerReviewPublish: true,
                    selfReviewPublish: true
                }
            ]
        };

        const localMockState = {
            ...userMockState,
            checkInWithManagerReduxState: { employees: [], filterRatingId: 2, reviewStatus: 4 }
        };

        mock.onGet(firstManagerReviewPublishedUrl).replyOnce(responseCode, customData);

        RTKRender(<CheckInWithManager />, { initialState: localMockState });
        expect(await screen.findByText('Ronak Singh (SR022)')).toBeInTheDocument();
    });
});
