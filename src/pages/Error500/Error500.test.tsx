import { RTKRender, cleanup, screen } from '@utils/test-utils';
import Error500 from './Error500';
import * as reactrouterdom from 'react-router-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));
const useLocationMock = jest.spyOn(reactrouterdom, 'useLocation');

afterAll(cleanup);

describe('Error500 Page', () => {
    useLocationMock.mockReturnValue({
        pathname: '/500',
        state: null,
        search: '',
        hash: '',
        key: ''
    });

    it('should take snapshot and render properly', async () => {
        const { container } = RTKRender(<Error500 />);
        expect(container).toMatchSnapshot();
        expect(await screen.findByText('Try Again')).toBeInTheDocument();
        expect(screen.queryByText('Go Back')).not.toBeInTheDocument();
    });
});
