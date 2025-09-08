import { fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import { SetPassword } from './SetPassword';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { routeConstants } from '@constants';
import * as reactRouterDom from 'react-router-dom';
import { Loader } from '@components';

const SLUG_ID = 'a74ee318-74a6-4ee6-9bc4-7b6e250cc9af';
const SLUG_EMAIL_ID = 'YmlzaGFsLm11a2hlcmplZUBzY2FsZXJlYWwuY29t';
const BASE_URL = `https://dummy-api.example.com/api/check-link-validity?linkId=${SLUG_ID}`;

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
        pathname: routeConstants.setPassword,
        state: null,
        search: `?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`,
        hash: '',
        key: ''
    });
    mock.onGet(BASE_URL).reply(200, {});
});

describe('Set Password', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
        expect(container).toMatchSnapshot();
    });

    it('should show Loader', () => {
        const { container: resetPasswordContainer } = RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
        const { container: loaderContainer } = RTKRender(<Loader />);
        expect(resetPasswordContainer.innerHTML).toEqual(loaderContainer.innerHTML);
    });

    it('should test equality of password and confirm password', async () => {
        RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
        await screen.findAllByText('Set Password');
        const psswrdInpt = screen.getByTestId('password-input');
        fireEvent.change(psswrdInpt, { target: { value: 'aPassword11##' } });
        const confirmPsswrdInpt = screen.getByTestId('confirm-password-input');
        fireEvent.change(confirmPsswrdInpt, { target: { value: 'aaabbbccc' } });
        expect(screen.getByText('Password and confirm password should be same.')).toBeInTheDocument();
    });

    it('should toggle input fields', async () => {
        RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
        await screen.findAllByText('Set Password');
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
        RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
        await screen.findAllByText('Set Password');
        const psswrdInpt = screen.getByTestId('password-input');
        const confirmPsswrdInpt = screen.getByTestId('confirm-password-input');
        fireEvent.change(psswrdInpt, { target: { value: 'a' } });
        fireEvent.change(psswrdInpt, { target: { value: '' } });
        expect(screen.getByText('Please fill in this field.')).toBeInTheDocument();
        expect(confirmPsswrdInpt).toBeDisabled();
        const resetBtn = screen.getByTestId('set-btn');
        expect(resetBtn).toBeDisabled();
    });

    it('should test mouse up and mouse down event', async () => {
        RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
        await screen.findAllByText('Set Password');
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
        RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
        await screen.findAllByText('Set Password');
        const psswrdInpt = screen.getByTestId('password-input');
        fireEvent.change(psswrdInpt, { target: { value: 'a' } });
        expect(screen.getByText('At least 1 letter in small case')).toBeInTheDocument();
        expect(screen.getByText('At least 1 letter in capital case')).toBeInTheDocument();
        expect(screen.getByText('At least 1 letter in number case')).toBeInTheDocument();
        expect(screen.getByText('At least 1 letter in special case')).toBeInTheDocument();
        expect(screen.getByText('Min 8 and max 20 characters')).toBeInTheDocument();
    });

    it('should trigger error message', async () => {
        mock.onPut('https://dummy-api.example.com/api/set-password/', {}).replyOnce(401, {});
        RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
        await screen.findAllByText('Set Password');
        const psswrdInpt = screen.getByTestId('password-input');
        const confirmPsswrdInpt = screen.getByTestId('confirm-password-input');
        const resetBtn = screen.getByTestId('set-btn');
        fireEvent.change(psswrdInpt, { target: { value: 'aPassword11##' } });
        fireEvent.change(confirmPsswrdInpt, { target: { value: 'aPassword11##' } });
        fireEvent.click(resetBtn);
        expect(await screen.findByText('Something went wrong.')).toBeInTheDocument();
    });

    it('should trigger success message on proper submission', async () => {
        mock.onPost().replyOnce(200, {}).onPost('https://dummy-api.example.com/api/set-password/', {}).replyOnce(200, {});
        RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
        await screen.findAllByText('Set Password');
        const psswrdInpt = screen.getByTestId('password-input');
        const confirmPsswrdInpt = screen.getByTestId('confirm-password-input');
        const resetBtn = screen.getByTestId('set-btn');
        fireEvent.change(psswrdInpt, { target: { value: 'aPassword11##' } });
        fireEvent.change(confirmPsswrdInpt, { target: { value: 'a' } });
        fireEvent.change(confirmPsswrdInpt, { target: { value: '' } });
        expect(screen.getByText('Please fill in this field.')).toBeInTheDocument();
        expect(resetBtn).toBeDisabled();
        fireEvent.change(confirmPsswrdInpt, { target: { value: 'aPassword11##' } });
        expect(resetBtn).toBeEnabled();
        fireEvent.click(resetBtn);
        await screen.findByText('Password set successfully');
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.login);
    });

    it('should triiger error message, on link expiry', async () => {
        mock.onGet(BASE_URL).reply(404, {});
        RTKRender(<SetPassword />, {
            initialEntries: [`${routeConstants.setPassword}?id=${SLUG_ID}&emailId=${SLUG_EMAIL_ID}`]
        });
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
});
