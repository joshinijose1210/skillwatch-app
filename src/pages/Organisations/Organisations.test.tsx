import { cleanup, RTKRender, fireEvent, screen } from '@utils/test-utils';
import { Organisations } from './Organisations';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { OrganisationsMockData } from '@mocks/organisations';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

afterEach(cleanup);

describe('Super Admin Organisations listing page', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<Organisations />);
        expect(container).toMatchSnapshot();
    });

    it('should API work and data visible correctly', async () => {
        mock.onGet(OrganisationsMockData.url).reply(200, OrganisationsMockData.data);
        RTKRender(<Organisations />);
        expect(await screen.findByText('Test1 User1')).toBeInTheDocument();
    });

    it('should pagination work properly', async () => {
        const { url, paginationUrl, data, paginationData, responseCode } = OrganisationsMockData;
        mock.onGet(url).replyOnce(responseCode, data).onGet(paginationUrl).replyOnce(responseCode, paginationData);
        RTKRender(<Organisations />);
        expect(await screen.findByText('Test1 User1')).toBeInTheDocument();
        const pagnBtn = screen.getAllByText(2);
        fireEvent.click(pagnBtn[pagnBtn.length - 1]);
        expect(await screen.findByText('Test3 User3')).toBeInTheDocument();
    });
});
