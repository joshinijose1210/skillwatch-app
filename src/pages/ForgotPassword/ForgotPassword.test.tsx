import { cleanup, fireEvent, RTKRender, screen } from '@utils/test-utils';
import { ForgotPassword } from './ForgotPassword';
import MockAdapter from 'axios-mock-adapter';
import { routeConstants } from '@constants';
import { apiInstance } from '@utils';

const mock = new MockAdapter(apiInstance);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate
}));

beforeEach(mock.reset);

afterEach(cleanup);

describe('Forgot Password', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<ForgotPassword />);
        expect(container).toMatchSnapshot();
    });

    it('submit button should be disabled', () => {
        RTKRender(<ForgotPassword />);
        const submitBtn = screen.getByTestId('submit-btn');
        const emailInput = screen.getByTestId('email-input');
        fireEvent.change(emailInput, { target: { value: '' } });
        expect(submitBtn).toBeDisabled();
    });

    it('should test email validation', () => {
        RTKRender(<ForgotPassword />);
        const submitBtn = screen.getByTestId('submit-btn');
        const emailInput = screen.getByTestId('email-input');
        fireEvent.change(emailInput, { target: { value: 'johndoescalerealcom' } });
        expect(submitBtn).toBeDisabled();
        expect(screen.getByText('Please enter valid email address.')).toBeInTheDocument();
    });

    it('should show error for Invalid Email', async () => {
        mock.onPost('https://dummy-api.example.com/api/reset-password-email').replyOnce(404, {
            errorMessage: 'Invalid Email Id'
        });
        RTKRender(<ForgotPassword />);
        fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'johndoe@scareal.com' } });
        const submitButton = screen.getByTestId('submit-btn');
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        await screen.findByText(/Invalid Email Id/i);
    });

    it('should show error for something went wrong', async () => {
        mock.onPost('https://dummy-api.example.com/api/reset-password-email').replyOnce(400, {});
        RTKRender(<ForgotPassword />);
        fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'johndoe@scareal.com' } });
        const submitButton = screen.getByTestId('submit-btn');
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        await screen.findByText(/something went wrong/i);
    });

    it('submit button should be enabled,request should be sent for valid email', async () => {
        mock.onPost().replyOnce(200, {}).onPost('https://dummy-api.example.com/api/reset-password-email').replyOnce(200, {});
        RTKRender(<ForgotPassword />);
        fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'johndoe@scalereal.com' } });
        const submitButton = screen.getByTestId('submit-btn');
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        await screen.findByText('If the email address is registered, you will receive a password reset email.');
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.resetPasswordVerification, {
            state: { data: { emailId: 'johndoe@scalereal.com', errors: { emailId: '' } }, name: 'Forgot password' }
        });
    });

    it('should redirect to login page', () => {
        RTKRender(<ForgotPassword />);
        fireEvent.click(screen.getByText('Go to Login'));
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.login);
    });
});
