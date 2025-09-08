import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';

import MockAdapter from 'axios-mock-adapter';
import { routeConstants } from '@constants';
import { apiInstance } from '@utils';
import { VerificationMail } from './VerificationMail';
import * as reactRouterDom from 'react-router-dom';
import { ManagerReviewMockData } from '@mocks/managerReview';

const mock = new MockAdapter(apiInstance);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));
const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

beforeAll(() => {
    useLocationMock.mockReturnValue({
        ...ManagerReviewMockData.LocationMockData,
        state: { email: 'aamir.islam@scalereal.com', name: 'Forgot password' }
    });
});

beforeEach(mock.reset);

afterEach(cleanup);

describe('Verification Mail', () => {
    it('should render properly', () => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { email: 'aamir.islam@scalereal.com', name: 'Forgot password' }
        });
        const { container } = RTKRender(<VerificationMail />);
        expect(container).toMatchSnapshot();
    });

    it('should redirect to login page', () => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { email: 'aamir.islam@scalereal.com', name: 'Forgot password' }
        });
        RTKRender(<VerificationMail />);
        fireEvent.click(screen.getByTestId('login-btn'));
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.login);
    });

    it('should check for null email', () => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { email: '', name: 'Forgot password' }
        });
        RTKRender(<VerificationMail />);
        expect(mockNavigate).toHaveBeenCalledWith(routeConstants.login);
    });

    it('should check for resend email', async () => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { email: 'aamir.islam@scalereal.com', name: '' }
        });
        mock.onGet('https://dummy-api.example.com/api/resend-welcome-email/?emailId=aamir.islam@scalereal.com').replyOnce(200, {});
        RTKRender(<VerificationMail />);
        fireEvent.click(screen.getByTestId('resend-btn'));
        await waitFor(() => {
            expect(screen.getByText('Set password link send successfully to your e-mail.')).toBeInTheDocument();
        });
    });

    it('should show error when state is null', async () => {
        //MOCK API
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { email: 'aamir.islam@scalereal.com', name: '' }
        });
        mock.onGet('https://dummy-api.example.com/api/resend-welcome-email/?emailId=aamir.islam@scalereal.com').replyOnce(404, {
            errorMessage: 'Something went wrong'
        });
        RTKRender(<VerificationMail />);
        fireEvent.click(screen.getByTestId('resend-btn'));
        await screen.findByText('Something went wrong');
    });

    it('should reset password work properly', async () => {
        //MOCK API
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { email: 'aamir.islam@scalereal.com', name: 'Forgot password' }
        });
        mock.onPost('https://dummy-api.example.com/api/reset-password-email').replyOnce(200, {});
        RTKRender(<VerificationMail />);
        fireEvent.click(screen.getByTestId('resend-btn'));
        await screen.findByText('Reset password link send successfully to your e-mail.');
    });
});
