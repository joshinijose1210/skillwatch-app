import { RTKRender, fireEvent, screen } from '@utils/test-utils';
import { FirstEmployee } from './FirstEmployee';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { orgAdminMockState } from '../../mocks/userMockState';
import { onboardingFlowMockData } from '@mocks/onboardingFlow';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

describe('FirstDesignation Component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<FirstEmployee />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        expect(container).toMatchSnapshot();
    });

    it('should render properly', () => {
        RTKRender(<FirstEmployee />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        expect(screen.getByText('Would you like to add an employee?')).toBeInTheDocument();
        expect(screen.getByTestId('addEmployeeBtn')).toBeEnabled();
    });

    it('should navigate to add employee when add employee is clicked', () => {
        RTKRender(<FirstEmployee />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const addEmployeeBtn = screen.getByTestId('addEmployeeBtn');
        expect(addEmployeeBtn).toBeEnabled();
        fireEvent.click(addEmployeeBtn);
        expect(mockNavigate).toBeCalledWith('/set-up-add-employee', { state: { action: 'add' } });
    });

    it('should navigate to bulk import when bulk import is clicked', () => {
        RTKRender(<FirstEmployee />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const bulkImport = screen.getByTestId('bulkImport');
        expect(bulkImport).toBeEnabled();
        fireEvent.click(bulkImport);
        expect(mockNavigate).toBeCalledWith('/set-up-bulk-import', { state: { action: 'add', bulkImportType: 'employees' } });
    });

    it('should call api when done is clicked', async () => {
        mock.onPut(onboardingFlowMockData.firstEmployee.url).replyOnce(400, {});
        RTKRender(<FirstEmployee />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const doneBtn = screen.getByTestId('doneBtn');
        expect(doneBtn).toBeEnabled();
        fireEvent.click(doneBtn);
        await screen.findByText('Something went wrong');
    });

    it('should navigate when go-back is clicked', () => {
        RTKRender(<FirstEmployee />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const goBackBtn = screen.getByTestId('go-back');
        expect(goBackBtn).toBeEnabled();
        fireEvent.click(goBackBtn);
        expect(mockNavigate).toBeCalledWith('/set-up-role');
    });

    it('should render root component if onboarding flow is false', () => {
        RTKRender(<FirstEmployee />, { initialState: { ...orgAdminMockState, onboardingFlow: true } });
        expect(screen.getByText('Onboarding flow is completed')).toBeInTheDocument();
    });
});
