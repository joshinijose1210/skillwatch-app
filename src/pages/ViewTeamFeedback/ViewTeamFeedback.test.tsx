import { RTKRender, fireEvent, screen } from '@utils/test-utils';
import { ViewTeamFeedback } from './ViewTeamFeedback';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { ManagerReviewMockData } from '@mocks/managerReview';
import * as reactRouterDom from 'react-router-dom';
import { format } from 'date-fns';
import { selfReviewFormMockData } from '@mocks/selfReviewForm';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

const currentData = new Date('2024-10-18T00:00:00Z');
const reviewCycle = `${format(currentData, 'do MMM yyyy')} - ${format(currentData.getDate() + 5, 'do MMM yyyy')}`;

beforeAll(() => {
    const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

    useLocationMock.mockReturnValue({
        ...ManagerReviewMockData.LocationMockData,
        state: { name: 'Back to self review', reviewCycle, employeeId: 72, reviewCycleId: 1 }
    });
});

describe('ViewTeamFeedback component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<ViewTeamFeedback />);
        expect(container).toMatchSnapshot();
    });

    it('should render properly', async () => {
        RTKRender(<ViewTeamFeedback />);
        expect(screen.getByText(`Team's Feedback`)).toBeInTheDocument();
        await screen.findByText(`No feedbacks.`);
    });

    it('should go back properly', () => {
        RTKRender(<ViewTeamFeedback />);
        expect(screen.getByText(`Team's Feedback`)).toBeInTheDocument();
        fireEvent.click(screen.getByText('Go Back'));
        expect(mockNavigate).toBeCalledWith(-1);
    });

    it('should tab change properly', async () => {
        const { url, data } = selfReviewFormMockData.viewTeamFeedbackMockData.feedback;
        mock.onGet(url).reply(200, data);
        RTKRender(<ViewTeamFeedback />);
        expect(screen.getByText(`Team's Feedback`)).toBeInTheDocument();
        const Improvement = screen.getByText('Improvement');
        const Appreciation = screen.getByText('Appreciation');
        const positive = screen.getByText('Positive');
        fireEvent.click(Appreciation);
        fireEvent.click(Improvement);
        fireEvent.click(positive);
        await screen.findByText('Test text');
        expect(positive).toHaveStyle({ color: 'rgb(56, 114, 210)' });
    });
});
