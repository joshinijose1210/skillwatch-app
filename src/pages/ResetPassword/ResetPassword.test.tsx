import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import { ResetPassword } from './ResetPassword';
import { routeConstants } from '@constants';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import * as reactRouterDom from 'react-router-dom';
import { Loader } from '@components';
import { ResetPasswordMockData } from '@mocks/resetPassword';

const { BASE_URL, ID, EMAIL_ID } = ResetPasswordMockData;

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeEach(() => {
    mock.reset();
    const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
    useLocationMock.mockReturnValue({
        pathname: routeConstants.resetPassword,
        state: null,
        search: `?id=${ID}&emailId=${EMAIL_ID}`,
        hash: '',
        key: ''
    });
    mock.onGet(`${BASE_URL}/api/check-link-validity?linkId=${ID}`).reply(200, {});
});

afterEach(cleanup);

describe('Reset Password', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<ResetPassword />);
        expect(container).toMatchSnapshot();
    });

    it('should show Loader', async () => {
        const { container: resetPasswordContainer } = RTKRender(<ResetPassword />, {
            initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`]
        });
        const { container: loaderContainer } = RTKRender(<Loader />);
        expect(resetPasswordContainer.innerHTML).toEqual(loaderContainer.innerHTML);
    });

    it('should test equality of password and confirm password', async () => {
        RTKRender(<ResetPassword />, { initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`] });
        await screen.findAllByText('Reset Password');
        const psswrdInpt = screen.getByTestId('password-input');
        fireEvent.change(psswrdInpt, { target: { value: 'aPassword11##' } });
        const confirmPsswrdInpt = screen.getByTestId('confirm-password-input');
        fireEvent.change(confirmPsswrdInpt, { target: { value: 'aaabbbccc' } });
        expect(screen.getByText('New password and confirm new password should be same.')).toBeInTheDocument();
    });

    it('should toggle input fields', async () => {
        RTKRender(<ResetPassword />, { initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`] });
        await screen.findAllByText('Reset Password');
        const psswrdInpt = screen.getByTestId('password-input');
        const confirmPsswrdInpt = screen.getByTestId('confirm-password-input');
        expect(psswrdInpt).toHaveAttribute('type', 'password');
        expect(confirmPsswrdInpt).toHaveAttribute('type', 'password');
        fireEvent.change(psswrdInpt, { target: { value: 'aPassword11##' } });
        fireEvent.click(screen.getByTestId('password-visibility'));
        expect(psswrdInpt).toHaveAttribute('type', 'text');
        fireEvent.change(confirmPsswrdInpt, { target: { value: 'aPassword11##' } });
        fireEvent.click(screen.getByTestId('confirm-password-visibility'));
        expect(confirmPsswrdInpt).toHaveAttribute('type', 'text');
    });

    it('submit button should be disabled', async () => {
        RTKRender(<ResetPassword />, { initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`] });
        await screen.findAllByText('Reset Password');
        const psswrdInpt = screen.getByTestId('password-input');
        const confirmPsswrdInpt = screen.getByTestId('confirm-password-input');
        fireEvent.change(psswrdInpt, { target: { value: 'a' } });
        fireEvent.change(psswrdInpt, { target: { value: '' } });
        expect(screen.getByText('Please fill in this field.')).toBeInTheDocument();
        expect(confirmPsswrdInpt).toBeDisabled();
        const resetBtn = screen.getByTestId('reset-btn');
        expect(resetBtn).toBeDisabled();
    });

    it('should test mouse up and mouse down event', async () => {
        RTKRender(<ResetPassword />, { initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`] });
        await screen.findAllByText('Reset Password');
        const psswdVisibilityIcon = screen.getByTestId('password-visibility');
        expect(psswdVisibilityIcon).toBeInTheDocument();
        const confPsswdVisibilityIcon = screen.getByTestId('confirm-password-visibility');
        expect(psswdVisibilityIcon).toBeInTheDocument();
        const mockEvent = {
            preventDefault: jest.fn()
        };
        fireEvent.mouseDown(psswdVisibilityIcon, mockEvent);
        fireEvent.mouseDown(confPsswdVisibilityIcon, mockEvent);
    });

    it('password input validation should work properly', async () => {
        RTKRender(<ResetPassword />, { initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`] });
        await screen.findAllByText('Reset Password');
        const psswrdInpt = screen.getByTestId('password-input');
        fireEvent.change(psswrdInpt, { target: { value: 'a' } });
        expect(screen.getByText('At least 1 letter in small case')).toBeInTheDocument();
        expect(screen.getByText('At least 1 letter in capital case')).toBeInTheDocument();
        expect(screen.getByText('At least 1 letter in number case')).toBeInTheDocument();
        expect(screen.getByText('At least 1 letter in special case')).toBeInTheDocument();
        expect(screen.getByText('Min 8 and max 20 characters')).toBeInTheDocument();
    });

    it('should trigger error message', async () => {
        mock.onPut(`${BASE_URL}/api/set-password/`, {}).replyOnce(401, {});
        RTKRender(<ResetPassword />, { initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`] });
        await screen.findAllByText('Reset Password');
        const psswrdInpt = screen.getByTestId('password-input');
        const confirmPsswrdInpt = screen.getByTestId('confirm-password-input');
        const resetBtn = screen.getByTestId('reset-btn');
        fireEvent.change(psswrdInpt, { target: { value: 'aPassword11##' } });
        fireEvent.change(confirmPsswrdInpt, { target: { value: 'aPassword11##' } });
        fireEvent.click(resetBtn);
        expect(await screen.findByText('Something went wrong.')).toBeInTheDocument();
    });

    it('should trigger success message on proper submission', async () => {
        mock.onPost().replyOnce(200, {}).onPost(`${BASE_URL}/api/set-password/`, {}).replyOnce(200, {});
        RTKRender(<ResetPassword />, { initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`] });
        await screen.findAllByText('Reset Password');
        const psswrdInpt = screen.getByTestId('password-input');
        const confirmPsswrdInpt = screen.getByTestId('confirm-password-input');
        const resetBtn = screen.getByTestId('reset-btn');
        fireEvent.change(psswrdInpt, { target: { value: 'aPassword11##' } });
        fireEvent.change(confirmPsswrdInpt, { target: { value: 'a' } });
        fireEvent.change(confirmPsswrdInpt, { target: { value: '' } });
        expect(screen.getByText('Please fill in this field.')).toBeInTheDocument();
        expect(resetBtn).toBeDisabled();
        fireEvent.change(confirmPsswrdInpt, { target: { value: 'aPassword11##' } });
        expect(resetBtn).toBeEnabled();
        fireEvent.click(resetBtn);
        await screen.findByText('Password reset successfully');
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.login);
    });

    it('should triiger error message, on link expiry', async () => {
        mock.onGet(`${BASE_URL}/api/check-link-validity?linkId=${ID}`).reply(404, {});
        RTKRender(<ResetPassword />, { initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`] });
        await waitFor(
            () =>
                expect(mockNavigate).toHaveBeenCalledWith(routeConstants.login, {
                    state: {
                        error: true,
                        header: 'Error!',
                        message: 'Invalid/expired link.'
                    }
                }),
            { timeout: 3000 }
        );
    });

    it('should redirect to login screen', async () => {
        RTKRender(<ResetPassword />, { initialEntries: [`${routeConstants.resetPassword}?id=${ID}&emailId=${EMAIL_ID}`] });
        await screen.findAllByText('Reset Password');
        const goToLogin = screen.getByText('Go to Login');
        fireEvent.click(goToLogin);
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.login);
    });
});
