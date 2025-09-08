import EditEmployee from './EmployeeForm';
import { addEmployeeMockData } from '@mocks/addEmployee';
import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { routeConstants } from '@constants';
import * as reactRouterDom from 'react-router-dom';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
const useParamMock = jest.spyOn(reactRouterDom, 'useParams');

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    useParams: jest.fn()
}));

beforeAll(() => {
    const { url: experienceUrl, data } = addEmployeeMockData.experience.get;
    mock.onGet(experienceUrl).replyOnce(200, data);
    const { url: roleUrl, someData: roleData } = addEmployeeMockData.roles.get;
    mock.onGet(roleUrl).reply(200, roleData);
    const { url: managerUrl, someData } = addEmployeeMockData.managers.get;
    mock.onGet(managerUrl).replyOnce(200, someData);
    const { url: genderUrl, someData: genderData } = addEmployeeMockData.genderList.get;
    mock.onGet(genderUrl).replyOnce(200, genderData);
});

const originalScrollIntoWindow = window.HTMLElement.prototype.scrollIntoView;

beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
    const useParamMock = jest.spyOn(reactRouterDom, 'useParams');

    useLocationMock.mockReturnValue(addEmployeeMockData.LocationMockData);
    useParamMock.mockReturnValue({ id: '', ActivePage: '1' });

    mock.reset();
});

afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoWindow;
    cleanup();
});

jest.useFakeTimers();

