import { RTKRender, cleanup, screen } from '@utils/test-utils';
import MaintenancePage from './MaintenancePage';
import * as reactrouterdom from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));
const useLocationMock = jest.spyOn(reactrouterdom, 'useLocation');

afterAll(cleanup);

describe('Mainenance Page', () => {
    useLocationMock.mockReturnValue({
        pathname: '/502',
        state: null,
        search: '',
        hash: '',
        key: ''
    });

    it('should take snapshot and render properly', async () => {
        const { container } = RTKRender(<MaintenancePage />);
        expect(container).toMatchSnapshot();
        expect(await screen.findByText('Website under maintenance…')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Our website is currently undergoing scheduled maintenance. We should be back shortly. Thank you for your patience.'
            )
        ).toBeInTheDocument();
        expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
        expect(screen.queryByText('Go Back')).not.toBeInTheDocument();
    });
});
