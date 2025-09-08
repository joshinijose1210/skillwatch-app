import { RTKRender, fireEvent, screen } from '@utils/test-utils';
import { FirstRole } from './FirstRole';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { orgAdminMockState } from '../../mocks/userMockState';
import { onboardingFlowMockData } from '@mocks/onboardingFlow';
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

beforeAll(() => {
    const { url, someData } = onboardingFlowMockData.departments.get;
    mock.onGet(url).replyOnce(200, someData);
});

describe('FirstDesignation Component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<FirstRole />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        expect(container).toMatchSnapshot();
    });

    it('should render properly', () => {
        RTKRender(<FirstRole />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        expect(
            screen.getByText('roles are created for you. You can view roles & permissions by clicking on the below mentioned button.')
        ).toBeInTheDocument();
        expect(screen.getByTestId('viewRoleBtn')).toBeEnabled();
    });

    it('should navigate to roles when view roles and permissions is clicked', () => {
        RTKRender(<FirstRole />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const viewRoleBtn = screen.getByTestId('viewRoleBtn');
        expect(viewRoleBtn).toBeEnabled();
        fireEvent.click(viewRoleBtn);
        expect(mockNavigate).toBeCalledWith('/set-up-roles-&-permissions/1');
    });

    it('should navigate when skip is clicked', () => {
        RTKRender(<FirstRole />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const skipBtn = screen.getByTestId('skiBtn');
        expect(skipBtn).toBeEnabled();
        fireEvent.click(skipBtn);
        expect(mockNavigate).toBeCalledWith('/set-up-employee');
    });

    it('should navigate when go-back is clicked', () => {
        RTKRender(<FirstRole />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const goBackBtn = screen.getByTestId('go-back');
        expect(goBackBtn).toBeEnabled();
        fireEvent.click(goBackBtn);
        expect(mockNavigate).toBeCalledWith('/set-up-designation');
    });

    it('should render root component if onboarding flow is false', () => {
        RTKRender(<FirstRole />, { initialState: { ...orgAdminMockState, onboardingFlow: true } });
        expect(screen.getByText('Onboarding flow is completed')).toBeInTheDocument();
    });
});
