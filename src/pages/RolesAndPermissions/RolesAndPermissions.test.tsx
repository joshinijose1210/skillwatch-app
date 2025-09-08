import { routeConstants } from '@constants';
import { rolesMockData } from '@mocks/rolesAndPermission';
import { apiInstance } from '@utils';
import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import * as reactRouterDom from 'react-router-dom';
import { RolesAndPermissions } from './RolesAndPermissions';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeAll(() => {
    mock.onGet(rolesMockData.roles.get.url).reply(rolesMockData.roles.get.responseCode, rolesMockData.roles.get.allData);
});

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

beforeEach(() => {
    useLocationMock.mockReturnValue(rolesMockData.LocationMockData);
});

afterEach(() => {
    cleanup();
});

jest.useFakeTimers();

describe('Roles And Permissions management', () => {
    it('should render properly', () => {
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).reply(responseCode, allData);
        const { container } = RTKRender(<RolesAndPermissions />);
        expect(container).toMatchSnapshot();
    });

    it('should open Add Roles And Permissions modal when clicked on Add Button', async () => {
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).reply(responseCode, allData);
        RTKRender(<RolesAndPermissions />);
        fireEvent.click(screen.getByText('Add Role & Permissions'));
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.rolesAndPermissions}/undefined/add-role-&-permissions`, {
                state: { action: 'add' }
            });
        });
    });

    it('should return result when search input is handled', async () => {
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).reply(responseCode, allData);
        RTKRender(<RolesAndPermissions />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByTitle('test12321')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('searchBar'), { target: { value: 'demoTestRole' } });
        act(() => {
            jest.advanceTimersByTime(500);
            expect(screen.getByTestId('searchBar')).toHaveValue('demoTestRole');
        });
        await waitFor(() => screen.findAllByText('Edit'));
        expect(screen.getByTestId('searchBar')).toHaveValue('demoTestRole');
        await waitFor(() => screen.findByTitle('demoTestRole'));
        expect(screen.queryByTitle('test11')).not.toBeInTheDocument();
    });

    it('pagination should work properly', async () => {
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).replyOnce(responseCode, allData).onGet(url).replyOnce(responseCode, allData);
        RTKRender(<RolesAndPermissions />);
        await waitFor(() => screen.findAllByText('Edit'));
        expect(screen.getByTitle('demoROles123')).toBeInTheDocument();
        fireEvent.click(screen.getByText(2));
        await screen.findByTitle('demoTestRole');
        expect(screen.queryByTitle('demoROles10023')).not.toBeInTheDocument();
    });

    it('should clear the search text on click', async () => {
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).replyOnce(responseCode, allData).onGet(url).replyOnce(responseCode, allData);
        RTKRender(<RolesAndPermissions />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByTitle('test12321')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('searchBar'), { target: { value: 'demoTestRole' } });
        fireEvent.click(screen.getByTitle('close icon'));
        fireEvent.change(screen.getByTestId('searchBar'), { target: { value: '' } });
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.rolesAndPermissions}/${1}`);
        });
    });

    it('should go back when clicked on Go Back Button', async () => {
        RTKRender(<RolesAndPermissions />);
        try {
            RTKRender(<RolesAndPermissions />);
            const goBackButton = screen.getByTestId('go-back');
            fireEvent.click(goBackButton);
            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith(routeConstants.firstRole);
            });
        } catch (error) {
            console.error("The 'Go Back' button was not found:", error);
        }
    });

    it('should return result when url first add-role-&-permissions', async () => {
        useLocationMock.mockReturnValue({
            ...rolesMockData.LocationMockData,
            pathname: `${routeConstants.firstRoleRedirect}/${1}/add-role-&-permissions`,
            state: { action: 'add', from: 'onboardingFlow' }
        });
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).reply(responseCode, allData);
        RTKRender(<RolesAndPermissions />);
        await screen.findByTestId('go-back');
        expect(screen.getByTestId('go-back')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('go-back'));
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.firstRole}`);
        });
    });

    it('should navigate to first time roles & permissions setup page', async () => {
        useLocationMock.mockReturnValue({
            ...rolesMockData.LocationMockData,
            pathname: `${routeConstants.firstRoleRedirect}/${1}/add-role-&-permissions`,
            state: { action: 'add', from: 'onboardingFlow' }
        });
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).reply(responseCode, allData);
        RTKRender(<RolesAndPermissions />);
        await screen.findByText('Add Role & Permissions');
        fireEvent.click(screen.getByText('Add Role & Permissions'));
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.firstRoleRedirect}/1/add-role-&-permissions`, {
                state: { action: 'add', from: 'onboardingFlow' }
            });
        });
    });
});
