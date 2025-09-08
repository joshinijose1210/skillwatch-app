import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { CompanyInfo } from './CompanyInfo';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { routeConstants } from '@constants';
import * as reactRouterDom from 'react-router-dom';
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

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

describe('first', () => {
    it('should render correctly', () => {
        const { container } = RTKRender(<CompanyInfo />);
        expect(container).toMatchSnapshot();
    });

    it('should handle changes to form correctly', async () => {
        useLocationMock.mockReturnValue({
            pathname: '/',
            state: { email: 'test@scalereal.com' },
            search: '',
            hash: '',
            key: ''
        });
        mock.onPost('https://dummy-api.example.com/api/organisation').replyOnce(200, {});
        RTKRender(<CompanyInfo />);
        const PhNumber = screen.getByPlaceholderText<HTMLInputElement>('Contact Number');
        const companySize = screen.getByTestId<HTMLInputElement>('companySize');
        const companyName = screen.getByTestId<HTMLInputElement>('companyName');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(PhNumber, { target: { value: '+919873465628' } });
        fireEvent.change(companyName, { target: { value: 'Company1' } });
        fireEvent.change(companySize, { target: { value: 10 } });

        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        expect(await screen.findByText(/Organisation details submitted successfully/i)).toBeInTheDocument();
        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith(routeConstants.orgAdminVerification, {
                state: { email: 'test@scalereal.com' }
            })
        );
    });

    it('should handle changes to form correctly with mail from url search', async () => {
        const userEmail = 'test@scalereal.com';
        useLocationMock.mockReturnValue({
            pathname: '/',
            state: null,
            search: userEmail,
            hash: '',
            key: ''
        });
        mock.onPost('https://dummy-api.example.com/api/organisation').replyOnce(200, {});
        RTKRender(<CompanyInfo />);
        const PhNumber = screen.getByPlaceholderText<HTMLInputElement>('Contact Number');
        const companySize = screen.getByTestId<HTMLInputElement>('companySize');
        const companyName = screen.getByTestId<HTMLInputElement>('companyName');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(PhNumber, { target: { value: '+919873465628' } });
        fireEvent.change(companyName, { target: { value: 'Company1' } });
        fireEvent.change(companySize, { target: { value: 10 } });

        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        expect(await screen.findByText(/Organisation details submitted successfully/i)).toBeInTheDocument();
        await waitFor(() =>
            expect(mockNavigate).toHaveBeenCalledWith(routeConstants.orgAdminVerification, {
                state: { email: Buffer.from(userEmail, 'base64').toString('ascii') }
            })
        );
    });

    it('should show error text when phone number is invalid', async () => {
        RTKRender(<CompanyInfo />);
        const PhNumber = screen.getByPlaceholderText<HTMLInputElement>('Contact Number');
        const companyName = screen.getByTestId<HTMLInputElement>('companyName');
        const companySize = screen.getByTestId<HTMLInputElement>('companySize');

        fireEvent.change(PhNumber, { target: { value: '+919465628' } });
        fireEvent.change(companyName, { target: { value: 'Company!@#$%' } });

        fireEvent.change(companySize, { target: { value: 'siez' } });
        expect(await screen.findByText(/Please enter valid company size./i)).toBeInTheDocument();
        expect(screen.getByText(/Please enter valid contact number/i)).toBeInTheDocument();
    });

    it('should show errorMessage when something goes wrong', async () => {
        mock.onPost('https://dummy-api.example.com/api/organisation').replyOnce(502, {
            errorMessage: 'Something went really and terribly wrong.'
        });
        RTKRender(<CompanyInfo />);
        const PhNumber = screen.getByPlaceholderText<HTMLInputElement>('Contact Number');
        const companySize = screen.getByTestId<HTMLInputElement>('companySize');
        const companyName = screen.getByTestId<HTMLInputElement>('companyName');
        const submitButton = screen.getByText('Submit');
        fireEvent.change(PhNumber, { target: { value: '+919873465628' } });
        fireEvent.change(companyName, { target: { value: 'Company1' } });
        fireEvent.change(companySize, { target: { value: 10 } });
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        expect(await screen.findByText(/Something went really and terribly wrong./i)).toBeInTheDocument();
    });

    it('should show default message for when something goes wrong', async () => {
        mock.onPost('https://dummy-api.example.com/api/organisation').replyOnce(404, {});
        RTKRender(<CompanyInfo />);
        const PhNumber = screen.getByPlaceholderText<HTMLInputElement>('Contact Number');
        const companySize = screen.getByTestId<HTMLInputElement>('companySize');
        const companyName = screen.getByTestId<HTMLInputElement>('companyName');
        const submitButton = screen.getByText('Submit');
        fireEvent.change(PhNumber, { target: { value: '+919873465628' } });
        fireEvent.change(companyName, { target: { value: 'Company1' } });
        fireEvent.change(companySize, { target: { value: 10 } });
        expect(submitButton).toBeEnabled();
        fireEvent.click(submitButton);
        expect(await screen.findByText(/Something went wrong./i)).toBeInTheDocument();
    });
});
