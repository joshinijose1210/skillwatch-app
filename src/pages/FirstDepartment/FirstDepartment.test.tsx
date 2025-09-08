import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { FirstDepartment } from './FirstDepartment';
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

beforeEach(mock.reset);

afterEach(cleanup);

describe('FirstDepartment Component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<FirstDepartment />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        expect(container).toMatchSnapshot();
    });

    it('should render properly', () => {
        RTKRender(<FirstDepartment />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        expect(screen.getByText('departments are created for you. Do you want to add more departments?')).toBeInTheDocument();
        expect(screen.getByTestId('initAddBtn')).toBeEnabled();
    });

    it('should navigate when skip is clicked', () => {
        RTKRender(<FirstDepartment />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const skipBtn = screen.getByTestId('skiBtn');
        expect(skipBtn).toBeEnabled();
        fireEvent.click(skipBtn);
        expect(mockNavigate).toBeCalledWith('/set-up-team');
    });

    it('should all function work properly and add department', async () => {
        mock.onPost(onboardingFlowMockData.firstDepartment.url).replyOnce(200, {
            addedDepartment: ['Test department']
        });
        RTKRender(<FirstDepartment />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('clearBtn-0'));
        await waitFor(() => expect(screen.queryByTestId('clearBtn-0')).not.toBeInTheDocument());
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await waitFor(() => expect(screen.queryByTestId('clearBtn-0')).not.toBeInTheDocument());
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.change(screen.getByTestId('departmentName-0'), { target: { value: 'Test department' } });
        fireEvent.click(screen.getByTestId('activeToggle-0'));
        fireEvent.click(screen.getByTestId('activeToggle-0'));
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText('Department Test department added successfully')).toBeInTheDocument();
    });

    it('should modal work propely', async () => {
        RTKRender(<FirstDepartment />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        const departmentInput = screen.getByTestId('departmentName-0');
        fireEvent.change(departmentInput, { target: { value: 'Test department' } });
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await screen.findByTestId('modal-no');
        fireEvent.click(screen.getByTestId('modal-no'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        expect(departmentInput).toHaveValue('Test department');
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await screen.findByTestId('modal-yes');
        fireEvent.click(screen.getByTestId('modal-yes'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        expect(screen.queryByTestId('clearBtn-0')).not.toBeInTheDocument();
    });

    it('should adding multiple department work propely', async () => {
        RTKRender(<FirstDepartment />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        expect(await screen.findByTestId('clearBtn-0')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('addBtn'));
        expect(await screen.findByTestId('clearBtn-1')).toBeInTheDocument();
    });

    it('should show an error when department already exist', async () => {
        mock.onPost(onboardingFlowMockData.firstDepartment.url).replyOnce(200, {
            existingDepartment: ['Test department']
        });
        RTKRender(<FirstDepartment />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.change(screen.getByTestId('departmentName-0'), { target: { value: 'Test department' } });
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText('Department Test department already exists')).toBeInTheDocument();
    });

    it('should show an error when input for department has special characters', async () => {
        RTKRender(<FirstDepartment />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(await screen.findByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.change(screen.getByTestId('departmentName-0'), { target: { value: 'Test @#$%^' } });
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText('Special characters are not allowed.')).toBeInTheDocument();
    });

    it('should render root component if onboarding flow is false', () => {
        RTKRender(<FirstDepartment />, { initialState: { ...orgAdminMockState, onboardingFlow: true } });
        expect(screen.getAllByText('Onboarding flow is completed')[0]).toBeInTheDocument();
    });
});
