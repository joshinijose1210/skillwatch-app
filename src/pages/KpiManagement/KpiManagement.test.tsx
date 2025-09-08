import { RTKRender, cleanup, fireEvent, act, screen, waitFor } from '@utils/test-utils';
import { KpiManagement } from './KpiManagement';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { kpiMockData } from '@mocks/kpiManagement';
import axios from 'axios';
import { routeConstants } from '@constants';

window.URL.createObjectURL = jest.fn();
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

beforeAll(() => {
    mock.onGet(kpiMockData.teams.get.url).reply(200, kpiMockData.teams.get.data);
    mock.onGet(kpiMockData.kpi.get.url).reply(200, kpiMockData.kpi.get.someData);
    mock.onGet(kpiMockData.activeCycle.get.url).reply(200, kpiMockData.activeCycle.get.data);
    mock.onGet(kpiMockData.kra.get.url).reply(200, kpiMockData.kra.get.allData);
});

beforeEach(mock.reset);

afterEach(cleanup);

jest.useFakeTimers();

describe('KPI Management Component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<KpiManagement />);
        expect(container).toMatchSnapshot();
    });

    it('should render properly', () => {
        RTKRender(<KpiManagement />);
        expect(screen.getByText('KPIs (Key Performance Indicators)')).toBeInTheDocument();
        expect(screen.getByText('View Sample KPI')).toBeEnabled();
        expect(screen.getByTestId('importBtn')).toBeDisabled();
        expect(screen.getByTestId('addKpiBtn')).toBeDisabled();
        expect(screen.getByTestId('statusDropdown')).toHaveValue('All');
    });

    it('should view KPI sample modal working properly', async () => {
        const newMock = new MockAdapter(axios);
        newMock
            .onGet('https://dummy-api.example.com/api/kpi/ba-template')
            .reply(200, {})
            .onGet('https://dummy-api.example.com/api/kpi/engineering-template')
            .replyOnce(200, {})
            .onGet('https://dummy-api.example.com/api/kpi/qa-template')
            .replyOnce(200, {})
            .onGet('https://dummy-api.example.com/api/kpi/hr-template')
            .replyOnce(200, {});
        RTKRender(<KpiManagement />);
        const viewKpi = screen.getByText('View Sample KPI');
        expect(viewKpi).toBeEnabled();
        fireEvent.click(viewKpi);
        expect(screen.getByText('Sample KPI')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('ba-kpiDownload'));
        await waitFor(() => expect(newMock.history.get.length).toBe(1), { timeout: 3000 });
        fireEvent.click(screen.getByTestId('eng-kpiDownload'));
        await waitFor(() => expect(newMock.history.get.length).toBe(2), { timeout: 3000 });
        fireEvent.click(screen.getByTestId('qa-kpiDownload'));
        await waitFor(() => expect(newMock.history.get.length).toBe(3), { timeout: 3000 });
        fireEvent.click(screen.getByTestId('hr-kpiDownload'));
        await waitFor(() => expect(newMock.history.get.length).toBe(4), { timeout: 3000 });
    });

    it('should redirect to edit KPI when click on edit', async () => {
        mock.onGet(kpiMockData.teams.get.url).reply(200, kpiMockData.teams.get.data);
        mock.onGet(kpiMockData.activeCycle.get.url).reply(200, kpiMockData.activeCycle.get.data);
        mock.onGet(kpiMockData.kpi.get.url).reply(200, kpiMockData.kpi.get.someData);
        RTKRender(<KpiManagement />);
        fireEvent.click((await screen.findAllByText('Edit'))[0]);
        expect(mockNavigate).toHaveBeenCalledWith('/KPIs/undefined/edit-KPI', kpiMockData.mockState);
    });

    it('should filter data based on KRAs', async () => {
        mock.onGet(kpiMockData.kra.get.url).reply(200, kpiMockData.kra.get.allData);
        mock.onGet(kpiMockData.kpi.get.url).reply(200, kpiMockData.kpi.get.allData);
        mock.onGet(kpiMockData.kpi.get.filterKRAUrl).reply(200, kpiMockData.kra.get.filterData);
        RTKRender(<KpiManagement />);
        const KRADropdown = await screen.findByTestId('KraDropdown');
        expect(KRADropdown).toBeInTheDocument();
        fireEvent.click(KRADropdown);
        const attitudeKra = await screen.findAllByText('Attitude Fitment');
        fireEvent.click(attitudeKra[0]);
        await waitFor(() => expect(screen.queryByText('Results')).not.toBeInTheDocument());
    });

    it('should filter data based on teams', async () => {
        mock.onGet(kpiMockData.kpi.get.url)
            .reply(200, kpiMockData.kpi.get.someData)
            .onGet(kpiMockData.kpi.get.filterUrl)
            .replyOnce(200, kpiMockData.kpi.get.filterData);
        mock.onGet(kpiMockData.departments.get.url).reply(200, kpiMockData.departments.get.someData);
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=1').reply(200, kpiMockData.teams.get.data);
        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&teamId=1').replyOnce(
            200,
            kpiMockData.designations.get.data
        );
        const { container } = RTKRender(<KpiManagement />);
        await screen.findAllByText('Edit');
        expect(screen.getByText('QA Team (-)')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getAllByText(/Eng Department/i)[0]);
        const teamDropdown = screen.getByTestId('teamDropdown');
        await waitFor(() => expect(teamDropdown).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(teamDropdown);
        fireEvent.click(screen.getByText('QA Team (Eng Department)'));
        const designationDropdown = screen.getByTestId('designationDropdown');
        await waitFor(() => expect(designationDropdown).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(designationDropdown);
        fireEvent.click(screen.getByText('SDE (QA Team)'));
        await waitFor(() => expect(container.querySelector('#designation-input')).toHaveValue('SDE (QA Team)'), { timeout: 3000 });
    });

    it('should filter data based on status', async () => {
        mock.onGet(kpiMockData.kpi.get.url)
            .reply(200, kpiMockData.kpi.get.someData)
            .onGet(kpiMockData.kpi.get.filterStatusUrl)
            .replyOnce(200, {});
        RTKRender(<KpiManagement />);
        await screen.findAllByText('Edit');
        expect(screen.getByText('QA Team (-)')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('statusDropdown'), { target: { value: 'Inactive' } });
        await screen.findByText('No result');
        expect(screen.getByText('No result')).toBeInTheDocument();
    });

    it('should search and clear search functinality work properly', async () => {
        mock.onGet(kpiMockData.kpi.get.url)
            .reply(200, kpiMockData.kpi.get.someData)
            .onGet(kpiMockData.kpi.get.searchUrl)
            .replyOnce(200, kpiMockData.kpi.get.filterData);
        RTKRender(<KpiManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('Test Bug')).toBeInTheDocument();
        expect(screen.getByTitle('Test Kpi')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('searchKpi'), { target: { value: 'Test Bug' } });
        act(() => {
            jest.advanceTimersByTime(500);
            expect(screen.getByTestId('searchKpi')).toHaveValue('Test Bug');
        });
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        await waitFor(() => expect(screen.getByTitle('Test Bug').closest('td')).toBeInTheDocument(), { timeout: 3000 });
        expect(screen.queryByTitle('Test Kpi')).not.toBeInTheDocument();
        const close = screen.getByTitle('close icon');
        expect(close).toBeInTheDocument();
        fireEvent.click(close);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByTitle('Test Kpi')).toBeInTheDocument();
    });

    it('should pagination work properly', async () => {
        mock.onGet(kpiMockData.kpi.get.url)
            .reply(200, kpiMockData.kpi.get.allData)
            .onGet(kpiMockData.kpi.get.pageUrl)
            .replyOnce(200, kpiMockData.kpi.get.allData);
        RTKRender(<KpiManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByText('Test Bug')).toBeInTheDocument();
        fireEvent.click(screen.getByText(2));
        expect(screen.queryByText('Test Bug')).not.toBeInTheDocument();
    });

    it('should redirect when click on add kpi', async () => {
        mock.onGet(kpiMockData.activeCycle.get.url).reply(200, {});
        mock.onGet(kpiMockData.kpi.get.url).reply(200, kpiMockData.kpi.get.someData);
        RTKRender(<KpiManagement />);
        await screen.findAllByText('Edit');
        expect(screen.getByText('KPIs (Key Performance Indicators)')).toBeInTheDocument();
        expect(screen.getByText('View Sample KPI')).toBeEnabled();
        expect(screen.getByTestId('addKpiBtn')).toBeEnabled();
        fireEvent.click(screen.getByTestId('addKpiBtn'));
        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.kpiManagement}/undefined/add-KPI`, { state: { action: 'add' } });
    });

    it('should redirect when click on bulk kpi import', async () => {
        mock.onGet(kpiMockData.activeCycle.get.url).reply(200, {});
        mock.onGet(kpiMockData.kpi.get.url).reply(200, kpiMockData.kpi.get.someData);
        RTKRender(<KpiManagement />);
        await screen.findAllByText('Edit');
        expect(screen.getByText('KPIs (Key Performance Indicators)')).toBeInTheDocument();
        expect(screen.getByText('View Sample KPI')).toBeEnabled();
        expect(screen.getByTestId('importBtn')).toBeEnabled();
        fireEvent.click(screen.getByTestId('importBtn'));
        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.kpiManagement}/undefined/bulk-import`, {
            state: { action: 'add', bulkImportType: 'kpis' }
        });
    });
});
