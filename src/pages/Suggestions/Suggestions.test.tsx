import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { Suggestions } from './Suggestions';
import { routeConstants } from '@constants';
import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import { notificationCountData, suggestionMockData } from '@mocks/suggestions';
import * as reactRouterDom from 'react-router-dom';
import { userMockState } from '@mocks/userMockState';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
    useLocation: jest.fn()
}));

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
let mockedState = { ...suggestionMockData.mockState, action: '' };
const originalScrollIntoWindow = window.HTMLElement.prototype.scrollIntoView;

beforeEach(() => {
    useLocationMock.mockReturnValue({
        ...suggestionMockData.locationMockData,
        pathname: `${routeConstants.suggestionBox}/1`,
        state: mockedState
    });
    const { url, progressListUrl, progressList, responseCode, data } = suggestionMockData;
    mock.onGet(url).replyOnce(responseCode, data);
    mock.onGet(progressListUrl).replyOnce(responseCode, progressList);
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

afterEach(() => {
    cleanup();
    mock.reset();
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoWindow;
});

describe('Suggestions component', () => {
    it('should take suggestion component snapshot', () => {
        const { container } = RTKRender(<Suggestions />);
        expect(container).toMatchSnapshot();
    });

    it('should sorting work propely', async () => {
        const { url, data } = suggestionMockData;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<Suggestions />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        const spanElement = screen.getByText('Date');
        fireEvent.click(spanElement);
        await waitFor(() => expect(screen.getAllByText('View')[0]).toBeInTheDocument(), { timeout: 3000 });
    });

    it('should open and close view suggestion popup when clicked on `View` Action', async () => {
        mockedState = { ...suggestionMockData.mockState, action: 'View' };
        useLocationMock.mockReturnValue({
            ...suggestionMockData.locationMockData,
            pathname: `${routeConstants.suggestionBox}/1`,
            state: mockedState
        });
        const { url, data } = suggestionMockData;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<Suggestions />);
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('View')[0]);
        expect(await screen.findByText('Test User (C0001)')).toBeInTheDocument();
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        await waitFor(() => expect(screen.queryByText('Test User (C0001)')).not.toBeInTheDocument(), { timeout: 3000 });
    });

    it('should add suggestion button rendered properly and must be clickable', async () => {
        const { url, data } = suggestionMockData;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<Suggestions />, {
            initialEntries: [`${routeConstants.suggestionBox}/1`]
        });
        const button = screen.getByRole('button', { name: 'Add Suggestion' });
        fireEvent.click(button);
        expect(mockedNavigate).toHaveBeenCalledWith(`${routeConstants.suggestionBox}/undefined/add-suggestion`, {
            state: { action: 'Add' }
        });
    });

    it('should progress update work properly', async () => {
        const { receivedUrl, progressUpdateUrl, responseCode, data } = suggestionMockData;
        const { url: notificationURL, data: notificationData, notPendingData } = notificationCountData;
        mock.onGet(receivedUrl).replyOnce(200, data);
        mock.onGet(notificationURL).replyOnce(200, notificationData);
        mock.onPatch(progressUpdateUrl).replyOnce(responseCode, {});
        mock.onGet(notificationURL).replyOnce(200, notPendingData);
        RTKRender(<Suggestions />, {
            initialState: userMockState
        });
        fireEvent.click(screen.getByTestId('received'));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        expect(screen.getByText('2')).toBeInTheDocument();
        fireEvent.click(screen.getAllByText('View')[0]);
        fireEvent.change(screen.getByTestId('progress'), { target: { value: 'Completed' } });
        fireEvent.click(screen.getByText('Save'));
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(await screen.findByText('Suggestion progress updated successfully')).toBeInTheDocument();
    });

    it('should check if progress update API error is handled properly', async () => {
        mockedState = { ...suggestionMockData.mockState, suggestedByFirstName: '' };
        useLocationMock.mockReturnValue({
            ...suggestionMockData.locationMockData,
            pathname: `${routeConstants.suggestionBox}/1`,
            state: mockedState
        });
        const { receivedUrl, progressUpdateUrl, data } = suggestionMockData;
        mock.onGet(receivedUrl).replyOnce(200, data);
        mock.onPatch(progressUpdateUrl).replyOnce(404, {
            errorMessage: 'something went wrong'
        });
        RTKRender(<Suggestions />, {
            initialState: userMockState
        });
        fireEvent.click(screen.getByTestId('received'));
        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });
        fireEvent.click(screen.getAllByText('View')[0]);
        fireEvent.change(screen.getByTestId('progress'), { target: { value: 'Completed' } });
        fireEvent.click(screen.getByText('Save'));
        expect(await screen.findByText('something went wrong')).toBeInTheDocument();
    });

    it('should check if filter works properly', async () => {
        const { progressFilterAllUrl, progressFilterAllData } = suggestionMockData;
        const { progressFilterUrl, progressFilterPendingData } = suggestionMockData;

        mock.onGet(progressFilterAllUrl).replyOnce(200, progressFilterAllData);
        mock.onGet(progressFilterUrl).replyOnce(200, progressFilterPendingData);

        RTKRender(<Suggestions />, {
            initialState: userMockState
        });
        fireEvent.click(screen.getByTestId('received'));

        await waitFor(() => screen.findAllByText('View'), { timeout: 3000 });

        expect(screen.getAllByText('Completed').length).toEqual(3);
        const progressDropdown = screen.getByTestId('progressDropdown');

        expect(progressDropdown).toBeInTheDocument();
        fireEvent.click(progressDropdown);

        const PendingStatus = await screen.findAllByText('Pending');
        fireEvent.click(PendingStatus[0]);

        expect((await screen.findAllByText('Pending')).length).toEqual(progressFilterPendingData.totalSuggestions);
    });
});
