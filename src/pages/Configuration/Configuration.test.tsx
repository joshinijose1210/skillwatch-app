import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { Configuration } from './Configuration';
import { Loader } from '@components';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import * as reactRouterDom from 'react-router-dom';
import { ConfigurationMockData } from '@mocks/configuration';
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigation: mockNavigate
}));
const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

beforeEach(() => {
    useLocationMock.mockReturnValue(ConfigurationMockData.LocationData);
});

afterEach(() => {
    cleanup();
    mock.reset();
});

describe('Company configuration page', () => {
    it('should take snapshot of loader', () => {
        const { container } = RTKRender(<Configuration />);
        expect(container).toMatchSnapshot();
        const { container: loaderContainer } = RTKRender(<Loader />);
        expect(container.innerHTML).toMatch(loaderContainer.innerHTML);
    });

    it('should take snapshot of loaded page and show current company information without logo', async () => {
        mock.onGet('https://dummy-api.example.com/api/organisation/?id=1').replyOnce(200, {
            id: 1,
            name: 'CompanyOne',
            size: 20,
            contactNo: '+919182848361',
            activeUsers: 6,
            inactiveUsers: 0
        });
        mock.onGet('https://dummy-api.example.com/api/organisation/logo/?id=1').replyOnce(404, {});

        const { container } = RTKRender(<Configuration />, {
            initialState: ConfigurationMockData.initialState
        });

        const name = await screen.findByTestId('companyNameInput');

        expect(container).toMatchSnapshot();

        expect(name).toBeInTheDocument();
        expect(name).toHaveValue('CompanyOne');
    });

    it('should update company name, phonenumber, logo', async () => {
        mock.onGet('https://dummy-api.example.com/api/organisation/?id=1').replyOnce(200, {
            id: 1,
            name: 'CompanyOne',
            size: 20,
            contactNo: '+919182848361',
            activeUsers: 6,
            inactiveUsers: 0
        });
        mock.onGet('https://dummy-api.example.com/api/organisation/logo/?id=1').replyOnce(404, {});
        mock.onPut('https://dummy-api.example.com/api/organisation/1').replyOnce(200, {});
        mock.onGet('https://dummy-api.example.com/api/organisation/logo/?id=1').replyOnce(200, {
            logoUrl: 'https://jadbhasjkasjdbsad.cloudfront.net/1'
        });
        RTKRender(<Configuration />, {
            initialState: ConfigurationMockData.initialState
        });

        const mockLogo = new File([new Blob(['image'])], 'mockLogo.png', { type: 'image/png' });
        const logoUpload = await screen.findByText('Drop File or Upload File here.');
        const companyName = await screen.findByTestId('companyNameInput');
        const companyNumber = await screen.findByPlaceholderText('Contact Number');
        expect(companyName).toBeInTheDocument();
        fireEvent.change(companyName, { target: { value: 'CompanyTwo' } });
        fireEvent.change(companyNumber, { target: { value: '+919876543210' } });
        const save = screen.getByTestId('saveButton');
        const dropLogo = screen.getByTestId('dropLogo');

        fireEvent.click(logoUpload);
        expect(dropLogo).toBeInTheDocument();
        expect(logoUpload).toBeInTheDocument();
        fireEvent.change(dropLogo, { target: { files: [mockLogo] } });
        await waitFor(() => expect(screen.queryByText('Drop File or Upload File here.')).not.toBeInTheDocument());
        expect(save).toBeEnabled();
        expect(await screen.findByText('mockLogo.png')).toBeInTheDocument();
        fireEvent.click(save);
    });

    it('should remove logo when clicked on removelogo button', async () => {
        mock.onGet('https://dummy-api.example.com/api/organisation/?id=1').replyOnce(200, {
            id: 1,
            name: 'CompanyOne',
            size: 20,
            contactNo: '+919182848361',
            activeUsers: 6,
            inactiveUsers: 0
        });
        mock.onGet('https://dummy-api.example.com/api/organisation/logo/?id=1').replyOnce(200, {
            logoUrl: 'https://dummy-url.cloudfront.net/21'
        });
        mock.onPatch('https://dummy-api.example.com/api/organisation/logo/1').replyOnce(200, {});
        RTKRender(<Configuration />, {
            initialState: ConfigurationMockData.initialState
        });
        const resetLogo = await screen.findByText('Remove Logo');
        fireEvent.click(resetLogo);
        expect(await screen.findByText('Are you sure you want to remove the logo?')).toBeInTheDocument();
        fireEvent.click(screen.getByText('No'));
        fireEvent.click(resetLogo);
        expect(await screen.findByText('Are you sure you want to remove the logo?')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Yes'));
        expect(await screen.findByText(/Logo removed successfully/i)).toBeInTheDocument();
    });

    it('should show error when unable to remove logo when clicked on removelogo button', async () => {
        mock.onGet('https://dummy-api.example.com/api/organisation/?id=1').replyOnce(200, {
            id: 1,
            name: 'CompanyOne',
            size: 20,
            contactNo: '+919182848361',
            activeUsers: 6,
            inactiveUsers: 0
        });
        mock.onGet('https://dummy-api.example.com/api/organisation/logo/?id=1').replyOnce(200, {
            logoUrl: 'https://dummy-url.cloudfront.net/21'
        });
        mock.onPatch('https://dummy-api.example.com/api/organisation/logo/1').replyOnce(404, {});
        RTKRender(<Configuration />, {
            initialState: ConfigurationMockData.initialState
        });
        const resetLogo = await screen.findByText('Remove Logo');
        fireEvent.click(resetLogo);
        expect(await screen.findByText('Are you sure you want to remove the logo?')).toBeInTheDocument();
        fireEvent.click(screen.getByText('No'));
        fireEvent.click(resetLogo);
        expect(await screen.findByText('Are you sure you want to remove the logo?')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Yes'));
        expect(await screen.findByText(/Something went wrong./i)).toBeInTheDocument();
    });
});
