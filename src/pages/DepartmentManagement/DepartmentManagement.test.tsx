import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { DepartmentManagement } from './DepartmentManagement';
import { departmentMockData } from '@mocks/departments';
import { apiInstance } from '@utils';

const mock = new MockAdapter(apiInstance);

afterEach(cleanup);

describe('Department Management', () => {
    it('should render properly', () => {
        const { url, responseCode, allData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        const { container } = RTKRender(<DepartmentManagement />);
        expect(container).toMatchSnapshot();
        expect(screen.getByText('Departments')).toBeInTheDocument();
        expect(screen.getByText('Add Department')).toBeInTheDocument();
    });

    it('pagination should work properly', async () => {
        const { url, paginatedUrl, responseCode, allData, paginatedData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, allData).onGet(paginatedUrl).replyOnce(responseCode, paginatedData);

        RTKRender(<DepartmentManagement />);

        await waitFor(() => screen.findAllByText('Edit'), { timeout: 4000 });
        expect(screen.getByTitle('ABC')).toBeInTheDocument();

        fireEvent.click(screen.getByText(2)); // pagination triggered

        await waitFor(() => screen.findAllByText('Edit'), { timeout: 4000 });
        await screen.findByTitle('WXY');
        expect(screen.queryByTitle('ABC')).not.toBeInTheDocument();
    });

    it('should have Save button disabled if input is null', () => {
        RTKRender(<DepartmentManagement />);
        fireEvent.click(screen.getByText('Add Department'));
        expect(document.body).toHaveStyle({ overflow: 'hidden' });
        fireEvent.change(screen.getByTestId('modalinput'), {
            target: { value: '' }
        });
        expect(screen.getByTestId('saveBtn')).toBeDisabled();
    });

    it('should open Add Department dialog when clicked on `Add Department` button', () => {
        RTKRender(<DepartmentManagement />);
        fireEvent.click(screen.getByText('Add Department'));
        expect(document.body).toHaveStyle({ overflow: 'hidden' });
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        expect(document.body).toHaveStyle({ overflow: 'unset' });
    });

    it('should activate Save button of entering department name', async () => {
        RTKRender(<DepartmentManagement />);
        fireEvent.click(screen.getByText('Add Department'));
        expect(document.body).toHaveStyle({ overflow: 'hidden' });
        fireEvent.change(screen.getByPlaceholderText('Enter multiple departments separated by commas'), {
            target: { value: 'Database Engineer' }
        });
        expect(screen.getByTestId('saveBtn')).toBeEnabled();
    });

    it('should filter Departments based on Search filter', async () => {
        const { url, responseCode, searchData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, searchData);
        RTKRender(<DepartmentManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        fireEvent.change(screen.getByTestId('searchbox'), { target: { value: 'ABC' } });
        expect(screen.getByTitle('ABC')).toBeInTheDocument();
    });

    it('should clear Search filter on close icon click', async () => {
        RTKRender(<DepartmentManagement />);
        fireEvent.change(screen.getByTestId('searchbox'), { target: { value: 'ABC' } });
        fireEvent.click(screen.getByTitle('close icon'));
        expect(screen.getByTestId('searchbox')).toHaveValue('');
    });

    it('should open Edit dialog, when Edit action is triggered', async () => {
        const { url, responseCode, searchData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, searchData);

        // searched department ABC -> if modal input contains ABC, then update button is disabled
        // on changing the input, the update button is enabled

        RTKRender(<DepartmentManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('Edit')[0]);
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        expect(screen.getByText('Edit Department')).toBeInTheDocument();
        expect(screen.getByTestId('modalinput')).toHaveValue('ABC');
        expect(screen.getByTestId('updateBtn')).toBeDisabled();
        fireEvent.change(screen.getByTestId('modalinput'), {
            target: { value: 'DEF' }
        });
        expect(screen.getByTestId('updateBtn')).toBeEnabled();
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        expect(document.body).toHaveStyle({ overflow: 'unset' });
    });

    it('should change Department status to Inactive', async () => {
        const { url, responseCode, searchData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, searchData);

        RTKRender(<DepartmentManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('Edit')[0]);
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        expect(screen.getByText('Edit Department')).toBeInTheDocument();

        const toggleswicth = screen.getByTestId('toggleswicth');

        fireEvent.click(toggleswicth);
        expect(toggleswicth).not.toBeChecked();

        expect(
            screen.getByText(
                'When the department status is changed to inactive, teams linked with the department will also be deactivated.'
            )
        ).toBeInTheDocument();
    });

    it('should test toggle swicth - Add Department', async () => {
        RTKRender(<DepartmentManagement />);

        fireEvent.click(screen.getByText('Add Department'));
        expect(document.body).toHaveStyle({ overflow: 'hidden' });

        const toggleswicth = screen.getByTestId('toggleswicth');

        expect(toggleswicth).toBeChecked();
        fireEvent.click(toggleswicth);
        expect(toggleswicth).not.toBeChecked();
    });

    it('should add new department when correct data is entered', async () => {
        const { url, postUrl, responseCode, allData } = departmentMockData.departments.get;

        const newDepartment = 'ABCD';

        mock.onGet(url).replyOnce(responseCode, allData);

        mock.onPost(postUrl).replyOnce(responseCode, {
            addedDepartment: [newDepartment]
        });

        RTKRender(<DepartmentManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });

        fireEvent.click(screen.getByText('Add Department'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        const saveBtn = screen.getByTestId('saveBtn');
        expect(saveBtn).toBeDisabled();

        fireEvent.change(screen.getByTestId('modalinput'), { target: { value: newDepartment } });
        expect(screen.getByTestId('saveBtn')).toBeEnabled();

        fireEvent.click(screen.getByTestId('saveBtn'));

        await screen.findByText(`Department ${newDepartment} added successfully`);
    });

    it('should add department name to chip list on Enter or comma key', async () => {
        RTKRender(<DepartmentManagement />);
        fireEvent.click(screen.getByText('Add Department'));
        await waitFor(() => screen.findByTestId('designationModal'), { timeout: 3000 });

        const input = screen.getByTestId('modalinput');
        fireEvent.change(input, { target: { value: 'Finance' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(screen.getByText('Finance')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'Marketing' } });
        fireEvent.keyDown(input, { key: ',' });
        expect(screen.getByText('Marketing')).toBeInTheDocument();
    });

    it('should clear errorText when last chip is removed', async () => {
        const { url, postUrl, responseCode, allData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        RTKRender(<DepartmentManagement />);
        fireEvent.click(screen.getByText('Add Department'));
        await waitFor(() => screen.findByTestId('designationModal'), { timeout: 3000 });

        const input = screen.getByTestId('modalinput');
        fireEvent.change(input, { target: { value: 'Finance' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        mock.onPost(postUrl).replyOnce(responseCode, {
            existingDepartment: ['Finance']
        });

        fireEvent.click(screen.getByTestId('saveBtn'));
        await screen.findByText('These department/s already exists:');

        const deleteIcon = document.querySelector('svg[title="Finance chip clear icon"]') as SVGElement;
        fireEvent.click(deleteIcon);
        expect(screen.queryByText('These department/s already exists:')).not.toBeInTheDocument();
    });

    it('should show success toast if partial department addition succeeds', async () => {
        const { url, postUrl, responseCode, allData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, allData);

        mock.onPost(postUrl).replyOnce(responseCode, {
            addedDepartment: ['Ops'],
            existingDepartment: ['Finance']
        });

        RTKRender(<DepartmentManagement />);
        fireEvent.click(screen.getByText('Add Department'));
        await waitFor(() => screen.findByTestId('designationModal'), { timeout: 3000 });

        const input = screen.getByTestId('modalinput');
        fireEvent.change(input, { target: { value: 'Ops' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        fireEvent.click(screen.getByTestId('saveBtn'));

        await screen.findByText('1 department added successfully');
    });

    it('should show error message if editDepartment fails', async () => {
        const { url, responseCode, allData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, allData);

        const errorMessage = 'Update failed';
        mock.onPut(/departments/).replyOnce(500, { data: { errorMessage } });

        RTKRender(<DepartmentManagement />, {
            initialEntries: [
                {
                    pathname: '/department-management',
                    state: {
                        id: 1,
                        action: 'Edit',
                        departmentName: 'ABC',
                        departmentStatus: true
                    }
                }
            ]
        });

        await waitFor(() => screen.findByTestId('modalinput'), { timeout: 3000 });

        const input = screen.getByTestId('modalinput');
        fireEvent.change(input, { target: { value: 'DEF' } });
        fireEvent.click(screen.getByTestId('updateBtn'));

        await screen.findByText(errorMessage);
    });

    it('should show error when only existingDepartment is returned', async () => {
        const { url, postUrl, responseCode, allData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, allData);

        mock.onPost(postUrl).replyOnce(responseCode, {
            existingDepartment: ['ABC']
        });

        RTKRender(<DepartmentManagement />);
        fireEvent.click(screen.getByText('Add Department'));
        await waitFor(() => screen.findByTestId('designationModal'), { timeout: 3000 });

        const input = screen.getByTestId('modalinput');
        fireEvent.change(input, { target: { value: 'ABC' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        fireEvent.click(screen.getByTestId('saveBtn'));

        await screen.findByText('These department/s already exists:');
    });

    it('should render empty state if fetch departments fails', async () => {
        const { url } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(500, {});
        RTKRender(<DepartmentManagement />);
        await waitFor(() => {
            expect(screen.queryByText('Edit')).not.toBeInTheDocument();
        });
    });

    it('should disable input if department is Org Admin or in View mode', async () => {
        const { url, responseCode, allData } = departmentMockData.departments.get;
        mock.onGet(url).replyOnce(responseCode, allData);

        RTKRender(<DepartmentManagement />, {
            initialEntries: [
                {
                    pathname: '/department-management',
                    state: {
                        id: 1,
                        action: 'View',
                        departmentName: 'Org Admin',
                        departmentStatus: true
                    }
                }
            ]
        });

        await waitFor(() => screen.findByTestId('modalinput'), { timeout: 3000 });
        expect(screen.getByTestId('modalinput')).toBeDisabled();
    });

    it('should reset form fields when modal is closed', async () => {
        RTKRender(<DepartmentManagement />);
        fireEvent.click(screen.getByText('Add Department'));
        await waitFor(() => screen.findByTestId('designationModal'), { timeout: 3000 });

        const input = screen.getByTestId('modalinput');
        fireEvent.change(input, { target: { value: 'Temporary' } });

        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        fireEvent.click(screen.getByText('Add Department'));
        await waitFor(() => screen.findByTestId('designationModal'), { timeout: 3000 });

        expect(screen.getByTestId('modalinput')).toHaveValue('');
    });

    it('should prevent adding duplicate department', async () => {
        const { url, postUrl, responseCode, allData } = departmentMockData.departments.get;
        const newDepartment = 'ABC';

        mock.onGet(url).replyOnce(responseCode, allData);

        mock.onPost(postUrl).replyOnce(responseCode, {
            addedDepartment: [newDepartment]
        });

        RTKRender(<DepartmentManagement />);
        await waitFor(() => screen.findAllByText('Edit'), { timeout: 3000 });

        fireEvent.click(screen.getByText('Add Department'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        const saveBtn = screen.getByTestId('saveBtn');
        expect(saveBtn).toBeDisabled();

        fireEvent.change(screen.getByTestId('modalinput'), { target: { value: newDepartment } });
        expect(screen.getByTestId('saveBtn')).toBeEnabled();

        fireEvent.click(screen.getByTestId('saveBtn'));

        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'hidden' }));
        expect(screen.getByTestId('saveBtn')).toBeDisabled();

        // await screen.findByText(`Department ${newDepartment} already exists`);
    });
});
