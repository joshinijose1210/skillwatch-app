import { RTKRender, cleanup, fireEvent, act, screen, waitFor } from '@utils/test-utils';
import { TeamManagement } from '.';
import { teamsMockData } from '@mocks/teams';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

beforeAll(() => {
    mock.onGet(teamsMockData.departments.get.url).reply(teamsMockData.departments.get.responseCode, teamsMockData.departments.get.someData);
});

beforeEach(mock.reset);

afterEach(cleanup);

jest.useFakeTimers();

describe('TeamManagement component', () => {
    it('should take snapshot', () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        const { container } = RTKRender(<TeamManagement />);
        expect(container).toMatchSnapshot();
        expect(screen.getByText('Teams')).toBeInTheDocument();
    });

    it('should Add modal works properly', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        RTKRender(<TeamManagement />);

        fireEvent.click(screen.getByText('Add Team'));
        await screen.findByTitle('medly-modal-close-icon');
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
    });

    it('should show examples when Engineering department is selected', async () => {
        const { someData, responseCode, url } = teamsMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        RTKRender(<TeamManagement />);

        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Engineering'));

        await screen.findByText('Example: Backend, Frontend, Mobile, DevOps, etc.');
    });

    it('should show examples when Human Resource department is selected', async () => {
        const { someData, responseCode, url } = teamsMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        RTKRender(<TeamManagement />);

        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Human Resource'));

        await screen.findByText(/Example: People Experience, Recruitment, Payroll, Employee Onboarding, etc./i);
    });

    it('should add new team when correct data is entered', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        mock.onPost('https://dummy-api.example.com/api/teams/').replyOnce(200, { addedTeam: ['test team'] });
        RTKRender(<TeamManagement />);

        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });
        const saveBtn = screen.getByTestId('saveBtn');
        expect(saveBtn).toBeDisabled();
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Test Dep1'));
        fireEvent.change(screen.getByTestId('teamInput'), { target: { value: 'test team' } });
        expect(saveBtn).toBeEnabled();
        await waitFor(() => expect(saveBtn).toBeEnabled());
        fireEvent.click(saveBtn);
        await screen.findByText('Team test team added successfully');
    });

    it('should not add new team when incorrect data is entered', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        mock.onPost('https://dummy-api.example.com/api/teams/').replyOnce(200, { existingTeam: ['uat'] });
        RTKRender(<TeamManagement />);

        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });
        const saveBtn = screen.getByTestId('saveBtn');
        expect(saveBtn).toBeDisabled();
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Test Dep1'));
        fireEvent.change(screen.getByTestId('teamInput'), { target: { value: 'uat' } });
        expect(saveBtn).toBeEnabled();
        await waitFor(() => expect(saveBtn).toBeEnabled());
        fireEvent.click(saveBtn);
        await screen.findByText('Team uat already exists');
    });

    it('should edit existing team when correct data is entered', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        mock.onPut('https://dummy-api.example.com/api/teams/227').replyOnce(200, {});
        RTKRender(<TeamManagement />);

        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('Edit')[0]);
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });
        const saveBtn = screen.getByTestId('updateBtn');
        expect(saveBtn).toBeDisabled();
        fireEvent.change(screen.getByTestId('teamInput'), { target: { value: 'uat-test' } });
        expect(saveBtn).toBeEnabled();
        await waitFor(() => expect(saveBtn).toBeEnabled());
        fireEvent.click(saveBtn);
        await screen.findByText('Team updated successfully');
    });

    it('should get warning toggle team status', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        mock.onPut('https://dummy-api.example.com/api/teams/227').replyOnce(200, {});
        RTKRender(<TeamManagement />);

        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('Edit')[0]);
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });
        const saveBtn = screen.getByTestId('updateBtn');
        expect(saveBtn).toBeDisabled();
        fireEvent.click(screen.getByTestId('teamToggle'));
        expect(
            screen.getByText('When the team status is changed to inactive, designation linked with the team will also be deactivated.')
        ).toBeInTheDocument();
        expect(saveBtn).toBeEnabled();
        await waitFor(() => expect(saveBtn).toBeEnabled());
        fireEvent.click(saveBtn);
        await screen.findByText('Team updated successfully');
    });

    it('should search and clear search functinality work properly', async () => {
        const { someData, searchData } = teamsMockData.teams.get;
        mock.onGet().reply(config => {
            const { url } = config;
            if (url?.includes('D3team')) {
                return searchData;
            }
            return [200, someData];
        });
        RTKRender(<TeamManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('uat')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('teamSearch'), { target: { value: 'D3team' } });
        act(() => {
            jest.advanceTimersByTime(500);
            expect(screen.getByTestId('teamSearch')).toHaveValue('D3team');
        });
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        await waitFor(() => expect(screen.getByTitle('D3team').closest('td')).toBeInTheDocument(), { timeout: 3000 });
        expect(screen.queryByText('uat')).not.toBeInTheDocument();
        const close = screen.getByTitle('close icon');
        expect(close).toBeInTheDocument();
        fireEvent.click(close);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('uat')).toBeInTheDocument();
    });

    it('should pagination work properly', async () => {
        const { someData, allData } = teamsMockData.teams.get;
        mock.onGet().reply(config => {
            const { url } = config;
            if (url?.includes('page=2')) {
                return [200, someData];
            }
            if (config.url?.includes('teams/?page=undefined')) {
                return [200, allData];
            }
            return [200, {}];
        });
        RTKRender(<TeamManagement />);

        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByTitle('uat-1')).toBeInTheDocument();
        fireEvent.click(screen.getByText(2));
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByTitle('uat')).toBeInTheDocument();
        expect(screen.queryByTitle('uat-1')).not.toBeInTheDocument();
    });

    it('should add new team to chip list on Enter or comma', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        RTKRender(<TeamManagement />);
        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Test Dep1'));

        const teamInput = screen.getByTestId('teamInput');
        fireEvent.change(teamInput, { target: { value: 'My Team 1' } });
        fireEvent.keyDown(teamInput, { key: 'Enter', code: 'Enter' });
        expect(screen.getByText('My Team 1')).toBeInTheDocument();

        fireEvent.change(teamInput, { target: { value: 'My Team 2' } });
        fireEvent.keyDown(teamInput, { key: ',', code: 'Comma' });
        expect(screen.getByText('My Team 2')).toBeInTheDocument();
    });

    it('should debounce search input and update list', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).reply(() => [responseCode, someData]);
        RTKRender(<TeamManagement />);
        await waitFor(() => screen.findAllByText('Edit'));

        const searchInput = screen.getByTestId('teamSearch');
        fireEvent.change(searchInput, { target: { value: 'Backend' } });
        act(() => {
            jest.advanceTimersByTime(500);
        });
        expect(searchInput).toHaveValue('Backend');
    });

    it('should show correct example text for Engineering and HR departments', async () => {
        const { someData, responseCode, url } = teamsMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        RTKRender(<TeamManagement />);
        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Engineering'));
        expect(await screen.findByText(/Frontend, Mobile, DevOps/i)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Human Resource'));
        expect(await screen.findByText(/Recruitment, Payroll/i)).toBeInTheDocument();
    });

    it('should show success toast on successful team addition', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        mock.onPost('https://dummy-api.example.com/api/teams/').replyOnce(200, { addedTeam: ['toast-team'], existingTeam: [] });
        RTKRender(<TeamManagement />);

        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Test Dep1'));
        const input = screen.getByTestId('teamInput');
        fireEvent.change(input, { target: { value: 'toast-team' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        const saveBtn = screen.getByTestId('saveBtn');
        fireEvent.click(saveBtn);

        await screen.findByText('1 team added successfully');
    });

    it('should show success toast when new teams are added and no existing teams conflict', async () => {
        const { someData: teamData, responseCode: teamCode, url: teamUrl } = teamsMockData.teams.get;
        const { someData: deptData, responseCode: deptCode, url: deptUrl } = teamsMockData.departments.get;

        mock.onGet(teamUrl).replyOnce(teamCode, teamData);
        mock.onGet(deptUrl).replyOnce(deptCode, deptData);

        mock.onPost('https://dummy-api.example.com/api/teams/').replyOnce(200, {
            addedTeam: ['Frontend'],
            existingTeam: []
        });

        localStorage.setItem('toast', 'true');

        RTKRender(<TeamManagement />);

        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Test Dep1'));

        const input = screen.getByTestId('teamInput');
        fireEvent.change(input, { target: { value: 'Frontend' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        const saveBtn = screen.getByTestId('saveBtn');
        fireEvent.click(saveBtn);
        await screen.findByText('1 team added successfully');

        expect(localStorage.getItem('toast')).toBeNull();
    });

    it('should show success toast when both new and existing teams are returned', async () => {
        const { someData: teamData, responseCode: teamCode, url: teamUrl } = teamsMockData.teams.get;
        const { someData: deptData, responseCode: deptCode, url: deptUrl } = teamsMockData.departments.get;

        mock.onGet(teamUrl).replyOnce(teamCode, teamData);
        mock.onGet(deptUrl).replyOnce(deptCode, deptData);

        mock.onPost('https://dummy-api.example.com/api/teams/').replyOnce(200, {
            addedTeam: ['team-a'],
            existingTeam: ['team-b']
        });

        localStorage.setItem('toast', 'true');

        RTKRender(<TeamManagement />);

        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Test Dep1'));

        const input = screen.getByTestId('teamInput');
        fireEvent.change(input, { target: { value: 'team-a' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        const saveBtn = screen.getByTestId('saveBtn');
        fireEvent.click(saveBtn);

        await screen.findByText('1 team added successfully');
    });

    it('should set errorText if edit team fails', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        mock.onPut('https://dummy-api.example.com/api/teams/227').replyOnce(500, {
            data: { errorMessage: 'Something went wrong' }
        });
        RTKRender(<TeamManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('Edit')[0]);
        await waitFor(() => screen.findByTestId('addTeamModal'));
        fireEvent.change(screen.getByTestId('teamInput'), { target: { value: 'uat-test' } });
        fireEvent.click(screen.getByTestId('updateBtn'));
        await screen.findByText('Something went wrong');
    });

    it('should show error text when response has existingTeam', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);
        mock.onPost('https://dummy-api.example.com/api/teams/').replyOnce(200, {
            existingTeam: ['uat']
        });
        RTKRender(<TeamManagement />);
        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Test Dep1'));
        fireEvent.change(screen.getByTestId('teamInput'), { target: { value: 'uat' } });
        fireEvent.keyDown(screen.getByTestId('teamInput'), { key: 'Enter', code: 'Enter' });

        const saveBtn = screen.getByTestId('saveBtn');
        fireEvent.click(saveBtn);

        await screen.findByText('These team/s already exists:');
        expect(screen.getByText('uat')).toBeInTheDocument();
    });

    it('should clear error text when last chip is removed', async () => {
        const { someData: teamData, responseCode: teamCode, url: teamUrl } = teamsMockData.teams.get;
        const { someData: deptData, responseCode: deptCode, url: deptUrl } = teamsMockData.departments.get;

        mock.onGet(teamUrl).replyOnce(teamCode, teamData);
        mock.onGet(deptUrl).replyOnce(deptCode, deptData);

        RTKRender(<TeamManagement />);

        fireEvent.click(screen.getByText('Add Team'));
        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });

        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Test Dep1'));

        const input = screen.getByTestId('teamInput');
        fireEvent.change(input, { target: { value: 'duplicate-team' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        // Simulate existing team to trigger error
        mock.onPost('https://dummy-api.example.com/api/teams/').replyOnce(200, {
            existingTeam: ['duplicate-team'],
            addedTeam: []
        });

        const saveBtn = screen.getByTestId('saveBtn');
        fireEvent.click(saveBtn);
        await screen.findByText('These team/s already exists:');

        const deleteIcon = document.querySelector('svg[title="duplicate-team chip clear icon"]') as SVGElement;
        fireEvent.click(deleteIcon);

        expect(screen.queryByText('These team/s already exists:')).not.toBeInTheDocument();
    });

    it('should disable input when in View mode or team is Org Admin', async () => {
        const { someData, responseCode, url } = teamsMockData.teams.get;
        mock.onGet(url).replyOnce(responseCode, someData);

        RTKRender(<TeamManagement />, {
            initialEntries: [
                {
                    pathname: '/team-management',
                    state: {
                        action: 'View',
                        departmentId: 1,
                        teamName: 'Org Admin',
                        teamStatus: true
                    }
                }
            ]
        });

        await waitFor(() => screen.findByTestId('addTeamModal'), { timeout: 3000 });
        const input = screen.getByTestId('teamInput');
        expect(input).toBeDisabled();
    });
});
