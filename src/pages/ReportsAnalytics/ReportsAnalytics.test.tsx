import { cleanup, fireEvent, RTKRender, screen } from '@utils/test-utils';
import { apiInstance } from '@utils';
import MockAdapter from 'axios-mock-adapter';
import { ReportsAnalyticsMockData } from '@mocks/reportsAnalytics';
import { ReportsAnalytics } from './ReportsAnalytics';
import FormatAxisLabel from './ChartAnalytics/FormateAxixLabel';
import { DotsLoader } from '@medly-components/loaders';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeAll(() => {
    const { url, data, responseCode } = ReportsAnalyticsMockData.get.reviewCycles;
    mock.onGet(url).reply(responseCode, data);
});

afterEach(cleanup);

describe('Report Analytics', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<ReportsAnalytics />);
        expect(container).toMatchSnapshot();
    });

    it('should check redirection when analytic card is clicked', () => {
        const { url, data, responseCode } = ReportsAnalyticsMockData.get.analyticsCards;
        mock.onGet(url).reply(responseCode, data);
        RTKRender(<ReportsAnalytics />);
        const selectedCard = screen.getByText('Outstanding');
        fireEvent.click(selectedCard);
        expect(mockNavigate).toHaveBeenCalledWith('/reports/analytics/Ratings', {
            state: {
                title: 'outstanding',
                reviewCycle: '',
                ratingLabel: 'Outstanding'
            }
        });
    });

    it('should show active employees correctly', async () => {
        const { url, data, responseCode } = ReportsAnalyticsMockData.get.employeeData;
        mock.onGet(url).replyOnce(responseCode, data);

        const { container } = RTKRender(<ReportsAnalytics />);
        const { container: dotsLoaderContainer } = RTKRender(<DotsLoader />);
        expect(container.innerHTML).toMatch(dotsLoaderContainer.innerHTML);

        expect(await screen.findByText('89')).toBeInTheDocument();
        expect(screen.getByText('Active Employees')).toBeInTheDocument();
    });

    it('should test the Rankings section', async () => {
        const { url, responseCode, data } = ReportsAnalyticsMockData.get.rankingsData;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReportsAnalytics />);
        expect(await screen.findByText('Dummy User')).toBeInTheDocument();
        expect(screen.getByText('DU112233')).toBeInTheDocument();
        expect(screen.getByText('4.5')).toBeInTheDocument();
    });

    it('should test Demographic section', async () => {
        const { url, responseCode, data } = ReportsAnalyticsMockData.get.demographicData;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReportsAnalytics />);

        expect(await screen.findByText('Average Tenure')).toBeInTheDocument();
        const averageTenureContainer = screen.getByText('0.3');
        expect(averageTenureContainer.parentElement).toHaveTextContent('0.3 year');

        expect(screen.getByText('Average Age')).toBeInTheDocument();
        const averageAgeContainer = screen.getByText('4.9');
        expect(averageAgeContainer.parentElement).toHaveTextContent('4.9 years');
    });

    it('should test Feeback section', async () => {
        const { url, responseCode, data } = ReportsAnalyticsMockData.get.feedbackAnalytics;
        mock.onGet(url).replyOnce(responseCode, data);
        RTKRender(<ReportsAnalytics />);
        await screen.findAllByText('Overview');
        expect(screen.getByText('Feedback')).toBeInTheDocument();
    });
});

describe('Format Axis Label component in ChartAnalytics section', () => {
    it('should correctly format and render the label value', async () => {
        const mockProps = { x: 10, y: 10, value: 'sOmE TeST VALue', rotate: '' };
        RTKRender(<FormatAxisLabel {...mockProps} />);
        expect(await screen.findByText('Some test value')).toBeInTheDocument();
    });
});
