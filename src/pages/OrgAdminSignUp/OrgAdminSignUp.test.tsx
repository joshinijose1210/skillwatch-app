import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { OrgAdminSignUp } from './OrgAdminSignUp';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { routeConstants } from '@constants';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import * as reactRouterDom from 'react-router-dom';
import apiUrls from '@constants/apiUrls';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
const renderOrgAdminSignUp = () =>
    RTKRender(
        <GoogleOAuthProvider clientId={''}>
            <OrgAdminSignUp />
        </GoogleOAuthProvider>
    );

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

jest.mock('jwt-decode', () => {
    return {
        __esModule: true,
        default: (credential: string) => {
            return { given_name: 'testname', family_name: 'testfamily', email: 'test@scalereal.com' };
        }
    };
});

jest.mock('@react-oauth/google', () => {
    return {
        GoogleLogin: ({ onSuccess, onError }: { onSuccess: (res: any) => void; onError: () => void }) => {
            return (
                <button
                    data-testid="googleAuthButton"
                    onDoubleClick={() => onError()}
                    onClick={() =>
                        onSuccess({
                            credential: 'test_credential'
                        })
                    }
                >
                    Sign up with Google
                </button>
            );
        },
        GoogleOAuthProvider: ({ children }: { children: any }) => <div>{children}</div>
    };
});

jest.mock('react-microsoft-login', () => {
    return {
        __esModule: true,
        default: ({ authCallback }: { authCallback: (err: any, data: any) => void }) => (
            <button
                data-testid="msAuthButton"
                onClick={() =>
                    authCallback(false, {
                        accessToken: 'test_access_token'
                    })
                }
            >
                Sign up with Microsoft
            </button>
        )
    };
});

beforeEach(() => {
    useLocationMock.mockReturnValue({
        pathname: '/',
        state: null,
        search: '',
        hash: '',
        key: ''
    });
    mock.reset();
});

afterEach(cleanup);

const mockFetch = jest.fn();
const originalGlobalFetch = global.fetch;

beforeAll(() => {
    global.fetch = mockFetch;
});

afterAll(() => {
    global.fetch = originalGlobalFetch;
});

describe('Org admin sign up page UI', () => {
    it('should render correctly', () => {
        const { container } = renderOrgAdminSignUp();
        expect(container).toMatchSnapshot();
    });

    it('should show error for invalid details', async () => {
        renderOrgAdminSignUp();
        const firstInput = screen.getByTestId('firstNameInput');
        const lastInput = screen.getByTestId('lastNameInput');
        const email = screen.getByTestId('emailInput');
        const submitButton = screen.getByTestId('submitButton');
        fireEvent.change(firstInput, { target: { value: 'first   ' } });
        expect(await screen.findByText(/Please enter valid first name/i)).toBeInTheDocument();
        fireEvent.change(lastInput, { target: { value: 'Last  ' } });
        expect(await screen.findByText(/Please enter valid last name/i)).toBeInTheDocument();
        fireEvent.change(lastInput, { target: { value: 'Last' } });
        expect(screen.queryByText(/Please enter valid last name/i)).not.toBeInTheDocument();
        fireEvent.change(email, { target: { value: 'firstlast.gmail.com' } });
        expect(await screen.findByText(/Please enter valid email/i)).toBeInTheDocument();
        fireEvent.change(email, { target: { value: 'firstlast@gmail.com' } });
        expect(submitButton).toBeDisabled();
        fireEvent.change(firstInput, { target: { value: 'First' } });
        expect(screen.queryByText(/Please enter valid first name/i)).not.toBeInTheDocument();
        expect(submitButton).toBeEnabled();
    });

    it('should show something went wrong text when some error occurs', async () => {
        mock.onPost('https://dummy-api.example.com/api/user').replyOnce(404, {
            errorMessage: 'Custom error message that should be shown when something goes wrong'
        });

        renderOrgAdminSignUp();
        const firstInput = screen.getByTestId('firstNameInput');
        const lastInput = screen.getByTestId('lastNameInput');
        const email = screen.getByTestId('emailInput');
        const submitButton = screen.getByTestId('submitButton');
        expect(firstInput).toBeInTheDocument();
        expect(lastInput).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        fireEvent.change(firstInput, { target: { value: 'First' } });
        fireEvent.change(lastInput, { target: { value: 'Last' } });
        fireEvent.change(email, { target: { value: 'first43last@company.com' } });
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        expect(await screen.findByText(/Custom error message that should be shown when something goes wrong/i)).toBeInTheDocument();
    });

    it('should show navigate to company info page after validation and with proper email state', async () => {
        mock.onPost('https://dummy-api.example.com/api/user').replyOnce(200, {});
        renderOrgAdminSignUp();
        const firstInput = screen.getByTestId('firstNameInput');
        const lastInput = screen.getByTestId('lastNameInput');
        const email = screen.getByTestId('emailInput');
        const submitButton = screen.getByTestId('submitButton');

        fireEvent.change(firstInput, { target: { value: 'First' } });
        fireEvent.change(lastInput, { target: { value: 'Last' } });
        fireEvent.change(email, { target: { value: 'firstlast2@company.com' } });
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith(routeConstants.companyInfoPage, {
                state: { email: 'firstlast2@company.com' }
            })
        );
    });

    it('should login with google', async () => {
        renderOrgAdminSignUp();
        const googleAuthButton = await screen.findByTestId('googleAuthButton');
        expect(googleAuthButton).toBeInTheDocument();
        fireEvent.click(googleAuthButton);
    });

    it('should login with microsoft', async () => {
        mock.onPost('https://dummy-api.example.com/api/user').replyOnce(200, {});
        mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ userPrincipalName: 'test@test.com', givenName: 'test_given_name', surname: 'test_surname' })
        });

        renderOrgAdminSignUp();
        const msAuthButton = await screen.findByTestId('msAuthButton');
        expect(msAuthButton).toBeInTheDocument();
        fireEvent.click(msAuthButton);

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(apiUrls.microsoftAuth, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer test_access_token'
                }
            });
        });
    });
});
