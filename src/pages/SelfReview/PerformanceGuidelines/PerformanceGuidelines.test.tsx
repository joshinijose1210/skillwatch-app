import { cleanup, RTKRender, waitFor, screen, fireEvent } from '@utils/test-utils';
import { routeConstants } from '@constants';
import { apiInstance } from '@utils';
import * as reactRouterDom from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { PerformanceGuidelines } from './PerformanceGuidelines';
import { performanceGuidelinesMockData } from '@mocks/performanceGuidelines';
import { myFeedbackFormMockData } from '@mocks/myFeedback';
import { designationMockData } from '@mocks';
import { orgAdminMockState } from '@mocks/userMockState';

const mock = new MockAdapter(apiInstance);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

beforeEach(() => {
    const { navigationStateData } = performanceGuidelinesMockData;
    useLocationMock.mockReturnValue({
        ...myFeedbackFormMockData.locationMockData,
        pathname: `${routeConstants.selfReviewPerformanceGuidelines}`,
        state: navigationStateData
    });
    mock.reset();
});

afterEach(() => {
    cleanup();
});

describe('Performance guidelines for Self Review', () => {
    it('should render properly', async () => {
        const { responseCode } = performanceGuidelinesMockData.get;
        const { url, allData } = performanceGuidelinesMockData.get.designations;
        const { navigationStateData } = performanceGuidelinesMockData;

        const { url: kraUrl, allData: kraData } = performanceGuidelinesMockData.get.kra;
        const { url: kpiUrl, allData: kpiData } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(url).replyOnce(responseCode, allData);
        mock.onGet(kraUrl).replyOnce(responseCode, kraData);
        mock.onGet(kpiUrl).replyOnce(responseCode, kpiData);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.selfReviewPerformanceGuidelines}`,
            state: {
                ...navigationStateData,
                firstName: 'Abhinayy',
                lastName: 'Katta',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'C0001',
                action: 'Edit'
            }
        });

        const { container } = RTKRender(<PerformanceGuidelines />);
        await waitFor(() => screen.findByText(/Performance Guidelines/i));
        expect(container).toMatchSnapshot();
    });

    it('should take current Date if no default start, end dates are passed', async () => {
        const { responseCode } = performanceGuidelinesMockData.get;
        const { url, allData } = performanceGuidelinesMockData.get.designations;
        const { navigationStateDataWithoutDates } = performanceGuidelinesMockData;

        const { url: kraUrl, allData: kraData } = performanceGuidelinesMockData.get.kra;
        const { url: kpiUrl, allData: kpiData } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(url).replyOnce(responseCode, allData);
        mock.onGet(kraUrl).replyOnce(responseCode, kraData);
        mock.onGet(kpiUrl).replyOnce(responseCode, kpiData);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.selfReviewPerformanceGuidelines}`,
            state: {
                ...navigationStateDataWithoutDates,
                firstName: 'Abhinayy',
                lastName: 'Katta',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'C0001',
                action: 'Edit'
            }
        });

        const { container } = RTKRender(<PerformanceGuidelines />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        await waitFor(() => screen.findByText(/Performance Guidelines/i));
        expect(container).toMatchSnapshot();
    });

    it('should test "Start Self Review" redirection flow', async () => {
        const { navigationStateData } = performanceGuidelinesMockData;
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.selfReviewPerformanceGuidelines}`,
            state: navigationStateData
        });
        const { url, data: timelineData } = performanceGuidelinesMockData.reviewTimeLine.get;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(url).replyOnce(200, timelineData).onGet(kpiUrl).replyOnce(200, kpis);

        RTKRender(<PerformanceGuidelines />);

        const startReviewBtn = await waitFor(() => screen.findByText('Start Self Review'), { timeout: 2000 });

        expect(startReviewBtn).toBeEnabled();
        fireEvent.click(startReviewBtn);

        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.selfReview}/12th Nov 2024 - 20th Nov 2024`, {
            state: {
                ...timelineData[0],
                action: 'Add'
            }
        });
    });

    it('should test "Continue Self Review" redirection flow', async () => {
        const { navigationStateData } = performanceGuidelinesMockData;
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.selfReviewPerformanceGuidelines}`,
            state: {
                ...navigationStateData,
                action: 'Edit'
            }
        });
        const { responseCode } = performanceGuidelinesMockData.get;
        const { url, allData } = performanceGuidelinesMockData.get.reviewTimeline;
        const { url: reviewTimeLineUrl, editSelfReviewData: timelineData } = performanceGuidelinesMockData.reviewTimeLine.get;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(reviewTimeLineUrl).replyOnce(200, timelineData).onGet(kpiUrl).replyOnce(200, kpis);
        mock.onGet(url).replyOnce(responseCode, allData);

        RTKRender(<PerformanceGuidelines />);
        const continueSelfReviewBtn = await waitFor(() => screen.findByText('Continue Self Review'), { timeout: 2000 });
        fireEvent.click(continueSelfReviewBtn);
        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.selfReview}/12th Nov 2024 - 20th Nov 2024`, {
            state: {
                ...timelineData[0],
                action: 'Edit'
            }
        });
    });

    it('should test "View Self Review" redirection flow', async () => {
        const { navigationStateData } = performanceGuidelinesMockData;
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.selfReviewPerformanceGuidelines}`,
            state: {
                ...navigationStateData,
                action: 'View'
            }
        });
        const { url, viewSelfReviewData: timelineData } = performanceGuidelinesMockData.reviewTimeLine.get;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;

        mock.onGet(url).replyOnce(200, timelineData).onGet(kpiUrl).replyOnce(200, kpis);

        RTKRender(<PerformanceGuidelines />);
        const startReviewBtn = await waitFor(() => screen.findByText('View Self Review'), { timeout: 2000 });
        expect(startReviewBtn).toBeEnabled();
        fireEvent.click(startReviewBtn);

        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.selfReview}/12th Nov 2024 - 20th Nov 2024`, {
            state: {
                ...timelineData[0],
                action: 'View'
            }
        });
    });
});

