import { RTKRender, cleanup, fireEvent, screen } from '@utils/test-utils';
import { Integrations } from './Integrations';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { orgAdminMockState } from '@mocks/userMockState';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeEach(mock.reset);

afterEach(cleanup);

const originalLocation = window.location;

beforeAll(() => {
    Object.defineProperty(window, 'location', {
        configurable: true,
        value: {
            ...originalLocation,
            search: `?code=test_code&state=test_state`
        }
    });

    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn(() => {
        return 'test_local_storage_value';
    });
    Storage.prototype.removeItem = jest.fn();
});

afterAll(() => {
    Object.defineProperty(window, 'location', {
        value: originalLocation
    });
    jest.clearAllMocks();
});

describe('Integrations', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<Integrations />);
        expect(container).toMatchSnapshot();
    });

    it('should succesfully connect to slack with a success toast', async () => {
        mock.onPost('https://dummy-api.example.com/api/slack/access-token').replyOnce(200, { isSuccess: true });
        mock.onGet('https://dummy-api.example.com/api/slack/is-connected?organisationId=1').replyOnce(200, {});
        RTKRender(<Integrations />);
        expect(await screen.findByText('Integrations')).toBeInTheDocument();
        fireEvent.click(await screen.findByText('Connect Slack'));
        expect(await screen.findByText('Slack connected successfully.')).toBeInTheDocument();
    });

    it('connect button should be disabled if user has no edit permission', async () => {
        mock.onPost('https://dummy-api.example.com/api/slack/access-token').replyOnce(200, { isSuccess: true });
        mock.onGet('https://dummy-api.example.com/api/slack/is-connected?organisationId=1').replyOnce(200, {});
        const initialStateWithNoEditPermission = {
            ...orgAdminMockState,
            modulePermission: [orgAdminMockState.modulePermission, { moduleId: 19, moduleName: 'Integrations', view: true, edit: false }]
        };
        RTKRender(<Integrations />, {
            initialState: initialStateWithNoEditPermission
        });
        expect(await screen.findByText('Integrations')).toBeInTheDocument();
        expect(screen.getByText('Connect Slack').parentElement).toBeDisabled();
    });

    it('should render properly when already integrated and disconnect', async () => {
        mock.onGet('https://dummy-api.example.com/api/slack/is-connected?organisationId=1').replyOnce(200, {
            message: 'test',
            isSuccess: true
        });
        mock.onPatch('https://dummy-api.example.com/api/slack/').replyOnce(200, {});
        RTKRender(<Integrations />);
        expect(await screen.findByText('Integrations')).toBeInTheDocument();
        const connectSlackButton = await screen.findByText('Disconnect');
        expect(connectSlackButton).toBeInTheDocument();

        fireEvent.click(connectSlackButton);
        expect(await screen.findByText('Are you sure you want to disconnect Slack?')).toBeInTheDocument();
        fireEvent.click(screen.getByText('No'));

        fireEvent.click(connectSlackButton);
        expect(await screen.findByText('Are you sure you want to disconnect Slack?')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Yes'));
        expect(await screen.findByText('Slack disconnected successfully')).toBeInTheDocument();
    });

    it('should show error when trying to disconnect slack and some error occurs', async () => {
        mock.onGet('https://dummy-api.example.com/api/slack/is-connected?organisationId=1').replyOnce(200, {
            message: 'test',
            isSuccess: true
        });
        mock.onPatch('https://dummy-api.example.com/api/slack/').replyOnce(404, {
            message: 'test went wrong',
            isError: true
        });
        RTKRender(<Integrations />);
        expect(await screen.findByText('Integrations')).toBeInTheDocument();
        const connectSlackButton = await screen.findByText('Disconnect');
        expect(connectSlackButton).toBeInTheDocument();

        fireEvent.click(connectSlackButton);
        expect(await screen.findByText('Are you sure you want to disconnect Slack?')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Yes'));
        expect(await screen.findByText(/Unable to disconnected slack due to error./i)).toBeInTheDocument();
    });
});
