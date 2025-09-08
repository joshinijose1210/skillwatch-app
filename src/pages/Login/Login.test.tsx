import { orgAdminMockState } from '@mocks/userMockState';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';

import { Login } from './Login';
import { LoginMockData } from '@mocks/loginMock';
import * as reactRouterDom from 'react-router-dom';
import { dashboardMockData } from '@mocks/dashboard';
import { routeConstants } from '@constants';
import { ErrorResponses } from '@mocks/ErrorResponses';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

jest.mock('gapi-script', () => ({
    gapi: {
        client: {
            init: () => null
        },
        load: () => null
    }
}));

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
const originalProcessEnvMode = process.env.MODE;

beforeEach(() => {
    useLocationMock.mockReturnValue(dashboardMockData.LocationMockData);
    mock.reset();
});

afterEach(() => {
    process.env.MODE = originalProcessEnvMode;
    cleanup();
});

const renderLogin = () =>
    RTKRender(
        <GoogleOAuthProvider clientId={''}>
            <Login />
        </GoogleOAuthProvider>,
        { initialState: { ...orgAdminMockState, isLoggedIn: false } }
    );

describe('Log in', () => {
    it('should take snapshot', () => {
        const { container } = renderLogin();
        expect(container).toMatchSnapshot();
    });

    it('should call login action', async () => {
        const { url, allData, responseCode } = LoginMockData.login.post;
        mock.onPost(url).replyOnce(responseCode, allData);
        const { url: userUrl, userData } = LoginMockData.userDetails.get;
        mock.onGet(userUrl).replyOnce(responseCode, userData);
        renderLogin();
        fireEvent.change(await screen.findByTestId('email'), { target: { value: 'test.user@scalereal.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456788' } });
        fireEvent.click(screen.getByTestId('submitBtn'));
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'), { timeout: 3000 });
    });

    it('should show error for unauthorize access', async () => {
        const { url } = LoginMockData.login.post;
        const { responseCode, UnauthorizedAccessErrorResponse } = ErrorResponses.error404;
        mock.onPost(url).replyOnce(responseCode, UnauthorizedAccessErrorResponse);
        renderLogin();
        fireEvent.change(await screen.findByTestId('email'), { target: { value: 'test.user@scalereal.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456788' } });
        expect(screen.getByTestId('submitBtn')).toBeEnabled();
        fireEvent.click(screen.getByTestId('submitBtn'));
        expect(await screen.findByText('Unauthorized Access! Please contact System Admin/HR.')).toBeInTheDocument();
    });

    it('should show error when login fails', async () => {
        const { url } = LoginMockData.login.post;
        mock.onPost(url).replyOnce(401, {});
        renderLogin();
        fireEvent.change(await screen.findByTestId('email'), { target: { value: 'abc@gmail.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456788' } });
        fireEvent.click(screen.getByTestId('view-pass'));
        fireEvent.click(screen.getByTestId('submitBtn'));
        expect(await screen.findByText('Something went wrong. Please try again later.')).toBeInTheDocument();
    });

    it('should re-route to add company info page', async () => {
        const { url } = LoginMockData.login.post;
        const { responseCode, AddOrgDetailsErrorResponse } = ErrorResponses.error401;
        mock.onPost(url).replyOnce(responseCode, AddOrgDetailsErrorResponse);
        const { url: userUrl } = LoginMockData.userDetails.get;
        mock.onGet(userUrl).replyOnce(200, {});
        renderLogin();
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'abc@gmail.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456788' } });
        fireEvent.click(screen.getByTestId('view-pass'));
        fireEvent.click(screen.getByTestId('submitBtn'));
        expect(await screen.findByText('Please add organisation details!')).toBeInTheDocument();
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.companyInfoPage, { state: { email: 'abc@gmail.com' } });
    });

    it('should show error for invalid email', async () => {
        const { url: userUrl } = LoginMockData.userDetails.get;
        mock.onGet(userUrl).replyOnce(200, {});
        renderLogin();
        fireEvent.change(screen.getByTestId('email'), { target: { value: 'abc@gmail.c' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456788' } });
        expect(await screen.findByText(/Please enter valid email address./i)).toBeInTheDocument();
    });

    it('should login if empty module permission', async () => {
        const { url, allData, responseCode } = LoginMockData.login.post;
        mock.onPost(url).replyOnce(responseCode, allData);
        const { url: userUrl, userDataWithoutModulePermission: data } = LoginMockData.userDetails.get;
        mock.onGet(userUrl).replyOnce(responseCode, data);
        renderLogin();
        fireEvent.change(await screen.findByTestId('email'), { target: { value: 'test.user@scalereal.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123456788' } });
        fireEvent.click(screen.getByTestId('submitBtn'));
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'), { timeout: 3000 });
    });

    it('should show error when something goes wrong', async () => {
        useLocationMock.mockReturnValue({
            ...dashboardMockData.LocationMockData,
            state: { error: true, header: 'Error', message: 'Something went wrong' }
        });
        const { url, allData } = LoginMockData.login.post;
        mock.onPost(url).replyOnce(401, allData);
        renderLogin();
        expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    });

    it('should redirect to forget password', async () => {
        const { url, allData, responseCode } = LoginMockData.login.post;
        mock.onPost(url).replyOnce(responseCode, allData);
        renderLogin();
        fireEvent.click(screen.getByTestId('forgot-password'));
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(routeConstants.forgotPassword));
    });

    it('should redirect to org admin signup', async () => {
        const { url, allData, responseCode } = LoginMockData.login.post;
        mock.onPost(url).replyOnce(responseCode, allData);
        renderLogin();
        fireEvent.click(screen.getByTestId('sign-up'));
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(routeConstants.orgAdminSignUp));
    });

    it('should login by google', async () => {
        const { url, allData, responseCode } = LoginMockData.login.post;
        mock.onPost(url).replyOnce(responseCode, allData);
        const { url: googleLogin, googleData, responseCode: googleLoginResponseCode } = LoginMockData.googleLogin.post;
        mock.onPost(googleLogin).replyOnce(googleLoginResponseCode, googleData);
        renderLogin();
        const googleAuthButton = screen.getByTestId('googleAuthBtn');
        expect(googleAuthButton).toBeInTheDocument();
        fireEvent.click(googleAuthButton);
    });

    it('should render microsoft login button', async () => {
        renderLogin();
        const msAuthButton = screen.getByTestId('msAuthBtn');
        expect(msAuthButton).toBeInTheDocument();
        fireEvent.click(msAuthButton);
    });

    it('should re-route uri have /app when in production', async () => {
        process.env.MODE = 'production';
        RTKRender(
            <GoogleOAuthProvider clientId={''}>
                <Login />
            </GoogleOAuthProvider>,
            { initialState: { ...orgAdminMockState, isLoggedIn: true } }
        );
        expect(screen.getByText('Navigate component')).toBeInTheDocument();
    });
});
