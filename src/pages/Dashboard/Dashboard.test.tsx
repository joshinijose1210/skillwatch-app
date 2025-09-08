import { RTKRender, cleanup, screen, fireEvent } from '@utils/test-utils';
import { Dashboard } from './Dashboard';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { dashboardMockData } from '@mocks/dashboard';
import { orgAdminMockState } from '@mocks/userMockState';
import 'swiper/css';
import * as reactRouterDom from 'react-router-dom';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

jest.mock('swiper/react', () => ({
    Swiper: ({ children }: any) => children,
    SwiperSlide: ({ children }: any) => children
}));
jest.mock('swiper/modules', () => ({
    Navigation: (props: any) => null,
    Pagination: (props: any) => null,
    Scrollbar: (props: any) => null,
    A11y: (props: any) => null
}));

jest.mock('swiper/css', () => jest.fn());

beforeAll(() => {
    mock.onGet(dashboardMockData.reviewCycle.url).replyOnce(200, dashboardMockData.reviewCycle.data);
    mock.onGet(dashboardMockData.feedBackGraph.url).replyOnce(200, dashboardMockData.feedBackGraph.data);
    mock.onGet(dashboardMockData.feedBackOverview.url).replyOnce(200, dashboardMockData.feedBackOverview.data);
    mock.onGet(dashboardMockData.actionItem.url).replyOnce(200, dashboardMockData.actionItem.data);
    mock.onGet(dashboardMockData.employeeFeedback.url).replyOnce(200, dashboardMockData.employeeFeedback.data);
    mock.onGet(dashboardMockData.averageRating.url).replyOnce(200, dashboardMockData.averageRating.data);
});

beforeEach(() => {
    const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
    if (expect.getState().currentTestName?.includes('Dashboard should show error message')) {
        useLocationMock.mockReturnValue({
            ...dashboardMockData.LocationMockData,
            state: { error: true, header: 'Error', message: 'Something went wrong' }
        });
    } else {
        useLocationMock.mockReturnValue(dashboardMockData.LocationMockData);
    }
    mock.reset();
});

afterEach(cleanup);

describe('Dashboard', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<Dashboard />);
        expect(container).toMatchSnapshot();
    });

    it('should render properly', async () => {
        mock.onGet(dashboardMockData.feedBackOverview.url).replyOnce(200, dashboardMockData.feedBackOverview.data);
        mock.onGet(dashboardMockData.feedBackGraph.url).replyOnce(200, dashboardMockData.feedBackGraph.data);
        mock.onGet(dashboardMockData.averageRating.url).replyOnce(200, dashboardMockData.averageRating.data);

        RTKRender(<Dashboard />);
        await screen.findByText('Review Cycle');
    });

    it('should redirect when click on add feedback', async () => {
        mock.onGet(dashboardMockData.feedBackOverview.url).replyOnce(200, dashboardMockData.feedBackOverview.data);
        mock.onGet('https://dummy-api.example.com/api/dashboard/feedback-graph?organisationId=1&id=72&reviewCycleId=').replyOnce(400, {});
        RTKRender(<Dashboard />);
        await screen.findByText('Review Cycle');
        const addFeedbackBtn = screen.getByTestId('addFeedbackBtn');
        expect(addFeedbackBtn).toBeEnabled();
        fireEvent.click(addFeedbackBtn);
        expect(mockNavigate).toBeCalledWith('/dashboard/add-feedback', { state: { action: 'Add' } });
    });

    it('should redirect when click on self review', async () => {
        mock.onGet(dashboardMockData.feedBackOverview.url).replyOnce(200, dashboardMockData.feedBackOverview.selfReviewData);
        RTKRender(<Dashboard />);
        await screen.findByText('Review Cycle');
        const reviewBtn = screen.getByTestId('reviewBtn');
        expect(reviewBtn).toBeEnabled();
        fireEvent.click(reviewBtn);
        expect(mockNavigate).toBeCalledWith('/dashboard/self-reviews');
    });

    it('should show error message', async () => {
        RTKRender(<Dashboard />);
        await screen.findByText('Something went wrong');
    });
});
