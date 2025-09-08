import { designationMockData } from '@mocks';
import { apiInstance } from '@utils';
import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { DesignationManagement } from './DesignationManagement';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

beforeAll(() => {
    mock.onGet(designationMockData.teams.get.url).reply(designationMockData.teams.get.responseCode, designationMockData.teams.get.data);
    mock.onGet(designationMockData.departments.get.url).reply(
        designationMockData.departments.get.responseCode,
        designationMockData.departments.get.data
    );
});

let spy: jest.SpyInstance;

beforeEach(() => {
    spy = jest.spyOn(console, 'error').mockImplementation(() => null);
});

afterEach(() => {
    spy.mockRestore();
    cleanup();
});

describe('designation management', () => {
    it('should render properly', () => {
        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&page=undefined&limit=10&searchText=').replyOnce(200, {
            unlinkedDesignationsCount: 0,
            totalDesignation: 2,
            designations: [
                {
                    organisationId: 1,
                    departmentId: 153,
                    departmentName: 'Engineering',
                    departmentDisplayId: 'DEP3',
                    departmentStatus: true,
                    teamId: 13,
                    teamName: 'BA',
                    teamDisplayId: 'T9',
                    teamStatus: true,
                    id: 244,
                    designationId: 'D123',
                    designationName: 'ABC',
                    status: true,
                    createdAt: 1693402666309,
                    departmentsDisplayId: 'DEPDEP3',
                    designationsDisplayId: 'DD92',
                    teamsDisplayId: 'TT53'
                },
                {
                    organisationId: 1,
                    departmentId: 153,
                    departmentName: 'Engineering',
                    departmentDisplayId: 'DEP3',
                    departmentStatus: true,
                    teamId: 13,
                    teamName: 'BA',
                    teamDisplayId: 'T9',
                    teamStatus: true,
                    id: 244,
                    designationId: 'D123',
                    designationName: 'ABC',
                    status: true,
                    createdAt: 1693402666309,
                    departmentsDisplayId: 'DEPDEP3',
                    designationsDisplayId: 'DD92',
                    teamsDisplayId: 'TT53'
                }
            ]
        });
        const { container } = RTKRender(<DesignationManagement />);

        expect(container).toMatchSnapshot();
    });

    it('should open Add Designation modal when clicked on Add Button', async () => {
        RTKRender(<DesignationManagement />);
        fireEvent.click(screen.getByText('Add Designation'));
        expect(document.body).toHaveStyle({ overflow: 'hidden' });
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
    });

    it('should add new designation when correct data is entered', async () => {
        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&page=undefined&limit=10&searchText=')
            .replyOnce(200, {
                unlinkedDesignationsCount: 0,
                totalDesignation: 2,
                designations: [
                    {
                        organisationId: 1,
                        departmentId: 153,
                        departmentName: 'Engineering',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 13,
                        teamName: 'BA',
                        teamDisplayId: 'T9',
                        teamStatus: true,
                        id: 244,
                        designationId: 'D123',
                        designationName: 'ABC',
                        status: true,
                        createdAt: 1693402666309,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD92',
                        teamsDisplayId: 'TT53'
                    }
                ]
            })
            .onGet('https://dummy-api.example.com/api/designation/?organisationId=1&page=undefined&limit=10&searchText=')
            .replyOnce(200, {
                unlinkedDesignationsCount: 0,
                totalDesignation: 2,
                designations: [
                    {
                        organisationId: 1,
                        departmentId: 153,
                        departmentName: 'Engineering',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 13,
                        teamName: 'BA',
                        teamDisplayId: 'T9',
                        teamStatus: true,
                        id: 244,
                        designationId: 'D123',
                        designationName: 'ABC',
                        status: true,
                        createdAt: 1693402666309,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD92',
                        teamsDisplayId: 'TT53'
                    },
                    {
                        organisationId: 1,
                        departmentId: 153,
                        departmentName: 'Engineering',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 11,
                        teamName: 'BA Team',
                        teamDisplayId: 'T9',
                        teamStatus: true,
                        id: 242,
                        designationId: 'D114',
                        designationName: 'BA Designation',
                        status: false,
                        createdAt: 1699448401146,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD92',
                        teamsDisplayId: 'TT53'
                    }
                ]
            });

        mock.onPost('https://dummy-api.example.com/api/designation/').replyOnce(config => {
            const { designationName } = config.data;
            return [
                200,
                {
                    addedDesignation: [designationName]
                }
            ];
        });
        RTKRender(<DesignationManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        // expect(document.body).toHaveStyle({ overflow: 'unset' });
        fireEvent.click(screen.getByText('Add Designation'));
        expect(document.body).toHaveStyle({ overflow: 'hidden' });
        const saveBtn = screen.getByTestId('saveBtn');
        expect(screen.queryByTestId('saveBtn')).toBeDisabled();
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('BA Department'));
        const teamInput = screen.getByPlaceholderText('Select Team');
        await waitFor(() => expect(teamInput).toHaveStyle({ cursor: 'pointer' }));
        fireEvent.click(screen.getByTestId('teamDropdown'));
        fireEvent.click(screen.getByText('BA Team'));
        fireEvent.change(screen.getByTestId('designationName'), { target: { value: 'BA Designation' } });
        fireEvent.click(screen.getByTestId('activeToggle'));
        expect(saveBtn).toBeEnabled();
        fireEvent.click(saveBtn);
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        await waitFor(() => screen.findAllByText('Edit'));
        expect(screen.getByTitle('BA Designation')).toBeInTheDocument();
    });

    it('should not add new designation when incorrect data is entered', async () => {
        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&page=undefined&limit=10&searchText=').replyOnce(200, {
            unlinkedDesignationsCount: 0,
            totalDesignation: 1,
            designations: [
                {
                    organisationId: 1,
                    departmentId: 153,
                    departmentName: 'Engineering',
                    departmentDisplayId: 'DEP3',
                    departmentStatus: true,
                    teamId: 13,
                    teamName: 'BA Team',
                    teamDisplayId: 'T9',
                    teamStatus: true,
                    id: 242,
                    designationId: 'D123',
                    designationName: 'ABC',
                    status: false,
                    createdAt: 1699448401146,
                    departmentsDisplayId: 'DEPDEP3',
                    designationsDisplayId: 'DD92',
                    teamsDisplayId: 'TT53'
                }
            ]
        });

        mock.onPost('https://dummy-api.example.com/api/designation/').replyOnce(200, { existingDesignation: ['ABC'] });
        RTKRender(<DesignationManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(document.body).toHaveStyle({ overflow: 'unset' });
        fireEvent.click(screen.getByText('Add Designation'));
        expect(document.body).toHaveStyle({ overflow: 'hidden' });
        const saveBtn = screen.getByTestId('saveBtn');
        expect(screen.queryByTestId('saveBtn')).toBeDisabled();
        fireEvent.change(screen.getByTestId('designationName'), { target: { value: 'ABC' } });
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('BA Department'));
        const teamInput = screen.getByPlaceholderText('Select Team');
        await waitFor(() => expect(teamInput).toHaveStyle({ cursor: 'pointer' }));
        fireEvent.click(screen.getByTestId('teamDropdown'));
        fireEvent.click(screen.getAllByText('BA Team')[0]);
        fireEvent.click(screen.getByTestId('activeToggle'));
        expect(saveBtn).toBeEnabled();
        fireEvent.click(saveBtn);
        await screen.findByText('Designation ABC already exists');
        expect(document.body).toHaveStyle({ overflow: 'hidden' });
    });

    it('should edit existing designation when correct data is entered', async () => {
        mock.onGet('https://dummy-api.example.com/api/designation/?organisationId=1&page=undefined&limit=10&searchText=')
            .replyOnce(200, {
                unlinkedDesignationsCount: 0,
                totalDesignation: 2,
                designations: [
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentName: 'Engineering',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 11,
                        teamName: 'BA Team',
                        teamDisplayId: 'T9',
                        teamStatus: true,
                        id: 242,
                        designationId: 'D123',
                        designationName: 'BA Designation',
                        status: true,
                        createdAt: 1699448401146,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD92',
                        teamsDisplayId: 'TT53'
                    },
                    {
                        organisationId: 1,
                        departmentId: 153,
                        departmentName: 'Engineering',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 13,
                        teamName: 'BA',
                        teamDisplayId: 'T9',
                        teamStatus: true,
                        id: 244,
                        designationId: 'D114',
                        designationName: 'testDeg',
                        status: true,
                        createdAt: 1693402666309,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD92',
                        teamsDisplayId: 'TT53'
                    }
                ]
            })
            .onGet(designationMockData.designations.get.url)
            .replyOnce(200, designationMockData.designations.get.data);
        mock.onGet('https://dummy-api.example.com/api/teams/?organisationId=1&departmentId=108').replyOnce(() => {
            return [
                200,
                {
                    unlinkedTeamsCount: 0,
                    totalTeams: 2,
                    teams: [
                        {
                            organisationId: 1,
                            departmentId: 108,
                            departmentDisplayId: 'DEP3',
                            departmentName: 'BA Department',
                            departmentStatus: true,
                            id: 11,
                            teamId: 'T9',
                            teamName: 'BA Team',
                            teamStatus: true,
                            teamCreatedAt: 1687865108632,
                            teamUpdatedAt: 1689765743375
                        },
                        {
                            organisationId: 1,
                            departmentId: 108,
                            departmentDisplayId: 'DEP3',
                            departmentName: 'BA Department',
                            departmentStatus: true,
                            id: 12,
                            teamId: 'T22',
                            teamName: 'New Team',
                            teamStatus: true,
                            teamCreatedAt: 1689711143838
                        }
                    ]
                }
            ];
        });
        mock.onPut('https://dummy-api.example.com/api/designation/242').replyOnce(200, {});
        RTKRender(<DesignationManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('Edit')[0]);
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        await waitFor(() => screen.findByTestId('updateBtn'), { timeout: 3000 });
        const updateBtn = screen.getByTestId('updateBtn');
        expect(screen.queryByTestId('updateBtn')).toBeDisabled();
        expect(screen.getByTestId('departmentDropdown')).toBeDisabled();
        expect(screen.getByTestId('teamDropdown')).toBeDisabled();
        await waitFor(() => expect(screen.getByTestId('teamDropdown')).toHaveValue('BA Team'), { timeout: 3000 });
        fireEvent.change(screen.getByTestId('designationName'), { target: { value: 'BA Designation Test' } });
        expect(updateBtn).toBeEnabled();
        fireEvent.click(updateBtn);
        expect(await screen.findByText('Designation updated successfully')).toBeInTheDocument();
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
    });

    it('should return result when search input is handled', async () => {
        mock.onGet(designationMockData.designations.get.url)
            .replyOnce(200, designationMockData.designations.get.data)
            .onGet('https://dummy-api.example.com/api/designation/?organisationId=1&page=undefined&limit=10&searchText=ABC')
            .replyOnce(200, {
                unlinkedDesignationsCount: 0,
                totalDesignation: 2,
                designations: [
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentName: 'BA Department',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 12,
                        teamName: 'BA Team',
                        teamDisplayId: 'T10',
                        teamStatus: true,
                        id: 242,
                        designationId: 'D123',
                        designationName: 'ABC',
                        status: true,
                        createdAt: 1699448401146,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD92',
                        teamsDisplayId: 'TT53'
                    }
                ]
            });
        RTKRender(<DesignationManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        expect(screen.getByTitle('testDeg')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('searchBar'), { target: { value: 'ABC' } });
        await waitFor(() => screen.findAllByText('Edit'));
        expect(screen.getByTestId('searchBar')).toHaveValue('ABC');
        await waitFor(() => screen.findByTitle('ABC'));
        expect(screen.queryByTitle('testDeg')).not.toBeInTheDocument();
    });

    it('pagination should work properly', async () => {
        mock.onGet(designationMockData.designations.get.url)
            .replyOnce(200, designationMockData.designations.get.allData)
            .onGet('https://dummy-api.example.com/api/designation/?organisationId=1&page=2&limit=10&searchText=')
            .replyOnce(200, {
                unlinkedDesignationsCount: 0,
                totalDesignation: 2,
                designations: [
                    {
                        organisationId: 1,
                        departmentId: 108,
                        departmentName: 'BA Department',
                        departmentDisplayId: 'DEP3',
                        departmentStatus: true,
                        teamId: 12,
                        teamName: 'BA Team',
                        teamDisplayId: 'T10',
                        teamStatus: true,
                        id: 242,
                        designationId: 'D123',
                        designationName: 'SDE-Test-1',
                        status: true,
                        createdAt: 1699448401146,
                        departmentsDisplayId: 'DEPDEP3',
                        designationsDisplayId: 'DD92',
                        teamsDisplayId: 'TT53'
                    }
                ]
            });
        RTKRender(<DesignationManagement />);
        await waitFor(() => screen.findAllByText('Edit'));
        expect(screen.getByTitle('SDE-Test')).toBeInTheDocument();
        fireEvent.click(screen.getByText(2));
        await screen.findByTitle('SDE-Test-1');
        expect(screen.queryByTitle('SDE-Test')).not.toBeInTheDocument();
    });

    it('should add designation to chip list on Enter or comma key press', async () => {
        RTKRender(<DesignationManagement />);
        fireEvent.click(screen.getByText('Add Designation'));
        await waitFor(() => screen.findByTestId('designationModal'), { timeout: 3000 });

        const input = screen.getByTestId('designationName');

        fireEvent.change(input, { target: { value: 'SDE-1' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(screen.getByText('SDE-1')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'SDE-2' } });
        fireEvent.keyDown(input, { key: ',' });
        expect(screen.getByText('SDE-2')).toBeInTheDocument();
    });

    it('should clear error when last chip is removed', async () => {
        RTKRender(<DesignationManagement />);
        fireEvent.click(screen.getByText('Add Designation'));
        await waitFor(() => screen.findByTestId('designationModal'));

        const input = screen.getByTestId('designationName');
        fireEvent.change(input, { target: { value: 'QA Engineer' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        // simulate error state
        fireEvent.click(screen.getByTestId('saveBtn'));
        await waitFor(() => screen.findByText(/already exists/i));
        const deleteIcon = document.querySelector('svg[title="QA Engineer chip clear icon"]') as SVGElement;
        fireEvent.click(deleteIcon);

        expect(screen.queryByText(/already exists/i)).not.toBeInTheDocument();
    });

    it('should show success toast for partial designation addition', async () => {
        mock.onPost('https://dummy-api.example.com/api/designation/').replyOnce(200, {
            addedDesignation: ['SDE-1'],
            existingDesignation: ['SDE-2']
        });

        RTKRender(<DesignationManagement />);
        fireEvent.click(screen.getByText('Add Designation'));
        await waitFor(() => screen.findByTestId('designationModal'));

        const input = screen.getByTestId('designationName');
        fireEvent.change(input, { target: { value: 'SDE-1' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        fireEvent.click(screen.getByTestId('saveBtn'));

        await screen.findByText('1 designation added successfully');
    });

    it('should disable fields correctly in View mode or Org Admin edit', async () => {
        const viewState = {
            action: 'View',
            id: 1,
            designationName: 'Org Admin',
            departmentId: '123',
            teamId: '456',
            status: true
        };

        RTKRender(<DesignationManagement />, {
            initialEntries: [{ pathname: '/designations', state: viewState }]
        });

        await waitFor(() => screen.findByTestId('designationModal'));

        expect(screen.getByTestId('designationName')).toBeDisabled();
        expect(screen.getByTestId('departmentDropdown')).toBeDisabled();
        expect(screen.getByTestId('teamDropdown')).toBeDisabled();
        expect(screen.getByTestId('activeToggle')).toBeDisabled();
    });

    it('should show error text when editDesignation fails', async () => {
        mock.onPut(/designation\/\d+/).replyOnce(400, {
            data: { errorMessage: 'Something went wrong' }
        });

        const editState = {
            action: 'Edit',
            id: 1,
            designationName: 'QA',
            departmentId: '123',
            teamId: '456',
            status: true
        };

        RTKRender(<DesignationManagement />, {
            initialEntries: [{ pathname: '/designations', state: editState }]
        });

        await waitFor(() => screen.findByTestId('updateBtn'));
        fireEvent.change(screen.getByTestId('designationName'), { target: { value: 'QA Test' } });
        fireEvent.click(screen.getByTestId('updateBtn'));

        await screen.findByText('Something went wrong');
        expect(screen.getByTestId('designationModal')).toBeInTheDocument();
    });

    it('should handle designation fetch failure gracefully', async () => {
        mock.onGet(/\/api\/designation\//).replyOnce(500);
        RTKRender(<DesignationManagement />);
        await waitFor(() => {
            expect(screen.queryByText('Edit')).not.toBeInTheDocument();
        });
    });

    it('should reset modal state on close', async () => {
        RTKRender(<DesignationManagement />);
        fireEvent.click(screen.getByText('Add Designation'));
        await waitFor(() => screen.findByTestId('designationModal'));

        fireEvent.change(screen.getByTestId('designationName'), { target: { value: 'Temporary' } });
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        fireEvent.click(screen.getByText('Add Designation'));
        await waitFor(() => screen.findByTestId('designationModal'));

        expect(screen.getByTestId('designationName')).toHaveValue('');
    });

    it('should show designation examples for selected team', async () => {
        RTKRender(<DesignationManagement />);
        fireEvent.click(screen.getByText('Add Designation'));
        await waitFor(() => screen.findByTestId('designationModal'));

        // Simulate team selection
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Backend'));

        fireEvent.click(screen.getByTestId('teamDropdown'));
        fireEvent.click(screen.getByText('Backend'));

        expect(screen.getByText(/SDE-Intern, SDE-1, SDE-2, SDE-Lead, Solutions Architect/)).toBeInTheDocument();
    });
});
