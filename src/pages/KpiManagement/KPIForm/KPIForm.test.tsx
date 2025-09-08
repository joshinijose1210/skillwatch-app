import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { KPIForm } from '.';
import { teamsMockData } from '@mocks/teams';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import * as reactRouterDom from 'react-router-dom';
import { designationMockData } from '@mocks';
import { kpiMockData } from '@mocks/kpiManagement';
import { kraMockData } from '@mocks/kraManagement ';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    useParams: () => ({
        ActivePage: 1
    })
}));

beforeAll(() => {
    mock.onGet(kpiMockData.teams.get.url).reply(200, kpiMockData.teams.get.data);
    mock.onGet(teamsMockData.departments.get.url).reply(teamsMockData.departments.get.responseCode, teamsMockData.departments.get.someData);
});

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

afterEach(cleanup);

jest.useFakeTimers();

describe('KPI form component', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({ ...kpiMockData.LocationMockData, pathname: '/KPIs/undefined/add-KPI', state: { action: 'add' } });
        mock.reset();
    });

    it('should take snapshot', () => {
        const { container } = RTKRender(<KPIForm />);
        expect(container).toMatchSnapshot();
    });

    it('should render properly', async () => {
        RTKRender(<KPIForm />);
        expect(screen.getByText('Add KPI')).toBeInTheDocument();
        expect(screen.getByTestId('activeToggle')).toBeChecked();
        expect(screen.getByTestId('saveBtn')).toHaveTextContent('Save');
        fireEvent.click(screen.getByTestId('addField'));
        await screen.findByTestId('clearField-1');
        fireEvent.click(screen.getByTestId('clearField-1'));
        expect(screen.getByTestId('saveBtn')).toBeDisabled();
    });

    it('should show error when department is not linked with any team', async () => {
        mock.onGet(teamsMockData.departments.get.url).reply(200, teamsMockData.departments.get.someData);
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=117').reply(200, {
            unlinkedTeamsCount: 0,
            totalTeams: 0,
            teams: []
        });
        RTKRender(<KPIForm />);
        fireEvent.click(screen.getByTestId('departmentId-0'));
        await screen.findByText('NewDep');
        fireEvent.click(screen.getByText('NewDep'));
        expect(await screen.findByText('This department is not linked with any team.')).toBeInTheDocument();
    });

    it('should show error when team has no active designation', async () => {
        mock.onGet(teamsMockData.departments.get.url).reply(200, teamsMockData.departments.get.someData);
        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1&searchText=').reply(200, {
            totalDepartments: 2,
            departments: []
        });
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=117').reply(200, kpiMockData.teams.get.data);
        RTKRender(<KPIForm />);
        fireEvent.click(screen.getByTestId('departmentId-0'));
        await screen.findByText('NewDep');
        fireEvent.click(screen.getByText('NewDep'));
        await waitFor(() => expect(screen.getByTestId('teamId-0')).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(screen.getByTestId('teamId-0'));
        await screen.findByText('QA Team');
        fireEvent.click(screen.getByText('QA Team'));
        await waitFor(() => expect(screen.getByTestId('designationId-0')).toBeEnabled(), { timeout: 3000 });
        expect(screen.getByText('Selected team has no active designations.')).toBeInTheDocument();
    });

    it('should check for minimum character limit to be crossed', async () => {
        mock.onGet(teamsMockData.departments.get.url).reply(200, teamsMockData.departments.get.someData);
        const { container } = RTKRender(<KPIForm />);
        const editor = container.querySelector('[data-placeholder="Write description here..."]')?.getElementsByTagName('p');
        if (editor !== undefined) {
            fireEvent.change(editor[0], { target: { innerHTML: 'the limit should be of 50 characters' } });
        }
        expect(await screen.findByText('Please write more than 50 characters.')).toBeInTheDocument();
        expect(screen.getByTestId('saveBtn')).toBeDisabled();
    });

    it('should add new KPI when correct data is entered', async () => {
        mock.onGet(teamsMockData.departments.get.url).reply(200, teamsMockData.departments.get.someData);
        mock.onGet('https://dummy-api.example.com/api/kra/?organisationId=1').reply(200, kraMockData.kra.get.allData);
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=117').reply(200, kpiMockData.teams.get.data);
        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1&searchText=').reply(
            200,
            designationMockData.designations.get.data
        );
        mock.onPost('https://dummy-api.example.com/api/kpi/').reply(200, {});
        const { container } = RTKRender(<KPIForm />);
        const kraField = await screen.findByTestId('kraId');
        fireEvent.change(kraField, { target: { value: 'Results' } });
        fireEvent.change(screen.getByTestId('kpiTitle'), { target: { value: 'Test KPI' } });
        fireEvent.click(screen.getByTestId('departmentId-0'));
        await screen.findByText('NewDep');
        fireEvent.click(screen.getByText('NewDep'));
        await waitFor(() => expect(screen.getByTestId('teamId-0')).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(screen.getByTestId('teamId-0'));
        await screen.findByText('QA Team');
        fireEvent.click(screen.getByText('QA Team'));
        await waitFor(() => expect(screen.getByTestId('designationId-0')).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(screen.getByTestId('designationId-0'));
        await screen.findByText('ABC');
        fireEvent.click(screen.getByText('ABC'));
        const editor = container.querySelector('[data-placeholder="Write description here..."]')?.getElementsByTagName('p');
        if (editor !== undefined) {
            fireEvent.change(editor[0], {
                target: {
                    innerHTML:
                        'test kpi data is beaing added, this is only for testing purpose and need to add at least 50 characters to make it work.'
                }
            });
        }
        await waitFor(() => expect(screen.queryByText('Please write more than 50 characters.')).not.toBeInTheDocument(), { timeout: 3000 });
        expect(screen.getByTestId('saveBtn')).toBeEnabled();
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText('KPI added successfully')).toBeInTheDocument();
        expect(mockNavigate).toBeCalledWith('/KPIs/1');
    });

    it('should show error message when failed to add KPI', async () => {
        mock.onGet(teamsMockData.departments.get.url).reply(200, teamsMockData.departments.get.someData);
        mock.onGet('https://dummy-api.example.com/api/kra/?organisationId=1').reply(200, kraMockData.kra.get.allData);
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=117').reply(200, kpiMockData.teams.get.data);
        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1&searchText=').reply(
            200,
            designationMockData.designations.get.data
        );
        mock.onPost('https://dummy-api.example.com/api/kpi/').reply(500, {
            errorMessage: 'something didnt work'
        });
        const { container } = RTKRender(<KPIForm />);
        const kraField = await screen.findByTestId('kraId');
        fireEvent.change(kraField, { target: { value: 'Results' } });
        fireEvent.change(screen.getByTestId('kpiTitle'), { target: { value: 'Test KPI' } });
        fireEvent.click(screen.getByTestId('departmentId-0'));
        await screen.findByText('NewDep');
        fireEvent.click(screen.getByText('NewDep'));
        await waitFor(() => expect(screen.getByTestId('teamId-0')).toBeEnabled());
        fireEvent.click(screen.getByTestId('teamId-0'));
        await screen.findByText('QA Team');
        fireEvent.click(screen.getByText('QA Team'));
        await waitFor(() => expect(screen.getByTestId('designationId-0')).toBeEnabled());
        fireEvent.click(screen.getByTestId('designationId-0'));
        await screen.findByText('ABC');
        fireEvent.click(screen.getByText('ABC'));
        const editor = container.querySelector('[data-placeholder="Write description here..."]')?.getElementsByTagName('p');
        if (editor === undefined || editor?.length === 0) {
            throw new Error('Editor element or paragraph tag not found');
        }
        fireEvent.change(editor[0], {
            target: {
                textContent:
                    'test kpi data is being added, this is only for testing purpose and need to add at least 50 characters to make it work.'
            }
        });
        await waitFor(() => expect(screen.queryByText('Please write more than 50 characters.')).not.toBeInTheDocument());
        expect(screen.getByTestId('saveBtn')).toBeEnabled();
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText(/something didnt work/)).toBeInTheDocument();
    });
});