describe("Performance guidelines for Team's Review", () => {
    it('should render properly', async () => {
        const { navigationStateData } = performanceGuidelinesMockData;
        const { responseCode } = performanceGuidelinesMockData.get;
        const { url, allData } = performanceGuidelinesMockData.get.designations;
        const { url: employyeeUrl, allData: employeeData } = performanceGuidelinesMockData.get.employeeData;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        const { url: kraUrl, allData: kraData } = performanceGuidelinesMockData.get.kra;
        mock.onGet(employyeeUrl).replyOnce(responseCode, employeeData);
        mock.onGet(kpiUrl).replyOnce(responseCode, kpis);
        mock.onGet(url).replyOnce(responseCode, allData);
        mock.onGet(kraUrl).replyOnce(responseCode, kraData);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.managerReviewPerformanceGuidelines}`,
            state: {
                ...navigationStateData,
                firstName: 'Abhinayy',
                lastName: 'Katta',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'C0001',
                action: 'Edit'
            }
        });

        const { container } = RTKRender(<PerformanceGuidelines />);
        await waitFor(() => screen.findByText(/Performance Guidelines/i));
        expect(container).toMatchSnapshot();
    });

    it("should test Add Team's Review redirection flow", async () => {
        const { url, allData } = designationMockData.designations.get;
        const { url: reviewTimeLineUrl, data: reviewTimelineMockData } = performanceGuidelinesMockData.reviewTimeLine.get;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(kpiUrl).replyOnce(200, kpis);
        mock.onGet(url).replyOnce(200, allData).onGet(reviewTimeLineUrl).replyOnce(200, reviewTimelineMockData);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.managerReviewPerformanceGuidelines}`,
            state: {
                startDate: 1731715200000,
                endDate: 1732147200000,
                action: 'Add',
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });

        RTKRender(<PerformanceGuidelines />);
        const actionButton = await waitFor(() => screen.findByText("Start Team's Review"), { timeout: 2000 });
        expect(actionButton).toBeInTheDocument();
        fireEvent.click(actionButton);

        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.managerReview}/16th Nov 2024 - 21st Nov 2024`, {
            state: {
                ...reviewTimelineMockData[0],
                action: 'Add',
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewCycleId: 2,
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });
    });

    it("should test Edit Team's Review redirection flow", async () => {
        const { url, allData } = designationMockData.designations.get;
        const { url: reviewTimeLineUrl, data: reviewTimelineMockData } = performanceGuidelinesMockData.reviewTimeLine.get;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(url).replyOnce(200, allData).onGet(reviewTimeLineUrl).replyOnce(200, reviewTimelineMockData);
        mock.onGet(kpiUrl).replyOnce(200, kpis);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.managerReviewPerformanceGuidelines}`,
            state: {
                startDate: 1731715200000,
                endDate: 1732147200000,
                action: 'Edit',
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });

        RTKRender(<PerformanceGuidelines />);
        const actionButton = await waitFor(() => screen.findByText("Continue Team's Review"), { timeout: 2000 });
        expect(actionButton).toBeInTheDocument();
        fireEvent.click(actionButton);

        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.managerReview}/16th Nov 2024 - 21st Nov 2024`, {
            state: {
                ...reviewTimelineMockData[0],
                action: 'Edit',
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewCycleId: 2,
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });
    });

    it("should test View Team's Review redirection flow", async () => {
        const { url, allData } = designationMockData.designations.get;
        const { url: reviewTimeLineUrl, data: reviewTimelineMockData } = performanceGuidelinesMockData.reviewTimeLine.get;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(kpiUrl).replyOnce(200, kpis);
        mock.onGet(url).replyOnce(200, allData).onGet(reviewTimeLineUrl).replyOnce(200, reviewTimelineMockData);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.managerReviewPerformanceGuidelines}`,
            state: {
                startDate: 1731715200000,
                endDate: 1732147200000,
                action: 'View',
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });

        RTKRender(<PerformanceGuidelines />);
        const actionButton = await waitFor(() => screen.findByText("View Team's Review"), { timeout: 2000 });
        expect(actionButton).toBeInTheDocument();
        fireEvent.click(actionButton);

        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.managerReview}/16th Nov 2024 - 21st Nov 2024`, {
            state: {
                ...reviewTimelineMockData[0],
                action: 'View',
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewCycleId: 2,
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });
    });
});

describe("Performance guidelines for Team's Check-in", () => {
    it('should render properly', async () => {
        const { checkInStateData } = performanceGuidelinesMockData;
        const { responseCode } = performanceGuidelinesMockData.get;
        const { url, allData } = performanceGuidelinesMockData.get.designations;
        const { url: employyeeUrl, allData: employeeData } = performanceGuidelinesMockData.get.employeeData;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        const { url: kraUrl, allData: kraData } = performanceGuidelinesMockData.get.kra;
        mock.onGet(kpiUrl).replyOnce(responseCode, kpis);
        mock.onGet(url).replyOnce(responseCode, allData);
        mock.onGet(kraUrl).replyOnce(responseCode, kraData);
        mock.onGet(employyeeUrl).replyOnce(responseCode, employeeData);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.checkInWithTeamMemberPerformanceGuidelines}`,
            state: {
                ...checkInStateData,
                firstName: 'Abhinayy',
                lastName: 'Katta',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'C0001',
                action: 'Edit'
            }
        });

        const { container } = RTKRender(<PerformanceGuidelines />);
        expect(container).toMatchSnapshot();
        await waitFor(() => screen.findByText(/Performance Guidelines/i));
    });

    it("should test Add Team's Check-in redirection flow", async () => {
        const { url, allData } = designationMockData.designations.get;
        const { url: reviewTimeLineUrl, data: reviewTimelineMockData } = performanceGuidelinesMockData.reviewTimeLine.get;
        const { checkInStateData } = performanceGuidelinesMockData;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(kpiUrl).replyOnce(200, kpis);
        mock.onGet(url).replyOnce(200, allData).onGet(reviewTimeLineUrl).replyOnce(200, reviewTimelineMockData);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.checkInWithTeamMemberPerformanceGuidelines}`,
            state: {
                ...checkInStateData,
                startDate: 1731715200000,
                endDate: 1732147200000,
                action: 'Add',
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });

        RTKRender(<PerformanceGuidelines />);
        const actionButton = await waitFor(() => screen.findByText(/Start Team's Check-In/i), { timeout: 2000 });
        expect(actionButton).toBeInTheDocument();
        fireEvent.click(actionButton);

        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.checkInWithTeamMember}/1/16th Nov 2024 - 21st Nov 2024`, {
            state: {
                ...checkInStateData,
                action: 'Add',
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewCycleId: 2,
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });
    });

    it("should test Edit Team's Check-in redirection flow", async () => {
        const { url, allData } = designationMockData.designations.get;
        const { url: reviewTimeLineUrl, data: reviewTimelineMockData } = performanceGuidelinesMockData.reviewTimeLine.get;
        const { checkInStateData } = performanceGuidelinesMockData;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(kpiUrl).replyOnce(200, kpis);
        mock.onGet(url).replyOnce(200, allData).onGet(reviewTimeLineUrl).replyOnce(200, reviewTimelineMockData);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.checkInWithTeamMemberPerformanceGuidelines}`,
            state: {
                ...checkInStateData,
                startDate: 1731715200000,
                endDate: 1732147200000,
                action: 'Edit',
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });

        RTKRender(<PerformanceGuidelines />);
        const actionButton = await waitFor(() => screen.findByText(/Continue Team's Check-In/i), { timeout: 2000 });
        expect(actionButton).toBeInTheDocument();
        fireEvent.click(actionButton);

        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.checkInWithTeamMember}/1/16th Nov 2024 - 21st Nov 2024`, {
            state: {
                ...checkInStateData,
                action: 'Edit',
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewCycleId: 2,
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });
    });

    it("should test View Team's Check-in redirection flow", async () => {
        const { url, allData } = designationMockData.designations.get;
        const { url: reviewTimeLineUrl, data: reviewTimelineMockData } = performanceGuidelinesMockData.reviewTimeLine.get;
        const { checkInStateData } = performanceGuidelinesMockData;
        const { url: kpiUrl, allData: kpis } = performanceGuidelinesMockData.get.kpi;
        mock.onGet(kpiUrl).replyOnce(200, kpis);
        mock.onGet(url).replyOnce(200, allData).onGet(reviewTimeLineUrl).replyOnce(200, reviewTimelineMockData);
        useLocationMock.mockReturnValue({
            ...myFeedbackFormMockData.locationMockData,
            pathname: `${routeConstants.checkInWithTeamMemberPerformanceGuidelines}`,
            state: {
                ...checkInStateData,
                startDate: 1731715200000,
                endDate: 1732147200000,
                action: 'View',
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewCycleId: 2,
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });

        RTKRender(<PerformanceGuidelines />);
        const actionButton = await waitFor(() => screen.findByText(/View Team's Check-In/i), { timeout: 2000 });
        expect(actionButton).toBeInTheDocument();
        fireEvent.click(actionButton);

        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.checkInWithTeamMember}/1/16th Nov 2024 - 21st Nov 2024`, {
            state: {
                ...checkInStateData,
                action: 'View',
                reviewCycle: '16th Nov 2024 - 21st Nov 2024',
                reviewCycleId: 2,
                firstName: 'empFirstName',
                lastName: 'empLastName',
                reviewToEmployeeId: 'EMP_1',
                reviewToId: 4
            }
        });
    });
});
