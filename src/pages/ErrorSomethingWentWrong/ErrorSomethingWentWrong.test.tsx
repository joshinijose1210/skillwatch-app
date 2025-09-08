import { RTKRender, cleanup, fireEvent, screen } from '@utils/test-utils';
import { ErrorSomethingWentWrong } from './ErrorSomethingWentWrong';
import { userMockState } from '@mocks/userMockState';
import { routeConstants } from '@constants';

describe('ErrorSomethingWentWrong Component', () => {
    const originalLocation = window.location;

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
            value: {
                ...originalLocation,
                href: '',
                assign: jest.fn(),
                reload: jest.fn(),
                replace: jest.fn()
            }
        });
    });

    afterEach(() => {
        cleanup();
        window.location.href = '';
        (window.location.assign as jest.Mock).mockClear();
    });

    afterAll(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: originalLocation
        });
    });

    it('should set pathname for super admin in production', () => {
        RTKRender(<ErrorSomethingWentWrong />, { initialState: { ...userMockState, isSuperAdmin: true } });
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
        const button = screen.getByRole('button', { name: 'Go To Home' });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(window.location.href).toBe(`/app${routeConstants.superAdminLogin}`);
    });

    it('should set pathname for regular user in production', () => {
        RTKRender(<ErrorSomethingWentWrong />, { initialState: { ...userMockState, isSuperAdmin: false } });
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
        const button = screen.getByRole('button', { name: 'Go To Home' });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(window.location.href).toBe(`/app${routeConstants.root}`);
    });
});