describe('Edit KPI component', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({
            ...kpiMockData.LocationMockData,
            pathname: '/KPIs/1/edit-KPI',
            state: kpiMockData.mockState.state
        });
        mock.reset();
    });

    it('should modal be working properly', async () => {
        mock.onGet(kpiMockData.departments.get.url).reply(200, kpiMockData.departments.get.someData);
        mock.onGet(kpiMockData.activeCycle.get.url).reply(200, kpiMockData.activeCycle.get.data);
        mock.onGet('https://dummy-api.example.com/api/kra/?organisationId=1').reply(200, kraMockData.kra.get.allData);
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1')
            .replyOnce(200, kpiMockData.teams.get.data)
            .onGet(kpiMockData.teams.get.url)
            .reply(200, kpiMockData.teams.get.data);

        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=2&searchText=')
            .replyOnce(200, kpiMockData.designations.get.data)
            .onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1&searchText=')
            .replyOnce(200, kpiMockData.designations.get.data);
        const { container } = RTKRender(<KPIForm />);
        await screen.findByText('Edit KPI');
        await waitFor(() => expect(screen.getByTestId('kpiTitle')).toHaveValue('Test Bug'), { timeout: 3000 });
        const editor = container.querySelector('[data-placeholder="Write description here..."]');
        const updateBtn = screen.getByTestId('saveBtn');
        expect(updateBtn).toHaveTextContent('Update');
        if (editor?.getElementsByTagName('p')) {
            fireEvent.change(editor.getElementsByTagName('p')[0], {
                target: {
                    innerHTML:
                        'test kpi data is beaing added, this is only for testing purpose and need to add at least 50 characters to make it work.'
                }
            });
        }
        fireEvent.click(screen.getByTestId('activeToggle'));
        fireEvent.click(updateBtn);
        await waitFor(() => expect(screen.getByText('Are you sure you want to edit KPI, as it will impact the current review cycle?')), {
            timeout: 3000
        });
        fireEvent.click(screen.getByTestId('modal-no'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        fireEvent.click(updateBtn);
        await screen.findByTitle('medly-modal-close-icon');
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
    });

    it('should render with proper data', async () => {
        mock.onGet(kpiMockData.departments.get.url).reply(200, kpiMockData.departments.get.someData);
        mock.onGet(kpiMockData.activeCycle.get.url).reply(200, kpiMockData.activeCycle.get.data);
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1')
            .replyOnce(200, kpiMockData.teams.get.data)
            .onGet(kpiMockData.teams.get.url)
            .reply(200, kpiMockData.teams.get.data);

        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=2&searchText=')
            .replyOnce(200, kpiMockData.designations.get.data)
            .onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1&searchText=')
            .replyOnce(200, kpiMockData.designations.get.data);
        const { container } = RTKRender(<KPIForm />);
        await waitFor(() => expect(screen.getByTestId('kpiTitle')).toHaveValue('Test Bug'), { timeout: 3000 });
        expect(screen.getByTestId('departmentId-0')).toHaveValue('Eng Department');
        expect(screen.getByTestId('teamId-0')).toHaveValue('QA Team');
        const data = screen.getByTestId('designationId-0');
        expect(data.querySelector('[id="designation-input"]')).toHaveValue('SDE');
        const editor = container.querySelector('[data-placeholder="Write description here..."]');
        expect(editor).toContainHTML(
            '<p><span style="background-color: rgb(247, 248, 249);">Demo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo Kpi</span></p>'
        );
        const updateBtn = screen.getByTestId('saveBtn');
        expect(updateBtn).toHaveTextContent('Update');
    });

    it('should edit KPI data if all inputs are filled', async () => {
        mock.onGet(kpiMockData.departments.get.url).reply(200, kpiMockData.departments.get.someData);
        mock.onGet(kpiMockData.activeCycle.get.url).reply(200, kpiMockData.activeCycle.get.data);
        mock.onGet('https://dummy-api.example.com/api/kra/?organisationId=1').reply(200, kraMockData.kra.get.allData);
        mock.onPatch('https://dummy-api.example.com/api/kpi/').reply(200, {});
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1')
            .replyOnce(200, kpiMockData.teams.get.data)
            .onGet(kpiMockData.teams.get.url)
            .reply(200, kpiMockData.teams.get.data);

        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=2&searchText=')
            .replyOnce(200, kpiMockData.designations.get.data)
            .onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1&searchText=')
            .replyOnce(200, kpiMockData.designations.get.data);
        const { container } = RTKRender(<KPIForm />);

        await waitFor(() => expect(screen.getByTestId('kpiTitle')).toHaveValue('Test Bug'), { timeout: 3000 });
        const updateBtn = screen.getByTestId('saveBtn');
        expect(updateBtn).toHaveTextContent('Update');

        fireEvent.change(screen.getByTestId('kpiTitle'), { target: { value: '' } });
        expect(updateBtn).toBeDisabled();

        fireEvent.change(screen.getByTestId('kpiTitle'), { target: { value: 'Test Bug' } });

        expect(screen.getByTestId('departmentId-0')).toHaveValue('Eng Department');
        expect(screen.getByTestId('teamId-0')).toHaveValue('QA Team');
        const data = screen.getByTestId('designationId-0');
        expect(data.querySelector('[id="designation-input"]')).toHaveValue('SDE');
        const editor = container.querySelector('[data-placeholder="Write description here..."]');
        expect(editor).toContainHTML(
            '<p><span style="background-color: rgb(247, 248, 249);">Demo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo KpiDemo Kpi</span></p>'
        );

        if (editor?.getElementsByTagName('p')) {
            fireEvent.change(editor.getElementsByTagName('p')[0], {
                target: {
                    innerHTML:
                        'test kpi data is beaing added, this is only for testing purpose and need to add at least 50 characters to make it work.'
                }
            });
        }
        fireEvent.click(screen.getByTestId('activeToggle'));
        expect(updateBtn).toBeEnabled();
        fireEvent.click(updateBtn);
        await waitFor(() => expect(screen.getByText('Are you sure you want to edit KPI, as it will impact the current review cycle?')));

        fireEvent.click(screen.getByTestId('modal-yes'));
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/KPIs/1'), { timeout: 3000 });
    });

    it('should check if empty cases are working properly from API responses', async () => {
        useLocationMock.mockReturnValue({
            ...kpiMockData.LocationMockData,
            pathname: '/KPIs/1/edit-KPI',
            state: { ...kpiMockData.mockState.state, title: '', status: '', description: '' }
        });
        mock.onGet(kpiMockData.departments.get.url).reply(200, kpiMockData.departments.get.someData);
        mock.onGet(kpiMockData.activeCycle.get.url).reply(200, kpiMockData.activeCycle.get.data);
        mock.onPatch('https://dummy-api.example.com/api/kpi/').reply(200, {});
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1')
            .replyOnce(200, kpiMockData.teams.get.data)
            .onGet(kpiMockData.teams.get.url)
            .reply(200, kpiMockData.teams.get.data);

        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=2&searchText=')
            .replyOnce(200, kpiMockData.designations.get.data)
            .onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1&searchText=')
            .replyOnce(200, { ...kpiMockData.designations.get.data, totalDesignation: 0, designations: [] });
        RTKRender(<KPIForm />);
        await waitFor(() => expect(screen.getByTestId('kpiTitle')).toHaveValue(''), { timeout: 3000 });
    });

    it('should show error when same team is selected', async () => {
        mock.onGet(kpiMockData.departments.get.url).reply(200, kpiMockData.departments.get.someData);
        mock.onGet(kpiMockData.activeCycle.get.url).reply(200, kpiMockData.activeCycle.get.data);
        mock.onPatch('https://dummy-api.example.com/api/kpi/').reply(200, {});
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1')
            .replyOnce(200, kpiMockData.teams.get.data)
            .onGet(kpiMockData.teams.get.url)
            .reply(200, kpiMockData.teams.get.data);

        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=2&searchText=')
            .replyOnce(200, kpiMockData.designations.get.data)
            .onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1&searchText=')
            .replyOnce(200, kpiMockData.designations.get.data);
        RTKRender(<KPIForm />);
        await waitFor(() => expect(screen.getByTestId('kpiTitle')).toHaveValue('Test Bug'), { timeout: 3000 });
        expect(screen.getByTestId('departmentId-0')).toHaveValue('Eng Department');
        expect(screen.getByTestId('teamId-0')).toHaveValue('QA Team');
        const data = screen.getByTestId('designationId-0');
        expect(data.querySelector('[id="designation-input"]')).toHaveValue('SDE');
        const updateBtn = screen.getByTestId('saveBtn');
        expect(updateBtn).toHaveTextContent('Update');
        fireEvent.click(screen.getByTestId('addField'));
        await screen.findByTestId('clearField-1');
        fireEvent.change(screen.getByTestId('departmentId-1'), { target: { value: 'Eng Department' } });
        await waitFor(() => expect(screen.getByTestId('teamId-1')).toBeEnabled(), { timeout: 3000 });
        fireEvent.change(screen.getByTestId('teamId-1'), { target: { value: 'QA Team' } });
        expect(screen.getByText('This team is already selected')).toBeInTheDocument();
    });
});
