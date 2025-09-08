import { cleanup, RTKRender, screen, waitFor, fireEvent } from '@utils/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { SelfReview } from './SelfReview';
import { apiInstance } from '@utils';
import { selfReviewMockData } from '@mocks/selfreview';

const mock = new MockAdapter(apiInstance);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate
}));

afterEach(() => {
    cleanup();
});

describe('self review', () => {
    it('should render properly', () => {
        const { url, allData, responseCode } = selfReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        const { container } = RTKRender(<SelfReview />);
        expect(container).toMatchSnapshot();
    });

    it('should redirect to view self review when clicked on view link', async () => {
        const { url, allData, responseCode } = selfReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        RTKRender(<SelfReview />);

        const viewBtn = await waitFor(() => screen.findAllByText('View'), { timeout: 4000 });

        fireEvent.click(viewBtn[0]);

        expect(mockNavigate).toHaveBeenCalledWith('/performance-review/self-review/27th Aug 2023 - 31st Aug 2023/review-summary', {
            state: {
                action: 'View',
                averageRating: 2,
                draft: false,
                endDate: 1693440000000,
                publish: true,
                reviewFromId: 72,
                reviewToId: 72,
                reviewCycle: '27th Aug 2023 - 31st Aug 2023',
                reviewCycleId: 134,
                selfReviewEndDate: 1693094400000,
                selfReviewStartDate: 1693094400000,
                startDate: 1693094400000,
                submittedDate: '28/8/2023',
                updatedAt: 1693218076587
            }
        });
    });

    it('should show `Self Review date passed` if review cycle is of past dates', async () => {
        mock.onGet(
            'https://dummy-api.example.com/api/review-cycle/self-review?reviewTypeId=1&reviewToId=72&organisationId=1&reviewFromId=72&page=1&limit=10&reviewCycleId='
        ).replyOnce(200, {
            totalReviewCycles: 1,
            reviewCycles: [
                {
                    reviewCycleId: 133,
                    startDate: 1692835200000,
                    endDate: 1693008000000,
                    selfReviewStartDate: 1692921600000,
                    selfReviewEndDate: 1692921600000,
                    averageRating: -1.0,
                    draft: false,
                    publish: false,
                    updatedAt: 1750134788782,
                    isReviewCyclePublish: true,
                    isReviewCycleActive: true,
                    isSelfReviewActive: false,
                    isSelfReviewDatePassed: true
                }
            ]
        });
        RTKRender(<SelfReview />);
        await waitFor(() => screen.findByText('Self Review date passed'), { timeout: 4000 });
        expect(screen.getByText('Self Review date passed')).toBeInTheDocument();
    });

    it('should test pagination', async () => {
        const { url, paginationUrl, allData, paginatedData, responseCode } = selfReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, allData).onGet(paginationUrl).replyOnce(responseCode, paginatedData);

        RTKRender(<SelfReview />);

        await waitFor(() => screen.findAllByText('View'), { timeout: 4000 });
        const pagnBtn = screen.getAllByText(2);

        fireEvent.click(pagnBtn[pagnBtn.length - 1]);

        await waitFor(() => screen.findAllByText('View'), { timeout: 4000 });

        expect(screen.queryByText('26th Jul 2023 - 2nd Aug 2023')).not.toBeInTheDocument();
    });

    it('should test empty response condition', async () => {
        const { url, responseCode, emptyData } = selfReviewMockData.get;
        mock.onGet(url).replyOnce(responseCode, emptyData);
        RTKRender(<SelfReview />);
        expect(await screen.findByText('No result')).toBeInTheDocument();
    });
});
