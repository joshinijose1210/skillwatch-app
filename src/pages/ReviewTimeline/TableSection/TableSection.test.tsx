import { RTKRender, screen } from '@utils/test-utils';
import { TableSection } from './TableSection';
import { reviewTimelineMockData } from '@mocks/reviewTimeline';
import { empUserState, orgAdminMockState } from '@mocks/userMockState';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate
}));

describe('Table section', () => {
    it('should render as expected', async () => {
        const { data } = reviewTimelineMockData.reviewTimeline.defaultGet;
        const { container } = RTKRender(<TableSection data={data} />);

        expect(container).toMatchSnapshot();
    });

    it('should not show Rating section if the user is Org Admin without members for review', async () => {
        const { data } = reviewTimelineMockData.reviewTimeline.orgAdminWithoutEmpGet;
        RTKRender(<TableSection data={data} />, { initialState: orgAdminMockState });

        expect(screen.queryByText('Average Rating')).not.toBeInTheDocument();
    });

    it('should show self, my manager and my check-in quick links if the user is employee', () => {
        const { data } = reviewTimelineMockData.reviewTimeline.managerReviewPendingGet;
        RTKRender(<TableSection data={data} />, { initialState: empUserState });
        expect(screen.getByText(/4.5/i)).toBeInTheDocument();
    });

    it('should return -1 when ratings are not provided', () => {
        const data = [{}];
        RTKRender(<TableSection data={data} />, { initialState: empUserState });
        expect(screen.getAllByText(/Not yet given./i).length).toBe(4);
    });
});
