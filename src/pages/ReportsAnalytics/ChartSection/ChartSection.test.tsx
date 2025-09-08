import { RTKRender, cleanup, screen } from '@utils/test-utils';
import { ChartSection } from './ChartSection';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { ChartSectionMockData } from '@mocks/chartSection';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeEach(mock.reset);

afterEach(cleanup);

describe('Chart Section', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<ChartSection reviewCycleId="46" />);
        expect(container).toMatchSnapshot();
    });

    it('should show graphs with review status data and feedback graph data', async () => {
        const { get, reviewCycleId } = ChartSectionMockData;
        const { feedbackGraph, reviewStatus } = get;
        mock.onGet(feedbackGraph.url).replyOnce(200, feedbackGraph.data);
        mock.onGet(reviewStatus.url).replyOnce(200, reviewStatus.data);
        RTKRender(<ChartSection reviewCycleId={reviewCycleId} />);
        expect(await screen.findByText('Feedback')).toBeInTheDocument();
    });
});
