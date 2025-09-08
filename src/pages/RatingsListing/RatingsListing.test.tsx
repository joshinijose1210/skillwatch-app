import { RTKRender, fireEvent, screen } from '@utils/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { RatingsListingMockData } from '@mocks/ratingsListing';
import { RatingsListing } from './RatingsListing';
import * as reactRouterDom from 'react-router-dom';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn()
}));

beforeAll(() => {
    const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
    useLocationMock.mockReturnValue(RatingsListingMockData.LocationMockData);
});

describe('RatingsListing', () => {
    it('should render properly', () => {
        const { ratingListing, reviewCycle } = RatingsListingMockData.get;
        mock.onGet(ratingListing.url)
            .reply(ratingListing.responseCode, ratingListing.data)
            .onGet(reviewCycle.url)
            .reply(reviewCycle.responseCode, reviewCycle.data);
        const { container } = RTKRender(<RatingsListing />);
        expect(container).toMatchSnapshot();
    });

    // it('should test employee dropdown', async () => {
    //     const { searchEmployeeData, employeesData } = RatingsListingMockData.get;
    //     mock.onGet(employeesData.url)
    //         .reply(employeesData.responseCode, employeesData.data)
    //         .onGet(searchEmployeeData.url)
    //         .replyOnce(searchEmployeeData.responseCode, searchEmployeeData.data);
    //     RTKRender(<RatingsListing />);
    //     const empDropdown = screen.getByTestId('employee-dropdown');
    //     fireEvent.click(empDropdown);
    //     fireEvent.click(await screen.findByText('Moly Agarwal (SR001)'));
    //     const searchResult = screen.getAllByText('Moly Agarwal (SR001)');
    //     expect(searchResult.length).toEqual(2);
    // });

    it('should set reviewCycleId when its not passed from locationState and test pagination', async () => {
        const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
        useLocationMock.mockReturnValue(RatingsListingMockData.someLocationMockData);
        const { ratingListing, reviewCycle, paginationData } = RatingsListingMockData.get;
        mock.onGet(reviewCycle.url)
            .replyOnce(reviewCycle.responseCode, reviewCycle.data)
            .onGet(ratingListing.urlWithPage)
            .replyOnce(ratingListing.responseCode, ratingListing.data)
            .onGet(paginationData.url)
            .replyOnce(paginationData.responseCode, paginationData.data);
        RTKRender(<RatingsListing />);
        const pagnBtn = await screen.findAllByText(2);
        fireEvent.click(pagnBtn[pagnBtn.length - 1]);
        expect((await screen.findAllByText('Moly Agarwal (SR00100)'))[0]).toBeInTheDocument();
    });

    // it('should test Review Cycle dropdown', async () => {
    //     const { ratingListing, newReviewCycleData } = RatingsListingMockData.get;
    //     mock.onGet(ratingListing.urlWithPage)
    //         .reply(ratingListing.responseCode, ratingListing.data)
    //         .onGet(newReviewCycleData.url)
    //         .reply(newReviewCycleData.responseCode, newReviewCycleData.data);
    //     RTKRender(<RatingsListing />);
    //     const reviewCycleDropdown = screen.getByTestId('review-cycle-dropdown');
    //     fireEvent.click(reviewCycleDropdown, { target: { value: 155 } });
    //     // expect((await screen.findAllByText('Moly Agarwal (SR0090)'))[0]).toBeInTheDocument();
    //     expect(true).toBeTruthy();
    // });
});
