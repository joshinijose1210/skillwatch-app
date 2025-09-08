import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import { kraMockData, permissionModuleWithoutKRA } from '@mocks/kraManagement ';
import { apiInstance } from '@utils';
import { KraManagement } from './KraManagement';
import MockAdapter from 'axios-mock-adapter';
import { routeConstants } from '@constants';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

beforeAll(() => {
    mock.onGet(kraMockData.kra.get.url).reply(200, kraMockData.kra.get.allData);
    mock.onGet(kraMockData.module.url).reply(200, kraMockData.module.data);
});

beforeEach(mock.reset);

afterEach(cleanup);

describe('KraManagement', () => {
    it('test snapshot', () => {
        const { container } = RTKRender(<KraManagement />);
        expect(container).toMatchSnapshot();
    });

    it('should redirect to edit kra page when click on edit', async () => {
        RTKRender(<KraManagement />);
        const editKraBtn = await screen.findByText('Edit KRA');
        expect(editKraBtn).toBeInTheDocument();
        fireEvent.click(editKraBtn);
        expect(mockNavigate).toHaveBeenCalledWith(`${routeConstants.kraManagement}/1/edit-KRA`);
    });

    it('should not render Edit Kra button if not permitted', async () => {
        RTKRender(<KraManagement />, { initialState: permissionModuleWithoutKRA });
        await waitFor(() => expect(screen.queryByText('Edit KRA')).not.toBeInTheDocument());
    });
});
