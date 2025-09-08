import { fireEvent, RTKRender, screen } from '@utils/test-utils';
import Header from './Header';
import { routeConstants } from '@constants';

const renderer = (pathname: string) => {
    return RTKRender(<Header />, { initialEntries: [{ pathname }] });
};

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe('Header', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<Header />);
        expect(container).toMatchSnapshot();
    });

    it('should render properly for home path', () => {
        jest.mock('use-react-router-breadcrumbs', () => {
            return jest.fn(() => {
                jest.fn(() => []);
            });
        });
        renderer('/');
        expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    });

    it('should render properly for received path', () => {
        jest.mock('use-react-router-breadcrumbs', () => {
            return jest.fn(() => {
                jest.fn(() => []);
            });
        });
        renderer(`${routeConstants.threeSixtyDegreeFeedback}/undefined/view-feedback`);
        expect(screen.getByText('My Feedback')).toBeInTheDocument();
    });

    it('should navigate onClick', () => {
        jest.mock('use-react-router-breadcrumbs', () => {
            return jest.fn(() => {
                jest.fn(() => []);
            });
        });
        renderer(`${routeConstants.threeSixtyDegreeFeedback}/1/view-feedback`);
        expect(screen.getByText('My Feedback')).toBeInTheDocument();
        fireEvent.click(screen.getByText('My Feedback'));
        expect(mockedNavigate).toHaveBeenCalledWith(`${routeConstants.threeSixtyDegreeFeedback}/undefined`);
    });
});
