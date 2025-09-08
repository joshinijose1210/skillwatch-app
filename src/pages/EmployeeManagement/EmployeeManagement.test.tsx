import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { EmployeeManagement } from '.';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { URLs, employeeMockData } from '@mocks/employee';
import { routeConstants } from '@constants';

const mock = new MockAdapter(apiInstance);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate
}));

beforeAll(() => {
    mock.onGet(employeeMockData.departments.get.url).reply(
        employeeMockData.departments.get.responseCode,
        employeeMockData.departments.get.someData
    );
    mock.onGet(employeeMockData.teams.get.url).reply(employeeMockData.teams.get.responseCode, employeeMockData.teams.get.someData);
    mock.onGet(employeeMockData.roles.get.url).reply(employeeMockData.roles.get.responseCode, employeeMockData.roles.get.someData);
    mock.onGet(employeeMockData.designations.get.url).reply(
        employeeMockData.designations.get.responseCode,
        employeeMockData.designations.get.someData
    );
});

jest.useFakeTimers();

beforeEach(mock.reset);

afterEach(cleanup);

describe('Employee Management component', () => {
    it('should take snapshot', () => {
        const { someData, responseCode, url } = employeeMockData.employee.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        const { container } = RTKRender(<EmployeeManagement />);
        expect(container).toMatchSnapshot();
        expect(screen.getByText('Employees')).toBeInTheDocument();
    });

    it('should Add Employee redirection work properly', async () => {
        RTKRender(<EmployeeManagement />);
        fireEvent.click(screen.getByText('Add Employee'));
        expect(mockNavigate).toBeCalledWith(`${routeConstants.employeeManagement}/${1}/add-employee`, { state: { action: 'add' } });
    });

    it('should bulk redirection work properly', async () => {
        RTKRender(<EmployeeManagement />);
        fireEvent.click(screen.getByText('Bulk Import'));
        expect(mockNavigate).toBeCalledWith(`${routeConstants.employeeManagement}/${1}/bulk-import`, {
            state: { action: 'add', bulkImportType: 'employees' }
        });
    });

    it('department, teams, designation dropdown should be working properly', async () => {
        const { someData, allData, url: employeeUrl } = employeeMockData.employee.get;
        const { someData: department, url } = employeeMockData.departments.get;

        mock.onGet(url).replyOnce(200, department);
        mock.onGet(employeeMockData.teams.get.url).reply(employeeMockData.teams.get.responseCode, employeeMockData.teams.get.someData);
        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1').replyOnce(
            200,
            employeeMockData.designations.get.someData
        );
        mock.onGet(employeeMockData.roles.get.url).replyOnce(200, employeeMockData.roles.get.someData);
        mock.onGet(employeeUrl)
            .replyOnce(200, allData)
            .onGet(URLs.empDepUrl)
            .replyOnce(200, someData)
            .onGet(URLs.empDepTeamUrl)
            .replyOnce(200, someData)
            .onGet(URLs.empDepTeamDesUrl)
            .replyOnce(200, someData);
        RTKRender(<EmployeeManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User Test')).toBeInTheDocument();
        expect(screen.getByText('User3 Test')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getAllByText('Dep1')[0]);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User Test')).toBeInTheDocument();
        expect(screen.queryByText('User3 Test')).not.toBeInTheDocument();
        fireEvent.click(screen.getByTestId('teamDropdown'));
        fireEvent.click(screen.getByText('Team1 (Dep1)'));
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User Test')).toBeInTheDocument();
        expect(screen.queryByText('User3 Test')).not.toBeInTheDocument();
        fireEvent.click(screen.getByTestId('designationDropdown'));
        fireEvent.click(screen.getByText('SDE (Team1)'));
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User Test')).toBeInTheDocument();
        expect(screen.queryByText('User3 Test')).not.toBeInTheDocument();
        fireEvent.click(screen.getByTestId('rolesDropdown'));
        fireEvent.click(screen.getByText('Org Admin'));
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User Test')).toBeInTheDocument();
        expect(screen.queryByText('User3 Test')).not.toBeInTheDocument();
    });

    it('should search and clear search functinality work properly', async () => {
        const { someData, searchData, responseCode, url } = employeeMockData.employee.get;
        mock.onGet(url).reply(responseCode, someData).onGet(URLs.searchUrl).replyOnce(200, searchData);
        RTKRender(<EmployeeManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User Test')).toBeInTheDocument();
        expect(screen.getByText('User2 Test')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('employeeSearch'), { target: { value: 'User Test' } });
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User Test').closest('td')).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText('User2 Test')).not.toBeInTheDocument(), { timeout: 3000 });
        const close = screen.getByTitle('close icon');
        expect(close).toBeInTheDocument();
        fireEvent.click(close);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User2 Test')).toBeInTheDocument();
    });

    it('should pagination work properly', async () => {
        const { allData, someData, responseCode, url } = employeeMockData.employee.get;
        mock.onGet(url).reply(responseCode, allData).onGet(URLs.page2Url).replyOnce(200, someData);
        RTKRender(<EmployeeManagement />);

        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User3 Test')).toBeInTheDocument();
        fireEvent.click(screen.getByText(2));
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User Test')).toBeInTheDocument();
        expect(screen.queryByText('User3 Text')).not.toBeInTheDocument();
    });

    it('should sorting work properly', async () => {
        const { allData, someData, responseCode, url } = employeeMockData.employee.get;
        mock.onGet(url).reply(responseCode, allData).onGet(URLs.sortUrl).replyOnce(200, someData);
        RTKRender(<EmployeeManagement />);

        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User3 Test')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Employee ID'));
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('User Test')).toBeInTheDocument();
        expect(screen.queryByText('User3 Text')).not.toBeInTheDocument();
    });
});