describe('Add new employee form', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<EditEmployee />);
        expect(container).toMatchSnapshot();
    });

    it('Should show an error when wrong phone number is added', async () => {
        RTKRender(<EditEmployee />);
        expect(await screen.findByText('Add Employee')).toBeInTheDocument();
        fireEvent.change(screen.getByPlaceholderText('Contact Number'), { target: { value: '9876543210' } });
        expect(screen.getByText('Please enter valid contact number.')).toBeInTheDocument();
    });

    it('Should show an error when department is not linked to a team', async () => {
        const { url: teamUrl } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, {
            unlinkedTeamsCount: 29,
            totalTeams: 0
        });
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        RTKRender(<EditEmployee />);
        expect(await screen.findByText('Add Employee')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Dep1'));
        expect(await screen.findByText('This department is not linked with any team.')).toBeInTheDocument();
    });

    it('Should show an error when team is not linked to a designation', async () => {
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: designationtUrl } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, {
            unlinkedDesignationsCount: 0,
            totalDesignation: 0
        });
        RTKRender(<EditEmployee />);
        await screen.findByText('Add Employee');
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.click(screen.getByTestId('teamDropdown'));
        await screen.findByText('Team1');
        fireEvent.click(screen.getByText('Team1'));
        expect(await screen.findByText('This team is not linked with any designation.')).toBeInTheDocument();
    });

    it('should add new employee when correct data in entered', async () => {
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: designationtUrl, someData: degData } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, degData);
        const { url: genderUrl, someData: genderData } = addEmployeeMockData.genderList.get;
        mock.onGet(genderUrl).replyOnce(200, genderData);
        const { url: roleUrl, someData: roleData } = addEmployeeMockData.roles.get;
        mock.onGet(roleUrl).replyOnce(200, roleData);
        const { url: experienceUrl, data } = addEmployeeMockData.experience.get;
        mock.onGet(experienceUrl).replyOnce(200, data);
        const { url: managerUrl, someData: managerData } = addEmployeeMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        mock.onPost('https://dummy-api.example.com/api/employees/').replyOnce(200, {});
        RTKRender(<EditEmployee />);
        expect(await screen.findByText('Add Employee')).toBeInTheDocument();
        const save = screen.getByTestId('saveBtn');
        expect(save).toHaveTextContent('Save');
        expect(save).toBeDisabled();
        fireEvent.change(screen.getByTestId('nameInput'), { target: { value: 'Name' } });
        fireEvent.change(screen.getByTestId('lastNameInput'), { target: { value: 'Lastname' } });
        fireEvent.change(screen.getByPlaceholderText('Contact Number'), { target: { value: '+919876543210' } });
        fireEvent.change(screen.getByTestId('dateInput'), { target: { value: '10-09-1998' } });
        fireEvent.click(screen.getByTestId('genderDropdown'));
        fireEvent.click(screen.getByText('Male'));
        fireEvent.change(screen.getByTestId('emailInput'), { target: { value: 'abcd@scalereal.com' } });
        fireEvent.change(screen.getByTestId('employeeIdInput'), { target: { value: 'SR001' } });
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.click(screen.getByTestId('teamDropdown'));
        await screen.findByText('Team1');
        fireEvent.click(screen.getByText('Team1'));
        fireEvent.click(screen.getByTestId('designationDropdown'));
        await screen.findByText('SDE');
        fireEvent.click(screen.getByText('SDE'));
        fireEvent.click(screen.getByTestId('rolesDropdown'));
        await screen.findByText('HR');
        fireEvent.click(screen.getByText('HR'));
        fireEvent.click(screen.getByTestId('managerOneDropdown'));
        await screen.findByText('T P (SR001)');
        fireEvent.click(await screen.findByText('T P (SR001)'));
        fireEvent.click(screen.getByTestId('managerTwoDropdown'));
        expect(await screen.findByTestId('managerTwoDropdown')).toBeEnabled();
        await screen.findByText('R P (SR002)');
        fireEvent.click(screen.getByText('R P (SR002)'));
        fireEvent.change(screen.getByTestId('joinDate'), { target: { value: '01-09-2023' } });
        fireEvent.change(screen.getByTestId('experienceDropdown'), { target: { value: '0 years 1 month' } });
        const consultBtn = screen.getByTestId('consultantToggle');
        fireEvent.click(consultBtn);
        fireEvent.click(consultBtn);
        const activeBtn = screen.getByTestId('activeToggle');
        fireEvent.click(activeBtn);
        fireEvent.click(activeBtn);
        fireEvent.click(screen.getByTestId('consultantToggle'));
        expect(save).toBeEnabled();
        fireEvent.click(save);
        await waitFor(() => expect(screen.getByText('Are you sure you want to set Name Lastname(SR001) as a Consultant/Contractor?')), {
            timeout: 3000
        });
        fireEvent.click(screen.getByText('Yes'));
        await waitFor(() => expect(screen.getByText('Employee added successfully')), { timeout: 3000 });
        expect(mockNavigate).toBeCalledWith(`${routeConstants.employeeManagement}/1`);
    });

    it('should have disabled save button if incorrect data is entered', async () => {
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: designationtUrl, someData: degData } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, degData);
        const { url: genderUrl, someData: genderData } = addEmployeeMockData.genderList.get;
        mock.onGet(genderUrl).replyOnce(200, genderData);
        const { url: roleUrl, someData: roleData } = addEmployeeMockData.roles.get;
        mock.onGet(roleUrl).replyOnce(200, roleData);
        const { url: experienceUrl, data } = addEmployeeMockData.experience.get;
        mock.onGet(experienceUrl).replyOnce(200, data);
        const { url: managerUrl, someData: managerData } = addEmployeeMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        mock.onPost('https://dummy-api.example.com/api/employees/').replyOnce(200, {});
        RTKRender(<EditEmployee />);
        await screen.findByText('Add Employee');
        const save = screen.getByTestId('saveBtn');
        expect(save).toHaveTextContent('Save');
        expect(save).toBeDisabled();
        fireEvent.change(screen.getByTestId('nameInput'), { target: { value: 'Name' } });
        fireEvent.change(screen.getByTestId('lastNameInput'), { target: { value: 'Lastname' } });
        fireEvent.change(screen.getByPlaceholderText('Contact Number'), { target: { value: '+9198765' } });
        fireEvent.change(screen.getByTestId('dateInput'), { target: { value: '10-09-1998' } });
        fireEvent.click(screen.getByTestId('genderDropdown'));
        fireEvent.click(screen.getByText('Male'));
        fireEvent.change(screen.getByTestId('emailInput'), { target: { value: 'abcd@scalereal.com' } });
        fireEvent.change(screen.getByTestId('employeeIdInput'), { target: { value: '' } });
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.click(screen.getByTestId('teamDropdown'));
        await screen.findByText('Team1');
        fireEvent.click(screen.getByText('Team1'));
        fireEvent.click(screen.getByTestId('designationDropdown'));
        await screen.findByText('SDE');
        fireEvent.click(screen.getByText('SDE'));
        fireEvent.click(screen.getByTestId('rolesDropdown'));
        await screen.findByText('Org Admin');
        fireEvent.click(screen.getByText('Org Admin'));
        fireEvent.click(screen.getByTestId('managerOneDropdown'));
        await screen.findByText('T P (SR001)');
        fireEvent.click(screen.getByText('T P (SR001)'));
        fireEvent.change(screen.getByTestId('joinDate'), { target: { value: '01-09-2023' } });
        fireEvent.change(screen.getByTestId('experienceDropdown'), { target: { value: '0 years 1 month' } });
        const consultBtn = screen.getByTestId<HTMLInputElement>('consultantToggle');
        expect(consultBtn.type).toBe('checkbox');
        expect(consultBtn).not.toBeChecked();
        fireEvent.click(consultBtn);
        expect(consultBtn).toBeChecked();
        const activeBtn = screen.getByTestId<HTMLInputElement>('activeToggle');
        expect(activeBtn.type).toBe('checkbox');
        expect(activeBtn).toBeChecked();
        expect(save).toBeDisabled();
    });
});

