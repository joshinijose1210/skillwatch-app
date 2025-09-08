import { routeConstants } from '@constants';
import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import { RoleForm } from './RoleForm';
import { apiInstance } from '@utils';
import MockAdapter from 'axios-mock-adapter';
import * as reactRouterDom from 'react-router-dom';
import { rolesMockData } from '@mocks/rolesAndPermission';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    useParams: jest.fn()
}));

beforeAll(() => {
    mock.onGet(rolesMockData.module.url).reply(rolesMockData.roles.get.responseCode, rolesMockData.module.data);
});

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
const useParamMock = jest.spyOn(reactRouterDom, 'useParams');
let pathname = `/roles-&-permissions/1/add-role-&-permissions`;
let state = null;

beforeEach(() => {
    state = { ...rolesMockData.tempState, modulePermission: undefined, action: 'add' };
    useLocationMock.mockReturnValue({
        ...rolesMockData.LocationMockData,
        pathname,
        state
    });
    useParamMock.mockReturnValue({ ActivePage: '1' });
});

afterEach(() => {
    cleanup();
});

jest.useFakeTimers();

describe('Roles And Permissions Form Add Page', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<RoleForm />);
        expect(container).toMatchSnapshot();
    });

    it('should back button visible and navigate', async () => {
        state = { action: 'add', from: 'onboardingFlow' };
        useLocationMock.mockReturnValue({
            ...rolesMockData.LocationMockData,
            pathname,
            state
        });
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).reply(responseCode, allData);
        RTKRender(<RoleForm />);
        expect(await screen.findByText(/Go Back/i)).toBeInTheDocument();
        const backBtn = screen.getByText(/Go Back/i);
        fireEvent.click(backBtn);

        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.firstRoleRedirect}/1`);
    });

    it('should get API and user interaction work properly', async () => {
        const { container } = RTKRender(<RoleForm />);
        expect(await screen.findByText('Add Role & Permissions')).toBeInTheDocument();
        const roleNameInput = screen.getByTestId('role-name');
        const viewOption = container.querySelectorAll('input[type="checkbox"]')?.[0];
        const activeToggle = container.querySelector('input[id="Active : "]');
        fireEvent.change(roleNameInput, { target: { value: 'demoTestRole!$' } });
        expect(await screen.findByText('Special characters are not allowed.')).toBeInTheDocument();
        fireEvent.click(viewOption);
        expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
        fireEvent.change(roleNameInput, { target: { value: 'demoTestRole' } });
        activeToggle && fireEvent.click(activeToggle);
    });

    it('should check if URL is protected and redirecting to root', async () => {
        state = null;
        useLocationMock.mockReturnValue({
            ...rolesMockData.LocationMockData,
            pathname,
            state
        });
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).reply(responseCode, allData);
        RTKRender(<RoleForm />);
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.root}`, {
                state: {
                    error: true,
                    header: 'Unauthorized Access',
                    message: 'You do not have access to the page, please contact system administrator/HR.'
                }
            });
        });
    });

    it('should add functionality work properly', async () => {
        const { url } = rolesMockData.roles.post;
        mock.onPost(url).reply(200, {});
        const { container } = RTKRender(<RoleForm />);
        expect(await screen.findByText('Add Role & Permissions')).toBeInTheDocument();
        const roleNameInput = screen.getByTestId('role-name');
        const saveBtn = screen.getByText('Save');
        expect(saveBtn).toBeEnabled();
        const viewOption = container.querySelectorAll('input[type="checkbox"]')?.[0];
        fireEvent.change(roleNameInput, { target: { value: 'demoTestRole2' } });
        fireEvent.click(viewOption);
        expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
        expect(await screen.findByText('Save')).toBeEnabled();
        fireEvent.click(saveBtn);
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`/roles-&-permissions/1/add-role-&-permissions`, {
                state: {
                    action: 'add',
                    edit: false,
                    id: 87,
                    moduleId: 5,
                    modulePermission: undefined,
                    roleName: 'demoTestRole',
                    status: false,
                    tempPermission: undefined,
                    view: true
                }
            });
        });
    });

    it('should add API error handled properly', async () => {
        const { url } = rolesMockData.roles.post;
        mock.onPost(url).reply(400, { errorMessage: 'Something went wrong' });
        const { container } = RTKRender(<RoleForm />);
        expect(await screen.findByText('Add Role & Permissions')).toBeInTheDocument();
        const roleNameInput = screen.getByTestId('role-name');
        const saveBtn = screen.getByText('Save');
        expect(saveBtn).toBeEnabled();
        const viewOption = container.querySelectorAll('input[type="checkbox"]')?.[0];
        fireEvent.change(roleNameInput, { target: { value: 'demoTestRole2' } });
        fireEvent.click(viewOption);
        expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
        expect(await screen.findByText('Save')).toBeEnabled();
        fireEvent.click(saveBtn);
        expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    });
});

