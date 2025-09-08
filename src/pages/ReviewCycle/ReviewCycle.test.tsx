import { RTKRender, cleanup, fireEvent, screen } from '@utils/test-utils';
import { ReviewCycle } from './ReviewCycle';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { reviewCycleMockData } from '@mocks/reviewCycle';
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

beforeEach(mock.reset);

afterEach(cleanup);

describe('Review Cycle Page', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<ReviewCycle />);
        expect(container).toMatchSnapshot();
    });

    it('should show review cycles listing', async () => {
        mock.onGet(reviewCycleMockData.getAll.url).replyOnce(200, { ...reviewCycleMockData.getAll.data });
        RTKRender(<ReviewCycle />);
        expect(await screen.findByText('Review Cycles')).toBeInTheDocument();
        expect((await screen.findAllByText('Inactive')).length).toBe(1);
        const viewButtons = screen.getAllByText('View');
        fireEvent.click(viewButtons[viewButtons.length - 1]);

        expect(mockNavigate).toHaveBeenCalledWith('/performance-review/review-cycles/view-review-cycle', {
            state: {
                action: 'View',
                checkInWithManagerEndDate: 1715904000000,
                checkInWithManagerStartDate: 1715385600000,
                endDate: 1715904000000,
                lastModified: 1716297892486,
                managerReviewEndDate: 1715299200000,
                managerReviewStartDate: 1715126400000,
                organisationId: 1,
                publish: false,
                reviewCycle: '1st May 2024 - 17th May 2024',
                reviewCycleId: 40,
                selfReviewEndDate: 1715212800000,
                selfReviewStartDate: 1714521600000,
                startDate: 1714521600000
            }
        });
    });

    it('should navigate to edit review cycle page', async () => {
        mock.onGet(reviewCycleMockData.getAll.url).replyOnce(200, { ...reviewCycleMockData.paginatedData.data });
        RTKRender(<ReviewCycle />);
        expect(await screen.findByText('Review Cycles')).toBeInTheDocument();
        fireEvent.click(screen.getAllByText('Edit')[0]);

        expect(mockNavigate).toHaveBeenCalledWith('/performance-review/review-cycles/edit-review-cycle', {
            state: {
                action: 'Edit',
                checkInWithManagerEndDate: 1715904000000,
                checkInWithManagerStartDate: 1715385600000,
                endDate: 1815904000000,
                lastModified: 1716297892486,
                managerReviewEndDate: 1715299200000,
                managerReviewStartDate: 1715126400000,
                organisationId: 1,
                publish: false,
                reviewCycle: '1st May 2024 - 18th Jul 2027',
                reviewCycleId: 41,
                selfReviewEndDate: 1715212800000,
                selfReviewStartDate: 1714521600000,
                startDate: 1714521600000
            }
        });
    });

    it('should navigate to add review cycles form', async () => {
        mock.onGet(reviewCycleMockData.getAll.url).replyOnce(200, { ...reviewCycleMockData.getAll.data });
        RTKRender(<ReviewCycle />);
        fireEvent.click(await screen.findByText('Add Review Cycle'));

        expect(mockNavigate).toHaveBeenCalledWith('/performance-review/review-cycles/add-review-cycle', { state: { action: 'Add' } });
    });

    it('should test pagination', async () => {
        mock.onGet(reviewCycleMockData.getAll.url)
            .replyOnce(200, { ...reviewCycleMockData.getAll.data })
            .onGet(reviewCycleMockData.paginatedData.url)
            .replyOnce(200, { ...reviewCycleMockData.paginatedData.data });
        RTKRender(<ReviewCycle />);
        expect(await screen.findByText('Add Review Cycle')).toBeInTheDocument();
        expect(await screen.findAllByText('Active')).toHaveLength(9);
        const pagnBtn = screen.getAllByText('2');

        fireEvent.click(pagnBtn[pagnBtn.length - 1]);

        expect(await screen.findByText('Add Review Cycle')).toBeInTheDocument();

        expect((await screen.findAllByText('Inactive')).length).toBe(2);
        expect(screen.queryByText('Active')).not.toBeInTheDocument();
    });
});
