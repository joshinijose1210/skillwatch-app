import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import DeactivateManager from '.';
import MockAdapter from 'axios-mock-adapter';
import * as reactRouterDom from 'react-router-dom';
import { addEmployeeMockData } from '@mocks/addEmployee';
import { apiInstance } from '@utils';
import { Loader } from '@components';
const mock = new MockAdapter(apiInstance);

const mockNavigate = jest.fn();

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigation: mockNavigate
}));

beforeEach(() => {
    useLocationMock.mockReturnValue({ ...addEmployeeMockData.LocationMockData, state: addEmployeeMockData.navigationRoleState.state });
    mock.reset();
});

afterEach(cleanup);

describe('Deactive Manager component', () => {
    it('should take snapshot', () => {
        useLocationMock.mockReturnValue({
            ...addEmployeeMockData.LocationMockData,
            state: { isLoading: false }
        });
        const { container } = RTKRender(<DeactivateManager />);
        expect(container).toMatchSnapshot();
    });

    it('should show loader properly when page is loading', () => {
        useLocationMock.mockReturnValue({
            ...addEmployeeMockData.LocationMockData,
            state: { isLoading: true }
        });
        const { container } = RTKRender(<DeactivateManager />);
        const { container: loaderContainer } = RTKRender(<Loader />);
        expect(container.innerHTML).toMatch(loaderContainer.innerHTML);
    });

    it('should render properly', async () => {
        const { url, someData } = addEmployeeMockData.managers.get;
        mock.onGet(url).replyOnce(200, someData);
        RTKRender(<DeactivateManager />);
        const deactiveManager = await screen.findByTestId<HTMLInputElement>('deactiveManager');
        expect(screen.getByText('Change Role')).toBeInTheDocument();
        expect(screen.getByText('A S (SR006)')).toBeInTheDocument();
        expect(screen.getByTestId('saveBtn')).toBeDisabled();
        expect(deactiveManager).toBeInTheDocument();
        expect(deactiveManager.value).toBe('R P (SR002)');
    });

    it('should change manager properly in change role', async () => {
        const { url, someData } = addEmployeeMockData.managers.get;
        mock.onGet(url).replyOnce(200, someData);
        mock.onPut().replyOnce(200, { refresh_token: '' });
        RTKRender(<DeactivateManager />);
        expect(screen.getByText('Change Role')).toBeInTheDocument();
        const managerDropDown = screen.getByTestId('deactiveManager');
        const saveBtn = screen.getByTestId('saveBtn');
        await waitFor(() => expect(managerDropDown).toHaveValue('R P (SR002)'), { timeout: 3000 });
        expect(saveBtn).toBeDisabled();
        fireEvent.change(managerDropDown, { target: { value: 'R S (SR002)' } });
        await waitFor(() => expect(saveBtn).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(saveBtn);
        expect(await screen.findByText('Employee updated successfully')).toBeInTheDocument();
    });

    it('should give an error when api fails', async () => {
        const { url, someData } = addEmployeeMockData.managers.get;
        mock.onGet(url).replyOnce(200, someData);
        mock.onPut('https://dummy-api.example.com/api/employees/').replyOnce(400, { errorMessage: 'Something went wrong' });
        mock.onPut('https://dummy-api.example.com/api/employees/2').replyOnce(400, { errorMessage: 'Something went wrong' });
        RTKRender(<DeactivateManager />);
        expect(screen.getByText('Change Role')).toBeInTheDocument();

        const managerDropDown = screen.getByTestId('deactiveManager');
        const saveBtn = screen.getByTestId('saveBtn');
        await waitFor(() => expect(managerDropDown).toHaveValue('R P (SR002)'), { timeout: 3000 });
        expect(saveBtn).toBeDisabled();
        fireEvent.change(managerDropDown, { target: { value: 'R S (SR002)' } });
        await waitFor(() => expect(saveBtn).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(saveBtn);
        expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    });

    it('should test for change manager in deactive manager', async () => {
        const { url, someData } = addEmployeeMockData.managers.get;
        mock.onGet(url).replyOnce(200, someData);
        mock.onPut().replyOnce(200, { refresh_token: '' });
        useLocationMock.mockReturnValue({
            ...addEmployeeMockData.LocationMockData,
            state: { ...addEmployeeMockData.navigationRoleState.state, heading: 'Change Manager' }
        });
        RTKRender(<DeactivateManager />);
        expect(screen.getByText('Change Manager')).toBeInTheDocument();
        const managerDropDown = screen.getByTestId('deactiveManager');
        const saveBtn = screen.getByTestId('saveBtn');
        await waitFor(() => expect(managerDropDown).toHaveValue('R P (SR002)'), { timeout: 3000 });
        expect(saveBtn).toBeDisabled();
        fireEvent.change(managerDropDown, { target: { value: 'R S (SR002)' } });
        await waitFor(() => expect(saveBtn).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(saveBtn);
        expect((await screen.findAllByText('Employee updated successfully'))[0]).toBeInTheDocument();
    });
});
