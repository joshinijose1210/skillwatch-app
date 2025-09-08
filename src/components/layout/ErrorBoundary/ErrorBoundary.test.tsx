import { renderWithStoreAndRouter, screen } from '@utils/test-utils';
import PageContent from '../PageContent';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error');
        // @ts-ignore
        console.error.mockImplementation(() => {
            return null;
        });
    });

    afterEach(() => {
        // @ts-ignore
        console.error.mockRestore();
    });

    it('should throw error when something goes wrong', async () => {
        const dummy = jest.fn(() => {
            throw new Error('Something went wrong');
        });

        const ErrorComponent = () => <div>{dummy()}</div>;
        renderWithStoreAndRouter(
            <ErrorBoundary>
                <PageContent>
                    <ErrorComponent />
                </PageContent>
            </ErrorBoundary>
        );
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    it('should render the component if there is nothing wrong', async () => {
        const dummy = jest.fn(() => 'no error here');

        const ErrorComponent = () => <div>{dummy()}</div>;
        renderWithStoreAndRouter(
            <ErrorBoundary>
                <PageContent>
                    <ErrorComponent />
                </PageContent>
            </ErrorBoundary>
        );
        expect(screen.getByText('no error here')).toBeInTheDocument();
    });
});