describe('Roles And Permissions Form Edit Page', () => {
    it('should render properly', async () => {
        pathname = `/roles-&-permissions/1/edit-role-&-permissions`;
        state = { ...rolesMockData.tempState, status: true };
        useLocationMock.mockReturnValue({
            ...rolesMockData.LocationMockData,
            pathname,
            state
        });
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).reply(responseCode, allData);
        mock.onPut(rolesMockData.roles.patch.url).reply(responseCode, {});
        const { container } = RTKRender(<RoleForm />);
        const viewOption = container.querySelectorAll('input[type="checkbox"]')?.[0];
        expect(await screen.findByText('Edit Role & Permissions')).toBeInTheDocument();
        fireEvent.click(viewOption);
        await waitFor(
            () => {
                expect(viewOption).not.toBeChecked();
            },
            { timeout: 4000 }
        );
    });

    it('should update functionality work', async () => {
        pathname = `/roles-&-permissions/1/edit-role-&-permissions`;
        state = { ...rolesMockData.tempState };
        useLocationMock.mockReturnValue({
            ...rolesMockData.LocationMockData,
            pathname,
            state
        });
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onPatch(rolesMockData.roles.patch.url).reply(responseCode, {});
        mock.onGet(url).reply(responseCode, allData);
        const { container } = RTKRender(<RoleForm />);
        expect(await screen.findByText('Edit Role & Permissions')).toBeInTheDocument();
        const viewOption = container.querySelectorAll('input[type="checkbox"]')?.[0];
        const roleNameInput = screen.getByTestId('role-name');
        const updateBtn = screen.getByText('Update');
        fireEvent.change(roleNameInput, { target: { value: 'demoTestRole' } });
        expect(roleNameInput).toHaveValue('demoTestRole');
        fireEvent.click(viewOption);
        expect(viewOption).toBeChecked();
        expect(await screen.findByText('Update')).toBeEnabled();
        fireEvent.click(updateBtn);
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(`/roles-&-permissions/1/edit-role-&-permissions`, {
                state: {
                    action: 'Edit',
                    edit: false,
                    id: 87,
                    moduleId: 5,
                    modulePermission: [{ edit: false, moduleId: 5, moduleName: 'Designations', view: true }],
                    roleName: 'demoTestRole',
                    status: false,
                    tempPermission: undefined,
                    view: true
                }
            });
        });
    });

    it('should update API error handled properly', async () => {
        pathname = `/roles-&-permissions/1/edit-role-&-permissions`;
        state = { ...rolesMockData.tempState, status: true };
        useLocationMock.mockReturnValue({
            ...rolesMockData.LocationMockData,
            pathname,
            state
        });
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onPatch(rolesMockData.roles.patch.url).reply(400, { errorMessage: 'Something went wrong' });
        mock.onGet(url).reply(responseCode, allData);
        const { container } = RTKRender(<RoleForm />);
        expect(await screen.findByText('Edit Role & Permissions')).toBeInTheDocument();
        const viewOption = container.querySelectorAll('input[type="checkbox"]')?.[0];
        const roleNameInput = screen.getByTestId('role-name');
        const updateBtn = screen.getByText('Update');
        fireEvent.change(roleNameInput, { target: { value: 'demoTestRole' } });
        expect(roleNameInput).toHaveValue('demoTestRole');
        fireEvent.click(viewOption);
        expect(viewOption).toBeChecked();
        expect(await screen.findByText('Update')).toBeEnabled();
        fireEvent.click(updateBtn);
        expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    });
});

describe('Roles And Permissions Form View Page', () => {
    it('should render properly', async () => {
        pathname = `/roles-&-permissions/1/view-role-&-permissions`;
        state = { ...rolesMockData.tempState, action: 'View' };
        useLocationMock.mockReturnValue({
            ...rolesMockData.LocationMockData,
            pathname,
            state
        });
        const { url, responseCode, allData } = rolesMockData.roles.get;
        mock.onGet(url).reply(responseCode, allData);
        RTKRender(<RoleForm />);
        expect(await screen.findByText('View Role & Permissions')).toBeInTheDocument();
    });
});