describe('Edit employee form', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({
            ...addEmployeeMockData.LocationMockData,
            pathname: `${routeConstants.employeeManagement}/1/edit-employee/2`
        });
        useParamMock.mockReturnValue({ id: '2', ActivePage: '1' });
    });

    it('should update existing employee if any data is changed', async () => {
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: designationtUrl, someData: degData } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, degData);
        const { url: genderUrl, someData: genderData } = addEmployeeMockData.genderList.get;
        mock.onGet(genderUrl).replyOnce(200, genderData);
        const { url: experienceUrl, data } = addEmployeeMockData.experience.get;
        mock.onGet(experienceUrl).replyOnce(200, data);
        const { url: managerUrl, someData: managerData } = addEmployeeMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        const { url: Url, someData: employeeData } = addEmployeeMockData.employeeById.get;
        mock.onGet(Url).replyOnce(200, employeeData);
        const { url: reviewUrl, data: reviewData } = addEmployeeMockData.reviewCycle.get;
        mock.onGet(reviewUrl).replyOnce(200, reviewData);
        const { url: roleUrl, someData: roleData } = addEmployeeMockData.roles.get;
        mock.onGet(roleUrl).replyOnce(200, roleData);
        mock.onPut('https://dummy-api.example.com/api/employees/2').replyOnce(200, {});
        RTKRender(<EditEmployee />);
        await screen.findByText('Edit Employee');
        const update = screen.getByTestId('saveBtn');
        expect(update).toHaveTextContent('Update');
        expect(update).toBeDisabled();
        expect(screen.getByTestId('nameInput')).toHaveValue('R');
        fireEvent.change(screen.getByTestId('nameInput'), { target: { value: 'Name' } });
        fireEvent.click(screen.getByTestId('managerTwoDropdown'));
        await screen.findByText('R S (SR002)');
        fireEvent.click(screen.getByText('R S (SR002)'));
        expect(update).toBeEnabled();
        fireEvent.click(update);
        await waitFor(() => expect(screen.getByText('Employee updated successfully')), { timeout: 3000 });
        expect(mockNavigate).toBeCalledWith(`${routeConstants.employeeManagement}/1`);
    });

    it('should not update existing employee when some error occurs', async () => {
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: designationtUrl, someData: degData } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, degData);
        const { url: genderUrl, someData: genderData } = addEmployeeMockData.genderList.get;
        mock.onGet(genderUrl).replyOnce(200, genderData);
        const { url: experienceUrl, data } = addEmployeeMockData.experience.get;
        mock.onGet(experienceUrl).replyOnce(200, data);
        const { url: managerUrl, someData: managerData } = addEmployeeMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        const { url: Url, someData: employeeData } = addEmployeeMockData.employeeById.get;
        mock.onGet(Url).replyOnce(200, employeeData);
        const { url: reviewUrl, data: reviewData } = addEmployeeMockData.reviewCycle.get;
        mock.onGet(reviewUrl).replyOnce(200, reviewData);
        const { url: roleUrl, someData: roleData } = addEmployeeMockData.roles.get;
        mock.onGet(roleUrl).replyOnce(200, roleData);
        mock.onPut('https://dummy-api.example.com/api/employees/2').replyOnce(404, { errorMessage: 'Something went wrong while updating' });
        RTKRender(<EditEmployee />);
        await screen.findByText('Edit Employee');
        const update = screen.getByTestId('saveBtn');
        expect(update).toHaveTextContent('Update');
        expect(update).toBeDisabled();
        expect(screen.getByTestId('nameInput')).toHaveValue('R');
        fireEvent.change(screen.getByTestId('nameInput'), { target: { value: 'Name' } });
        fireEvent.click(screen.getByTestId('managerTwoDropdown'));
        await screen.findByText('R S (SR002)');
        fireEvent.click(screen.getByText('R S (SR002)'));
        expect(update).toBeEnabled();
        fireEvent.click(update);
        await waitFor(() => expect(screen.getByText('Something went wrong while updating')), { timeout: 3000 });
    });

    it('should show popup when role is changed', async () => {
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: designationtUrl, someData: degData } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, degData);
        const { url: genderUrl, someData: genderData } = addEmployeeMockData.genderList.get;
        mock.onGet(genderUrl).replyOnce(200, genderData);
        const { url: experienceUrl, data } = addEmployeeMockData.experience.get;
        mock.onGet(experienceUrl).replyOnce(200, data);
        const { url: managerUrl, someData: managerData } = addEmployeeMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        const { url: Url, someData: employeeData } = addEmployeeMockData.employeeById.get;
        mock.onGet(Url).replyOnce(200, employeeData);
        const { url: reviewUrl, data: reviewData } = addEmployeeMockData.reviewCycle.get;
        mock.onGet(reviewUrl).replyOnce(200, reviewData);
        const { url: roleUrl, someData: roleData } = addEmployeeMockData.roles.get;
        mock.onGet(roleUrl).replyOnce(200, roleData);
        const { url: reporteeUrl, data: reporteeData } = addEmployeeMockData.reportees.get;
        mock.onGet(reporteeUrl).replyOnce(200, reporteeData);
        mock.onPut('https://dummy-api.example.com/api/employees/2').replyOnce(200, {});
        RTKRender(<EditEmployee />);
        expect(await screen.findByText('Edit Employee')).toBeInTheDocument();
        const update = screen.getByTestId('saveBtn');
        expect(update).toHaveTextContent('Update');
        expect(update).toBeDisabled();
        expect(screen.getByTestId('nameInput')).toHaveValue('R');
        fireEvent.change(screen.getByTestId('rolesDropdown'), { target: { value: 'Org Admin' } });
        await waitFor(() => expect(update).toBeEnabled());
        fireEvent.click(update);
        await waitFor(() => expect(screen.getByText('Are you sure you want to change the role of R P(SR002)?')), { timeout: 3000 });
        fireEvent.click(screen.getByText('Proceed'));
        jest.advanceTimersByTime(500);
        expect(mockNavigate).toBeCalledWith('/employees/1/edit-employee/2/change-role', addEmployeeMockData.navigationRoleState);
    });

    it('should show popup when employee status is changed', async () => {
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: designationtUrl, someData: degData } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, degData);
        const { url: genderUrl, someData: genderData } = addEmployeeMockData.genderList.get;
        mock.onGet(genderUrl).replyOnce(200, genderData);
        const { url: experienceUrl, data } = addEmployeeMockData.experience.get;
        mock.onGet(experienceUrl).replyOnce(200, data);
        const { url: managerUrl, someData: managerData } = addEmployeeMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        const { url: Url, someData: employeeData } = addEmployeeMockData.employeeById.get;
        mock.onGet(Url).replyOnce(200, employeeData);
        const { url: reviewUrl, data: reviewData } = addEmployeeMockData.reviewCycle.get;
        mock.onGet(reviewUrl).replyOnce(200, reviewData);
        const { url: roleUrl, someData: roleData } = addEmployeeMockData.roles.get;
        mock.onGet(roleUrl).replyOnce(200, roleData);
        const { url: reporteeUrl, data: reporteeData } = addEmployeeMockData.reportees.get;
        mock.onGet(reporteeUrl).replyOnce(200, reporteeData);
        mock.onPut('https://dummy-api.example.com/api/employees/2').replyOnce(200, {});
        RTKRender(<EditEmployee />);
        jest.advanceTimersByTime(500);
        expect(await screen.findByText('Edit Employee')).toBeInTheDocument();
        const update = screen.getByTestId('saveBtn');
        expect(update).toHaveTextContent('Update');
        expect(update).toBeDisabled();
        expect(screen.getByTestId('nameInput')).toHaveValue('R');
        const activeToggle = screen.getByTestId('activeToggle');
        fireEvent.click(screen.getByTestId('activeToggle'));
        // fireEvent.change(screen.getByTestId('activeToggle'), {target: {checked: false}})
        expect(activeToggle).not.toBeChecked();
        expect(update).toBeEnabled();
        fireEvent.click(update);
        await waitFor(() => expect(screen.getByText('Are you sure you want to deactivate R P(SR002)?')), { timeout: 3000 });
        fireEvent.click(screen.getByText('Yes'));
        expect(mockNavigate).toBeCalledWith('/employees/1/edit-employee/2/deactivate-manager', addEmployeeMockData.navigationMockdata);
    });

    it('should show popup when contract status is changed', async () => {
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: designationtUrl, someData: degData } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, degData);
        const { url: genderUrl, someData: genderData } = addEmployeeMockData.genderList.get;
        mock.onGet(genderUrl).replyOnce(200, genderData);
        const { url: experienceUrl, data } = addEmployeeMockData.experience.get;
        mock.onGet(experienceUrl).replyOnce(200, data);
        const { url: managerUrl, someData: managerData } = addEmployeeMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        const { url: Url, someData: employeeData } = addEmployeeMockData.employeeById.get;
        mock.onGet(Url).replyOnce(200, employeeData);
        const { url: reviewUrl, data: reviewData } = addEmployeeMockData.reviewCycle.get;
        mock.onGet(reviewUrl).replyOnce(200, reviewData);
        const { url: roleUrl, someData: roleData } = addEmployeeMockData.roles.get;
        mock.onGet(roleUrl).replyOnce(200, roleData);
        RTKRender(<EditEmployee />);
        await screen.findByText('Edit Employee');
        const update = screen.getByTestId('saveBtn');
        expect(update).toHaveTextContent('Update');
        expect(update).toBeDisabled();
        expect(screen.getByTestId('nameInput')).toHaveValue('R');
        fireEvent.click(screen.getByTestId('consultantToggle'));
        expect(update).toBeEnabled();
        fireEvent.click(update);
        await waitFor(() => expect(screen.getByText('Are you sure you want to set R P(SR002) as a Consultant/Contractor?')), {
            timeout: 3000
        });
    });

    it('should popup work properly', async () => {
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: designationtUrl, someData: degData } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, degData);
        const { url: genderUrl, someData: genderData } = addEmployeeMockData.genderList.get;
        mock.onGet(genderUrl).replyOnce(200, genderData);
        const { url: experienceUrl, data } = addEmployeeMockData.experience.get;
        mock.onGet(experienceUrl).replyOnce(200, data);
        const { url: managerUrl, someData: managerData } = addEmployeeMockData.managers.get;
        mock.onGet(managerUrl).replyOnce(200, managerData);
        const { url: Url, someData: employeeData } = addEmployeeMockData.employeeById.get;
        mock.onGet(Url).replyOnce(200, employeeData);
        const { url: reviewUrl, data: reviewData } = addEmployeeMockData.reviewCycle.get;
        mock.onGet(reviewUrl).replyOnce(200, reviewData);
        const { url: roleUrl, someData: roleData } = addEmployeeMockData.roles.get;
        mock.onGet(roleUrl).replyOnce(200, roleData);
        RTKRender(<EditEmployee />);
        await screen.findByText('Edit Employee');
        const update = screen.getByTestId('saveBtn');
        expect(update).toHaveTextContent('Update');
        expect(update).toBeDisabled();
        expect(screen.getByTestId('nameInput')).toHaveValue('R');
        fireEvent.click(screen.getByTestId('consultantToggle'));
        expect(update).toBeEnabled();
        fireEvent.click(update);
        await waitFor(() => expect(screen.getByText('Are you sure you want to set R P(SR002) as a Consultant/Contractor?')), {
            timeout: 3000
        });
        fireEvent.click(screen.getByText('No'));
        await waitFor(
            () => expect(screen.queryByText('Are you sure you want to set R P(SR002) as a Consultant/Contractor?')).not.toBeInTheDocument(),
            { timeout: 3000 }
        );
        expect(update).toBeEnabled();
        fireEvent.click(update);
        await waitFor(() => expect(screen.getByText('Are you sure you want to set R P(SR002) as a Consultant/Contractor?')), {
            timeout: 3000
        });
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        await waitFor(
            () => expect(screen.queryByText('Are you sure you want to set R P(SR002) as a Consultant/Contractor?')).not.toBeInTheDocument(),
            { timeout: 3000 }
        );
    });

    it('should show errors for inactive designations when editing', async () => {
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: designationUrl, inactiveDesignationsData: designationData } = addEmployeeMockData.designations.get;
        mock.onGet(designationUrl).replyOnce(200, designationData);
        RTKRender(<EditEmployee />);
        await screen.findByText('Edit Employee');
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.click(screen.getByTestId('teamDropdown'));
        await screen.findByText('Team1');
        fireEvent.click(screen.getByText('Team1'));
        fireEvent.click(screen.getByTestId('designationDropdown'));

        expect(await screen.findByText('Selected team has no active designations.')).toBeInTheDocument();
    });

    it('should show an error while editing and the team is not linked to a designation', async () => {
        const { url: departmentUrl, someData: depData } = addEmployeeMockData.departments.get;
        mock.onGet(departmentUrl).replyOnce(200, depData);
        const { url: teamUrl, someData } = addEmployeeMockData.teams.get;
        mock.onGet(teamUrl).replyOnce(200, someData);
        const { url: designationtUrl } = addEmployeeMockData.designations.get;
        mock.onGet(designationtUrl).replyOnce(200, {
            unlinkedDesignationsCount: 0,
            totalDesignation: 0
        });
        RTKRender(<EditEmployee />);
        await screen.findByText('Edit Employee');
        fireEvent.click(screen.getByTestId('departmentDropdown'));
        fireEvent.click(screen.getByText('Dep1'));
        fireEvent.click(screen.getByTestId('teamDropdown'));
        await screen.findByText('Team1');
        fireEvent.click(screen.getByText('Team1'));
        expect(await screen.findByText('This team is not linked with any designation.')).toBeInTheDocument();
    });
});
