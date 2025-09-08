import { cleanup, fireEvent, RTKRender, screen, waitFor } from '@utils/test-utils';
import { UserActivityLog } from './UserActivityLog';
import { UserActivityMockData } from '@mocks/userActivity';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
const mock = new MockAdapter(apiInstance);

afterEach(cleanup);

describe('User Activity', () => {
    it('should render properly', () => {
        const { url, responseCode, allData } = UserActivityMockData.userActivity.get;
        mock.onGet(url).replyOnce(responseCode, allData);
        const { container } = RTKRender(<UserActivityLog />);
        expect(container).toMatchSnapshot();
    });

    it('pagination should work properly', async () => {
        const { url, paginatedUrl, responseCode, allData, paginatedData } = UserActivityMockData.userActivity.get;
        mock.onGet(url).replyOnce(responseCode, allData).onGet(paginatedUrl).replyOnce(responseCode, paginatedData);
        RTKRender(<UserActivityLog />);
        await waitFor(() => screen.findAllByText('Aamir Islam (SR0039)'), { timeout: 4000 });
        expect(screen.getByText('Aamir Islam (SR0039)')).toBeInTheDocument();
        fireEvent.click(screen.getByText(2)); // pagination triggered
        await waitFor(() => screen.findAllByText('Rushad Eliyas Shaikh (SR0051)'), { timeout: 4000 });
        await screen.findAllByText('Rushad Eliyas Shaikh (SR0051)');
        expect(screen.queryByText('Aamir Islam (SR0039)')).not.toBeInTheDocument();
    });

    it('should show no result found', async () => {
        const { url, paginatedUrl, responseCode, allData, paginatedData } = UserActivityMockData.userActivity.get;
        mock.onGet(url).replyOnce(responseCode, {}).onGet(paginatedUrl).replyOnce(responseCode, paginatedData);
        RTKRender(<UserActivityLog />);
        await screen.findByText('No result');
    });
});
