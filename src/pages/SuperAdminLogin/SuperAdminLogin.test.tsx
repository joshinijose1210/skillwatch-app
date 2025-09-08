import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { SuperAdminLogin } from './SuperAdminLogin';
import { routeConstants } from '@constants';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import * as reactRouterDom from 'react-router-dom';
import { SuperAdminLoginMockData } from '@mocks/superAdminLogin';
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

const mockNavigate = jest.fn();

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

beforeEach(mock.reset);

afterEach(cleanup);

describe('Super admin login page', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({
            pathname: '/',
            state: null,
            search: '',
            hash: '',
            key: ''
        });
    });

    it('should take snapshot', () => {
        const { initialState } = SuperAdminLoginMockData;
        const { container } = RTKRender(<SuperAdminLogin />, { initialState: { ...initialState } });
        expect(container).toMatchSnapshot();
    });

    it('should show error toast when some error occurs', async () => {
        useLocationMock.mockReturnValue({
            pathname: '/',
            state: {
                error: true,
                header: 'thisHeader',
                message: 'thisErrorMessage'
            },
            search: '',
            hash: '',
            key: ''
        });
        RTKRender(<SuperAdminLogin />, {
            initialState: { isLoggedIn: false }
        });
        expect(screen.getByText(/thisErrorMessage/i)).toBeInTheDocument();
    });

    it('should validate input credentials properly', () => {
        const { initialState } = SuperAdminLoginMockData;

        RTKRender(<SuperAdminLogin />, { initialState: { ...initialState } });

        const emailInput = screen.getByTestId<HTMLInputElement>('emailInput');
        const passwordInput = screen.getByTestId<HTMLInputElement>('passwordInput');
        const submitButton = screen.getByTestId('submitButton');
        fireEvent.change(emailInput, { target: { value: 'superadmin@company.com ' } });
        fireEvent.change(passwordInput, { target: { value: 'SuperPass124#' } });
        expect(screen.getByText('Please enter valid email address.')).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
        fireEvent.change(emailInput, { target: { value: 'superadmin@company.com' } });
        expect(submitButton).toBeEnabled();
    });

    it('should login properly', async () => {
        const { initialState, get, post } = SuperAdminLoginMockData;

        mock.onPost(post.url).replyOnce(200, {
            ...post.responseData
        });
        mock.onGet(get.url).replyOnce(200, {
            ...get.responseData
        });
        RTKRender(<SuperAdminLogin />, { initialState: { ...initialState } });

        const emailInput = screen.getByTestId<HTMLInputElement>('emailInput');
        const passwordInput = screen.getByTestId<HTMLInputElement>('passwordInput');
        const submitButton = screen.getByTestId('submitButton');
        fireEvent.change(emailInput, { target: { value: 'superadmin@company.com' } });
        fireEvent.change(passwordInput, { target: { value: 'SuperPass124#' } });
        fireEvent.click(submitButton);
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/admin'));
    });

    it('should not login when something goes wrong', async () => {
        const { initialState, post } = SuperAdminLoginMockData;

        mock.onPost(post.url).replyOnce(404);
        RTKRender(<SuperAdminLogin />, { initialState: { ...initialState } });
        const emailInput = screen.getByTestId('emailInput') as HTMLInputElement;
        const passwordInput = screen.getByTestId('passwordInput') as HTMLInputElement;
        const submitButton = screen.getByTestId('submitButton');
        fireEvent.change(emailInput, { target: { value: 'superadmin@company.com' } });
        fireEvent.change(passwordInput, { target: { value: 'SuperPass124#' } });
        fireEvent.click(submitButton);
        expect(await screen.findByText('Something went wrong. Please try again later.')).toBeInTheDocument();
    });

    it('should not login when unauthorized and show unauthorized error message', async () => {
        const { initialState, post } = SuperAdminLoginMockData;

        mock.onPost(post.url).replyOnce(200, {
            ...post.responseData
        });
        mock.onGet('https://dummy-api.example.com/api/employees/email?emailId=superadmin@company.com').replyOnce(401);
        RTKRender(<SuperAdminLogin />, { initialState: { ...initialState } });
        const emailInput = screen.getByTestId('emailInput') as HTMLInputElement;
        const passwordInput = screen.getByTestId('passwordInput') as HTMLInputElement;
        const submitButton = screen.getByTestId('submitButton');
        fireEvent.change(emailInput, { target: { value: 'superadmin@company.com' } });
        fireEvent.change(passwordInput, { target: { value: 'SuperPass124#' } });
        fireEvent.click(submitButton);
        expect(await screen.findByText('Unauthorized access! Please contact system administrator/HR.')).toBeInTheDocument();
    });

    it('should toggle the password visibility', async () => {
        const { initialState } = SuperAdminLoginMockData;

        RTKRender(<SuperAdminLogin />, { initialState: { ...initialState } });
        const passwordInput = screen.getByTestId<HTMLInputElement>('passwordInput');
        const passwordVisibleHandler = screen.getByTestId('passwordVisibleHandler');
        expect(passwordVisibleHandler).toBeInTheDocument();
        await waitFor(() => expect(passwordInput.type).toBe('password'));
        fireEvent.click(passwordVisibleHandler);
        await waitFor(() => expect(passwordInput.type).toBe('text'));
    });

    it('should navigate to company info page when no org is added', async () => {
        const { initialState, post } = SuperAdminLoginMockData;

        mock.onPost(post.url).replyOnce(404, {
            message: 'Please add organisation details!'
        });
        RTKRender(<SuperAdminLogin />, { initialState: { ...initialState } });
        const emailInput = screen.getByTestId('emailInput') as HTMLInputElement;
        const passwordInput = screen.getByTestId('passwordInput') as HTMLInputElement;
        const submitButton = screen.getByTestId('submitButton');
        fireEvent.change(emailInput, { target: { value: 'superadmin@company.com' } });
        fireEvent.change(passwordInput, { target: { value: 'SuperPass124#' } });
        fireEvent.click(submitButton);
        expect(await screen.findByText('Please add organisation details!')).toBeInTheDocument();
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.companyInfoPage, { state: { email: 'superadmin@company.com' } });
    });

    it('should redirect to root page when already logged in', async () => {
        RTKRender(<SuperAdminLogin />, { initialState: { isLoggedIn: true } });
        expect(await screen.findByText('Navigate component')).toBeInTheDocument();
    });
});
