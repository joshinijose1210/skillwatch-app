import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { ManagerReview } from './ManagerReview';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { ManagerReviewMockData } from '@mocks/managerReview';
import { routeConstants } from '@constants';
import * as reactRouterDom from 'react-router-dom';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeAll(() => {
    mock.onGet(ManagerReviewMockData.globalReviewCycle.get.url).reply(
        ManagerReviewMockData.globalReviewCycle.get.responseCode,
        ManagerReviewMockData.globalReviewCycle.get.data
    );
    const { someData, responseCode, url } = ManagerReviewMockData.managers.get;
    mock.onGet(url).replyOnce(responseCode, someData);
});

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

afterEach(() => {
    cleanup();
});

describe('My manager review component', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue(ManagerReviewMockData.LocationMockData);
        mock.reset();
    });

    it('should take snapshot', () => {
        const { someData, responseCode, url } = ManagerReviewMockData.myMangaerReviewCycles.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        const { container } = RTKRender(<ManagerReview />);
        expect(container).toMatchSnapshot();
        expect(screen.getByText('Manager Review')).toBeInTheDocument();
    });

    it('view should redirect to new page', async () => {
        const { someData, responseCode, url } = ManagerReviewMockData.myMangaerReviewCycles.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        RTKRender(<ManagerReview />);

        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('View')[0]);
        expect(mockNavigate).toHaveBeenCalledWith('/performance-review/manager-review/21st Aug 2023 - 23rd Aug 2023/review-summary', {
            state: {
                ...someData.myManagerReviewCycles[0],
                action: 'View',
                firstManagerId: 2,
                reviewCycle: '21st Aug 2023 - 23rd Aug 2023',
                submittedDate: 'Not Submitted'
            }
        });
    });

    it('filter should be working properly', async () => {
        const { someData: managerData, url: managerUrl } = ManagerReviewMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        const { someData, filterData, responseCode, url } = ManagerReviewMockData.myMangaerReviewCycles.get;
        mock.onGet(url).replyOnce(responseCode, someData).onGet(ManagerReviewMockData.FromUrl).replyOnce(200, filterData);
        RTKRender(<ManagerReview />);

        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getByText('M P (SR002)')).toBeInTheDocument();
        expect(screen.getByText('MJ P (SR002)')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('managerDropdown'));
        fireEvent.click(screen.getByText('T P (SR003)'));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getByText('M P (SR002)')).toBeInTheDocument();
        expect(screen.queryByText('MJ P (SR002)')).not.toBeInTheDocument();
    });

    it('table should show no results when filter applied with no matching data', async () => {
        const { someData: managerData, url: managerUrl } = ManagerReviewMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        const { someData, responseCode, url } = ManagerReviewMockData.myMangaerReviewCycles.get;
        mock.onGet(url).replyOnce(responseCode, someData).onGet(ManagerReviewMockData.FromUrl2).replyOnce(200, {});
        RTKRender(<ManagerReview />);

        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getByText('M P (SR002)')).toBeInTheDocument();
        expect(screen.getByText('MJ P (SR002)')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('managerDropdown'));
        fireEvent.click(screen.getByText('T P (SR003)'));
        fireEvent.click(screen.getByText('R S (SR002)'));
        await waitFor(() => screen.findByText('No result'), { timeout: 3000 });
        expect(screen.queryByText('M P (SR002)')).not.toBeInTheDocument();
        expect(screen.queryByText('MJ P (SR002)')).not.toBeInTheDocument();
    });

    it('pagination should be working properly', async () => {
        const { allData, filterData, responseCode, url } = ManagerReviewMockData.myMangaerReviewCycles.get;
        mock.onGet(url).replyOnce(responseCode, allData).onGet(ManagerReviewMockData.page2Url).replyOnce(200, filterData);
        RTKRender(<ManagerReview />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getByText('TS P (SR007)')).toBeInTheDocument();
        expect(screen.getByText('RS D (SR004)')).toBeInTheDocument();
        fireEvent.click(screen.getByText(2));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.queryByText('TS P (SR007)')).not.toBeInTheDocument();
        expect(screen.queryByText('RS D (SR004)')).not.toBeInTheDocument();
        expect(screen.getByText('M P (SR002)')).toBeInTheDocument();
    });
});

describe('Review for team member', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({ ...ManagerReviewMockData.LocationMockData, pathname: routeConstants.managerReview });
        mock.reset();
    });

    it('Employee filter should be working properly', async () => {
        mock.onGet(ManagerReviewMockData.employee.get.url).replyOnce(200, ManagerReviewMockData.employee.get.someData);
        const { someData, filterData, url } = ManagerReviewMockData.managerReviewCycle.get;
        mock.onGet(url).replyOnce(200, someData).onGet(ManagerReviewMockData.reviewToIdUrl).replyOnce(200, filterData);
        RTKRender(<ManagerReview />);

        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        await waitFor(() => screen.findAllByText('Ak Sr (SR007)'), { timeout: 3000 });
        expect(screen.getByText('M P (SR003)')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('managerDropdown'));
        fireEvent.click(screen.getAllByText('Ak Sr (SR007)')[0]);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        await waitFor(() => screen.findAllByText('Ak Sr (SR007)'), { timeout: 3000 });
        expect(screen.queryByText('M P (SR003)')).not.toBeInTheDocument();
    });

    it('Review status filter should be working properly', async () => {
        mock.onGet(ManagerReviewMockData.employee.get.url).replyOnce(200, ManagerReviewMockData.employee.get.someData);
        const { someData, filterData, url } = ManagerReviewMockData.managerReviewCycle.get;
        mock.onGet(url).replyOnce(200, someData).onGet(ManagerReviewMockData.reviewStatusUrl).replyOnce(200, filterData);
        RTKRender(<ManagerReview />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        await waitFor(() => screen.findAllByText('Ak Sr (SR007)'), { timeout: 3000 });
        expect(screen.getByText('Y J (SR006)')).toBeInTheDocument();
        expect(screen.getByText('M P (SR003)')).toBeInTheDocument();
        expect(screen.getByTestId('reviewStatusDropdown')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('reviewStatusDropdown'));
        fireEvent.click(screen.getByText('Manager Review Submitted'));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        await waitFor(() => screen.findAllByText('Ak Sr (SR007)'), { timeout: 3000 });
        expect(screen.queryByText('Y J (SR006)')).not.toBeInTheDocument();
    });
});
