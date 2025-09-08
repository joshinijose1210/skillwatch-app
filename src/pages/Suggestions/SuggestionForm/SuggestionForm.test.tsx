import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { routeConstants } from '@constants';
import { SuggestionForm } from './SuggestionForm';
import { RTKRender, fireEvent, cleanup, screen, waitFor } from '@utils/test-utils';
import { suggestionMockData } from '@mocks/suggestions';
import * as reactRouterDom from 'react-router-dom';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
}));

beforeEach(() => {
    mock.onGet(suggestionMockData.settingsURL).replyOnce(200, suggestionMockData.settingsData);
    const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

    if (expect.getState().currentTestName?.includes('Add Suggestion Form component')) {
        useLocationMock.mockReturnValue({
            ...suggestionMockData.locationMockData,
            pathname: `${routeConstants.suggestionBox}/1/add-suggestion`,
            state: { ...suggestionMockData.mockState, action: 'Add' }
        });
    }
    if (expect.getState().currentTestName?.includes('Should check if page renders by navigating through URL directly')) {
        useLocationMock.mockReturnValue({
            ...suggestionMockData.locationMockData,
            pathname: `${routeConstants.suggestionBox}/1/add-suggestion`,
            state: { ...suggestionMockData.mockState, action: '' }
        });
    }
    if (expect.getState().currentTestName?.includes('Edit Draft Suggestion Form component')) {
        useLocationMock.mockReturnValue({
            ...suggestionMockData.locationMockData,
            pathname: `${routeConstants.suggestionBox}/1/edit-suggestion`,
            state: { ...suggestionMockData.mockState, action: 'Edit' }
        });
    }
});

afterEach(cleanup);

describe('Add Suggestion Form component', () => {
    it('should take suggestion component snapshot', () => {
        const { container } = RTKRender(<SuggestionForm />);
        expect(container).toMatchSnapshot();
    });

    it('Should check if page renders by navigating through URL directly', () => {
        RTKRender(<SuggestionForm />);
        expect(screen.getByText('Tips')).toBeInTheDocument();
        expect(screen.getByText('Add Suggestion')).toBeInTheDocument();
        const sendBtn = screen.getByRole('button', { name: 'Send' });
        expect(sendBtn).toBeInTheDocument();
        expect(sendBtn).toBeDisabled();
    });

    it('should not submit suggestion if api fails', async () => {
        mock.onPost('https://dummy-api.example.com/api/suggestion/').replyOnce(400, { errorMessage: 'Failed' });

        const { container, rerender } = RTKRender(<SuggestionForm />);
        rerender(<SuggestionForm />);

        const editor = container
            .querySelector('[data-placeholder="Write your suggestion to the Company here…"]')
            ?.getElementsByTagName('p');
        if (editor !== undefined) {
            fireEvent.change(editor[0], {
                target: { innerHTML: 'This a test suggestion text to verify the functionality of the component.' }
            });
        }
        const sendBtn = screen.getByRole('button', { name: 'Send' });
        await waitFor(() => expect(sendBtn).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(sendBtn);
        expect(await screen.findByText('Failed')).toBeInTheDocument();
    });

    it('form submission must work when data is entered', async () => {
        mock.onPost('https://dummy-api.example.com/api/suggestion/').replyOnce(200, {});
        const { container, rerender } = RTKRender(<SuggestionForm />);
        rerender(<SuggestionForm />);

        const toggleSwitch = await screen.findByTestId('anonymous-toggle');
        fireEvent.click(toggleSwitch);
        const editor = container
            .querySelector('[data-placeholder="Write your suggestion to the Company here…"]')
            ?.getElementsByTagName('p');
        if (editor !== undefined) {
            fireEvent.change(editor[0], {
                target: { innerHTML: 'This a test suggestion text to verify the functionality of the component.' }
            });
        }
        const sendBtn = screen.getByRole('button', { name: 'Send' });
        await waitFor(() => expect(sendBtn).toBeEnabled(), { timeout: 3000 });
        fireEvent.click(sendBtn);
        expect(await screen.findByText('Suggestion submitted successfully')).toBeInTheDocument();
    });
});

describe('Edit Draft Suggestion Form component', () => {
    it('should render propely', () => {
        RTKRender(<SuggestionForm />);
        expect(screen.getByText('Edit Suggestion')).toBeInTheDocument();
        const sendBtn = screen.getByRole('button', { name: 'Send' });
        expect(sendBtn).toBeInTheDocument();
        expect(sendBtn).toBeEnabled();
    });

    it('should save as draft work properly', async () => {
        mock.onPut('https://dummy-api.example.com/api/suggestion/2').replyOnce(200, {});
        const { container } = RTKRender(<SuggestionForm />);

        const editor = container
            .querySelector('[data-placeholder="Write your suggestion to the Company here…"]')
            ?.getElementsByTagName('p');
        if (editor !== undefined) {
            fireEvent.change(editor[0], {
                target: { innerHTML: 'This a test suggestion text to verify the functionality of the component.' }
            });
        }
        const draftBtn = screen.getByRole('button', { name: 'Save as Draft' });
        await waitFor(() => expect(draftBtn).toBeEnabled(), { timeout: 5000 });
        fireEvent.click(draftBtn);
    });
});
