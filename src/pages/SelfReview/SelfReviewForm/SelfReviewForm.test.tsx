import { RTKRender, fireEvent, screen, waitFor } from '@utils/test-utils';
import { SelfReviewForm } from './SelfReviewForm';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { ManagerReviewMockData } from '@mocks/managerReview';
import * as reactRouterDom from 'react-router-dom';
import { selfReviewFormMockData } from '@mocks/selfReviewForm';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

beforeAll(() => {
    const { url, data } = selfReviewFormMockData.kpi;
    mock.onGet(url).replyOnce(200, data);
});

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

describe('SelfReviewForm component as Add self Review', () => {
    beforeEach(() => {
        mock.reset();
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...selfReviewFormMockData.mockState, action: 'Add' }
        });
    });

    it('should take snapshot', () => {
        const { url: selfReviewUrl, data: selfReviewData } = selfReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        const { container } = RTKRender(<SelfReviewForm />);
        expect(container).toMatchSnapshot();
    });

    it('should render properly', async () => {
        const { url, data } = selfReviewFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        const { url: selfReviewUrl } = selfReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, []);
        RTKRender(<SelfReviewForm />);
        await screen.findByText('Add Self Review');
        expect(screen.getByText('Communicate when tasks are taking longer than usual')).toBeInTheDocument();
        expect(screen.getByTestId('submitBtn')).toBeDisabled();
    });

    it("should properly navigate to View Team's Feedback", async () => {
        const { url, data } = selfReviewFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        const { url: selfReviewUrl } = selfReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, []);
        RTKRender(<SelfReviewForm />);
        await screen.findByText('Add Self Review');
        fireEvent.click(screen.getByText("View Team's Feedback"));
        expect(mockNavigate).toBeCalledTimes(1);
    });

    it('should not add self review if improper data is provided', async () => {
        const { url: selfReviewUrl } = selfReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, []);
        const { url, data } = selfReviewFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        const { container } = RTKRender(<SelfReviewForm />);
        await screen.findByText('Add Self Review');
        const htmlTag = container.querySelector('[data-placeholder="Self Response"]')?.getElementsByTagName('p');

        expect(htmlTag).not.toBeUndefined();
        if (htmlTag !== undefined) {
            fireEvent.change(htmlTag[0], { target: { innerHTML: 'This is test response' } });
        }
        await screen.findByText('Please write more than 50 characters.');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });

        expect(screen.getByTestId('submitBtn')).toBeDisabled();
    });
});

describe('SelfReviewForm component as Edit self Review', () => {
    beforeEach(() => {
        mock.reset();
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...selfReviewFormMockData.editMockState, action: 'Edit' }
        });
    });

    it('should render properly', async () => {
        const { url: selfReviewUrl, data: reviewData } = selfReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, reviewData);
        const { url, data } = selfReviewFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<SelfReviewForm />);
        await screen.findByText('Edit Self Review');
        expect(screen.getByText('Communicate when tasks are taking longer than usual')).toBeInTheDocument();
        expect(screen.getByTestId('submitBtn')).toBeEnabled();
    });

    it('should show error when Api fails', async () => {
        const { url: selfReviewUrl, postUrl, data: selfReviewData } = selfReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        mock.onPut(postUrl).replyOnce(400, {});
        RTKRender(<SelfReviewForm />);
        await screen.findByText('Edit Self Review');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });
        const draftBtn = screen.getByTestId('draftBtn');
        await waitFor(() => expect(draftBtn).toBeEnabled());
        fireEvent.click(draftBtn);
        await screen.findByText('Something went wrong.');
    });

    it('popup should work properly', async () => {
        const { url: selfReviewUrl, data: selfReviewData } = selfReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        RTKRender(<SelfReviewForm />);
        await screen.findByText('Edit Self Review');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '4 - Exceeds Expectations' } });
        const submitBtn = screen.getByTestId('submitBtn');
        await waitFor(() => expect(submitBtn).toBeEnabled());
        fireEvent.click(submitBtn);
        await screen.findByText('Are you sure you wish to submit? Once submitted, the review can not be edited.');
        fireEvent.click(screen.getByTestId('modal-no'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        fireEvent.click(screen.getByText("View Team's Feedback"));
        await screen.findByText('Any unsaved changes will be lost.');
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await screen.findByText('Are you sure you wish to cancel?');
        fireEvent.click(screen.getByTestId('modal-yes'));
        expect(mockNavigate).toBeCalledWith(-1);
    });

    it('should Add feedback when proper data is entered', async () => {
        const { url: selfReviewUrl, postUrl, data: selfReviewData } = selfReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        mock.onPut(postUrl).replyOnce(201, {});
        RTKRender(<SelfReviewForm />);
        await screen.findByText('Edit Self Review');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });
        const submitBtn = screen.getByTestId('submitBtn');
        await waitFor(() => expect(submitBtn).toBeEnabled());
        fireEvent.click(submitBtn);
        await screen.findByText('Are you sure you wish to submit? Once submitted, the review can not be edited.');
        fireEvent.click(screen.getByTestId('modal-no'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        fireEvent.click(submitBtn);
        await screen.findByText('Are you sure you wish to submit? Once submitted, the review can not be edited.');
        fireEvent.click(screen.getByTestId('modal-yes'));
        await screen.findByText('Self review submitted successfully!');
    });

    it('should redirect to home when not autherized', async () => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...selfReviewFormMockData.editMockState, action: '' }
        });
        RTKRender(<SelfReviewForm />);
        await screen.findByText('Navigate component');
    });
});
