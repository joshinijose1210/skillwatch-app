import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { FirstTeam } from './FirstTeam';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { orgAdminMockState } from '../../mocks/userMockState';
import { onboardingFlowMockData } from '@mocks/onboardingFlow';
const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

beforeAll(() => {
    const { url, someData } = onboardingFlowMockData.departments.get;
    mock.onGet(url).replyOnce(200, someData);
});

beforeEach(mock.reset);

afterEach(cleanup);

describe('FirstTeam Component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        expect(container).toMatchSnapshot();
    });

    it('should render properly', () => {
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        expect(screen.getByText('teams are created for you. Do you want to add more teams?')).toBeInTheDocument();
        expect(screen.getByTestId('initAddBtn')).toBeEnabled();
    });

    it('should navigate when skip is clicked', () => {
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const skipBtn = screen.getByTestId('skiBtn');
        expect(skipBtn).toBeEnabled();
        fireEvent.click(skipBtn);
        expect(mockNavigate).toBeCalledWith('/set-up-designation');
    });

    it('should navigate when go-back is clicked', () => {
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        const goBackBtn = screen.getByTestId('go-back');
        expect(goBackBtn).toBeEnabled();
        fireEvent.click(goBackBtn);
        expect(mockNavigate).toBeCalledWith('/set-up-department');
    });

    it('should all function work properly and add department', async () => {
        mock.onPost(onboardingFlowMockData.firstTeam.url).replyOnce(200, {
            addedTeam: ['Test team']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('clearBtn-0'));
        await waitFor(() => expect(screen.queryByTestId('clearBtn-0')).not.toBeInTheDocument());
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await waitFor(() => expect(screen.queryByTestId('clearBtn-0')).not.toBeInTheDocument());
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.change(screen.getByTestId('teamName-0'), { target: { value: 'Test team' } });
        fireEvent.click(screen.getByTestId('activeToggle-0'));
        fireEvent.click(screen.getByTestId('activeToggle-0'));
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect((await screen.findAllByText('Team Test team added successfully'))[0]).toBeInTheDocument();
    });

    it('should modal work propely', async () => {
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        const departmentInput = screen.getByTestId('teamName-0');
        fireEvent.change(departmentInput, { target: { value: 'Test team' } });
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await screen.findByTestId('modal-no');
        fireEvent.click(screen.getByTestId('modal-no'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        expect(departmentInput).toHaveValue('Test team');
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await screen.findByTestId('modal-yes');
        fireEvent.click(screen.getByTestId('modal-yes'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        expect(screen.queryByTestId('clearBtn-0')).not.toBeInTheDocument();
    });

    it('should adding multiple department work propely', async () => {
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        expect(await screen.findByTestId('clearBtn-0')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('addBtn'));
        expect(await screen.findByTestId('clearBtn-1')).toBeInTheDocument();
    });

    it('should show an error when department already exist', async () => {
        mock.onPost(onboardingFlowMockData.firstTeam.url).replyOnce(200, {
            existingTeam: ['Test team']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.change(screen.getByTestId('teamName-0'), { target: { value: 'Test team' } });
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText('Team Test team already exists')).toBeInTheDocument();
    });

    it('should render root component if onboarding flow is false', async () => {
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: true } });
        expect(screen.getAllByText('Onboarding flow is completed')[0]).toBeInTheDocument();
    });

    it('should add different teams at once', async () => {
        mock.onPost(onboardingFlowMockData.firstTeam.url).replyOnce(200, {
            existingTeam: ['Test team'],
            addedTeam: ['Test new', 'Team team1']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.change(screen.getByTestId('teamName-0'), { target: { value: 'Test team' } });
        fireEvent.change(screen.getByTestId('teamName-0'), { target: { value: 'Test team1' } });
        fireEvent.click(screen.getByTestId('addBtn'));
        fireEvent.change(screen.getByTestId('teamName-1'), { target: { value: 'Test new' } });
        fireEvent.click(screen.getByTestId('saveBtn'));

        expect(await screen.findByText('Team Test new,Team team1 added successfully')).toBeInTheDocument();
    });

    it('should throw error when adding a team to a department that already is being created in that department', async () => {
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.change(screen.getByTestId('teamName-0'), { target: { value: 'Test team' } });
        fireEvent.click(screen.getByTestId('addBtn'));
        fireEvent.click(screen.getByTestId('departmentName-1'));
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.change(screen.getByTestId('teamName-1'), { target: { value: 'Test team' } });

        expect(await screen.findByText('Team name already entered for the department')).toBeInTheDocument();
    });

    it('should add different teams at once being inactive', async () => {
        mock.onPost(onboardingFlowMockData.firstTeam.url).replyOnce(200, {
            existingTeam: ['Test team'],
            addedTeam: ['Test new', 'Team team1']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.change(screen.getByTestId('teamName-0'), { target: { value: 'Test team' } });
        fireEvent.change(screen.getByTestId('teamName-0'), { target: { value: 'Test team1' } });
        fireEvent.click(screen.getByTestId('addBtn'));
        fireEvent.change(screen.getByTestId('teamName-1'), { target: { value: 'Test new' } });
        fireEvent.click(screen.getByTestId('saveBtn'));
        fireEvent.click(screen.getByTestId('activeToggle-0'));
        fireEvent.click(screen.getByTestId('activeToggle-1'));

        expect(await screen.findByText('Team Test new,Team team1 added successfully')).toBeInTheDocument();
    });

    it('should throw error when adding a wrong team name', async () => {
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.change(screen.getByTestId('teamName-0'), { target: { value: 'Test!@#$%' } });
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect(await screen.findByText(/Special characters are not allowed./i)).toBeInTheDocument();
    });

    it('should add different teams at once to different departments', async () => {
        mock.onPost(onboardingFlowMockData.firstTeam.url).replyOnce(200, {
            existingTeam: ['Test team'],
            addedTeam: ['Test new', 'Team team1']
        });
        const { url, someData } = onboardingFlowMockData.departments.get;
        mock.onGet(url).replyOnce(200, someData);
        RTKRender(<FirstTeam />, { initialState: { ...orgAdminMockState, onboardingFlow: false } });
        fireEvent.click(screen.getByTestId('initAddBtn'));
        await screen.findByTestId('clearBtn-0');
        fireEvent.click(screen.getByTestId('departmentName-0'));
        await screen.findByText('Dep1');
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.change(screen.getByTestId('teamName-0'), { target: { value: 'Test team1' } });
        fireEvent.click(screen.getByTestId('addBtn'));
        fireEvent.click(screen.getByTestId('departmentName-1'));
        fireEvent.click(screen.getByText('Dep2'));

        fireEvent.change(screen.getByTestId('teamName-1'), { target: { value: 'Test new' } });
        fireEvent.click(screen.getByTestId('saveBtn'));
        expect((await screen.findAllByText('Team Test new,Team team1 added successfully'))[0]).toBeInTheDocument();
    });
});
