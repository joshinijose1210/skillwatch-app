import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import BulkImport from '.';
import MockAdapter from 'axios-mock-adapter';
import * as reactRouterDom from 'react-router-dom';
import { addEmployeeMockData } from '@mocks/addEmployee';
import axios from 'axios';
import { apiInstance } from '@utils';
import { routeConstants } from '@constants';
const mock = new MockAdapter(axios);
const mockInsta = new MockAdapter(apiInstance);
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));
const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

beforeEach(() => {
    useLocationMock.mockReturnValue({ ...addEmployeeMockData.LocationMockData, state: { action: 'add', bulkImportType: 'employees' } });
});

afterEach(() => {
    mock.reset();
    mockInsta.reset();
    useLocationMock.mockClear();
    cleanup();
});

describe('Bulk Import component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<BulkImport />);
        expect(container).toMatchSnapshot();
    });

    it('should component render properly', () => {
        RTKRender(<BulkImport />);
        expect(screen.getByText('Bulk Import')).toBeInTheDocument();
        expect(screen.getByText('Steps To Bulk Import Employees')).toBeInTheDocument();
        expect(
            screen.getByText('Make sure at least 1 employee with a Manager role is manually added to the application.')
        ).toBeInTheDocument();
        expect(screen.getByText('Start adding employees to the CSV template:')).toBeInTheDocument();
        expect(screen.getByText('Upload the CSV template.')).toBeInTheDocument();
        expect(screen.getByText('Click on the Start Import button.')).toBeInTheDocument();
    });

    it('should download template api run properly', async () => {
        mock.onGet('https://dummy-api.example.com/api/employees/template').replyOnce(200, '');
        RTKRender(<BulkImport />);
        fireEvent.click(screen.getByTestId('templateDownload'));
        await waitFor(() => expect(mock.history.get.length).toBe(1), { timeout: 3000 });
    });

    it('should download template with response work properly', async () => {
        mock.onGet('https://dummy-api.example.com/api/employees/template').replyOnce(
            200,
            `Employee Id, First Name, Last Name, Email Id, Contact No.(with Country Code), Gender(M/F/O), Date of Birth (DD-MM-YYYY), Active(Y/N), Department, Team, Designation, Role, Manager 1 Employee Id, Manager 2 Employee Id (Optional), Date of Joining (DD-MM-YYYY), Years of Experience (Years | Months), Consultant(Y/N)
        `
        );
        RTKRender(<BulkImport />);
        fireEvent.click(screen.getByTestId('templateDownload'));
        await waitFor(() => expect(mock.history.get.length).toBe(1), { timeout: 3000 });
    });

    it('should download template API error is handled properly', async () => {
        mock.onGet('https://dummy-api.example.com/api/employees/template').replyOnce(400, {});
        RTKRender(<BulkImport />);
        fireEvent.click(screen.getByTestId('templateDownload'));
        expect(await screen.findByText('Something went wrong.')).toBeInTheDocument();
    });

    it('should first time employee work properly', async () => {
        useLocationMock.mockReturnValue({
            ...addEmployeeMockData.LocationMockData,
            pathname: `${routeConstants.firstEmployeeBulkImportRedirect}`,
            state: { action: 'add', bulkImportType: 'employees' }
        });
        mock.onGet('https://dummy-api.example.com/api/employees/template').replyOnce(200, '');
        RTKRender(<BulkImport />);
        const backBtn = screen.getByText(/Go Back/i);
        await waitFor(() => expect(backBtn).toBeInTheDocument(), { timeout: 3000 });
        fireEvent.click(backBtn);
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.firstEmployee}`), { timeout: 3000 });
    });

    it('should kpi type render properly', async () => {
        useLocationMock.mockReturnValue({
            ...addEmployeeMockData.LocationMockData,
            state: { action: 'add', bulkImportType: 'kpis' }
        });
        mock.onGet('https://dummy-api.example.com/api/employees/template').replyOnce(200, '');
        RTKRender(<BulkImport />);
        expect(screen.getByText('Bulk Import')).toBeInTheDocument();
    });

    it('should upload and clear file work propely', async () => {
        RTKRender(<BulkImport />);
        const dropArea = screen.getByTestId('dropZone');
        const mockFile = new File(['employee name, id, contact'], 'test.csv', { type: 'text/csv' });
        fireEvent.change(dropArea, { target: { files: [mockFile] } });
        const importBtn = screen.getByTestId('importBtn');
        await screen.findByTestId('resetFile');
        expect(importBtn).toBeEnabled();
        fireEvent.click(screen.getByTestId('resetFile'));
        await waitFor(() => expect(importBtn).toBeDisabled());
        expect(screen.getByText('Drop File or Upload File here.')).toBeInTheDocument();
    });

    it('should show error when upload file has incorrect data', async () => {
        const mockFile = new File([''], 'test.csv', { type: 'text/csv' });
        mock.onPost('https://dummy-api.example.com/api/employees/upload').reply(400, { file: mockFile, message: '' });
        RTKRender(<BulkImport />);
        const dropArea = screen.getByTestId('dropZone');
        fireEvent.change(dropArea, { target: { files: [mockFile] } });
        const importBtn = screen.getByTestId('importBtn');
        await screen.findByTestId('resetFile');
        expect(importBtn).toBeEnabled();
        fireEvent.click(importBtn);
        expect(await screen.findByText('Unable to upload file due to error.')).toBeInTheDocument();
    });

    it('should upload file successfuly when data is correct', async () => {
        const csv = `Employee Id,First Name,Last Name,Email Id,Contact No.(with Country Code),Gender(M/F/O),Date Of Birth (DD-MM-YYYY),Active(Y/N),Department,Team,Designation,Role,Manager 1 Employee Id,Manager 2 Employee Id,Date Of Joining (DD-MM-YYYY),Year of Experience( Year | Months), Consultant(Y/N),
        SR003,P,S,ps@scalereal.com,+919876543210,M,12-10-1996,Y,Engineering,Team1,Des1,SDE,SR001,SR002,01-09-2022,2 | 11,N,`;
        const mockFile = new File([csv], 'test.csv', { type: 'text/csv' });
        mockInsta.onPost().reply(200, { file: mockFile, message: '' });
        RTKRender(<BulkImport />);
        const dropArea = screen.getByTestId('dropZone');
        fireEvent.change(dropArea, { target: { files: [mockFile] } });
        const importBtn = screen.getByTestId('importBtn');
        await screen.findByTestId('resetFile');
        expect(importBtn).toBeEnabled();
        fireEvent.click(importBtn);
        expect(await screen.findByText('Upload successful!')).toBeInTheDocument();
    });
});
