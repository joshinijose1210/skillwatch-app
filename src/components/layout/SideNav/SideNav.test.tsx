import { cleanup, fireEvent, RTKRender, screen } from '@utils/test-utils';
import * as router from 'react-router';
import { SideNav } from './SideNav';

const mockNavigate = jest.fn();

describe('SideNav', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
    });

    afterEach(cleanup);

    it('should take snapshot', () => {
        const { container } = RTKRender(<SideNav />);
        expect(container).toMatchSnapshot();
    });

    it('should call history.push on click on dashboard', async () => {
        RTKRender(<SideNav />);
        fireEvent.click(screen.getByText('Dashboard'));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
