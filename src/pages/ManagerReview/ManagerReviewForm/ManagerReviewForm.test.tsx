import { RTKRender, fireEvent, screen, waitFor, wrapper } from '@utils/test-utils';
import { ManagerReviewForm } from './ManagerReviewForm';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { ManagerReviewMockData } from '@mocks/managerReview';
import * as reactRouterDom from 'react-router-dom';
import { managerReviewFormMockData } from '@mocks/managerReviewForm';
import { routeConstants } from '@constants';
import { renderHook, act } from '@testing-library/react-hooks';
import { useManagerReviewForm } from './useManagerReviewForm';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

beforeAll(() => {
    const { url, data } = managerReviewFormMockData.kpi;
    mock.onGet(url).replyOnce(200, data);
    const { url: kpiUrl, data: kpiData } = managerReviewFormMockData.fetctKPI;
    mock.onGet(kpiUrl).replyOnce(200, kpiData);
    const { url: settingsUrl, data: settingsData } = managerReviewFormMockData.settings;
    mock.onGet(settingsUrl).replyOnce(200, settingsData);
});

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

describe('ManagerReviewForm component as Add Review for Team Member', () => {
    beforeAll(() => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...managerReviewFormMockData.mockState, action: 'Add' },
            pathname: routeConstants.managerReview
        });
    });

    it('should take snapshot', () => {
        const { url: selfReviewUrl, data: selfReviewData } = managerReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        const { container } = RTKRender(<ManagerReviewForm />);
        expect(container).toMatchSnapshot();
    });

    it('should render properly', async () => {
        const { url, data } = managerReviewFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        const { url: selfReviewUrl, data: reviewData } = managerReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, reviewData);
        RTKRender(<ManagerReviewForm />);
        await screen.findByText('Add Review for Team Member');
        expect(screen.getByText('Communicate when tasks are taking longer than usual')).toBeInTheDocument();
        expect(screen.getByTestId('submitBtn')).toBeEnabled();
    });

    it("should properly navigate to View Team's Feedback", async () => {
        const { url, data } = managerReviewFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        const { url: selfReviewUrl } = managerReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, []);
        RTKRender(<ManagerReviewForm />);
        await screen.findByText('Add Review for Team Member');
        fireEvent.click(screen.getByText("View Team's Feedback"));
        expect(mockNavigate).toBeCalledTimes(1);
    });

    it('should not add manager review if improper data is provided', async () => {
        const { url: selfReviewUrl } = managerReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, []);
        const { url, data } = managerReviewFormMockData.fetctKPI;
        mock.onGet(url).replyOnce(200, data);
        const { container } = RTKRender(<ManagerReviewForm />);
        await screen.findByText('Add Review for Team Member');
        const editor = screen.getByTestId('textquill');
        const htmlTag = container.querySelector('.ql-editor')?.getElementsByTagName('p');
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        if (htmlTag !== undefined) {
            fireEvent.click(htmlTag[0]);
            fireEvent.change(htmlTag[0], { target: { innerHTML: 'Test response' } });
        }
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        await screen.findByText('Please write more than 50 characters.');
        expect(screen.getByTestId('submitBtn')).toBeDisabled();
    });

    it('should add Manager review if proper data is provided', async () => {
        const { result } = renderHook(() => useManagerReviewForm(), { wrapper });
        const { url: selfReviewUrl } = managerReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, []);
        const { url, data } = managerReviewFormMockData.fetctKPI;
        mock.onGet(url).replyOnce(200, data);
        const { container } = RTKRender(<ManagerReviewForm />);
        await screen.findByText('Add Review for Team Member');
        const editor = screen.getByTestId('textquill');
        const htmlTag = container.querySelector('.ql-editor')?.getElementsByTagName('p');
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        if (htmlTag !== undefined) {
            fireEvent.change(htmlTag[0], { target: { innerHTML: 'Test response to add for testing purpose' } });
            await act(async () => {
                result.current.handleInputChange({ id: 1, name: 'response', value: '' });
            });
        }
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        await screen.findByText('Please write more than 50 characters.');
        expect(screen.getByTestId('submitBtn')).toBeDisabled();
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });
        expect(screen.getByTestId('submitBtn')).toBeEnabled();
    });
});

describe('ManagerReviewForm component as Edit Review for Team Member', () => {
    beforeAll(() => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...managerReviewFormMockData.mockState, action: 'Edit' },
            pathname: routeConstants.managerReview
        });
    });

    it('should render properly when no review and rating', async () => {
        const { url: selfReviewUrl, data: reviewData } = managerReviewFormMockData.selfReview;
        const updatedData = [...reviewData];
        updatedData[0]['reviewData'][0]['review'] = '';
        updatedData[0]['reviewData'][0]['rating'] = 0;
        mock.onGet(selfReviewUrl).replyOnce(200, updatedData);
        const { url, data } = managerReviewFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<ManagerReviewForm />);
        await screen.findByText('Edit Review for Team Member');
        expect(screen.getByText('Communicate when tasks are taking longer than usual')).toBeInTheDocument();
        expect(screen.getByTestId('submitBtn')).toBeDisabled();
    });

    it('should show error when Api fails', async () => {
        const { url: selfReviewUrl, postUrl, data: selfReviewData } = managerReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        mock.onPut(postUrl).replyOnce(400, {});
        RTKRender(<ManagerReviewForm />);
        await screen.findByText('Edit Review for Team Member');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });
        const draftBtn = screen.getByTestId('draftBtn');
        await waitFor(() => expect(draftBtn).toBeEnabled());
        fireEvent.click(draftBtn);
        await screen.findByText('Something went wrong.');
    });

    it('popup should work properly', async () => {
        const { url: selfReviewUrl, data: selfReviewData } = managerReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        RTKRender(<ManagerReviewForm />);
        await screen.findByText('Edit Review for Team Member');
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

    it('should Add manager review when proper data is entered', async () => {
        const { url: selfReviewUrl, postUrl, data: selfReviewData } = managerReviewFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        mock.onPut(postUrl).replyOnce(201, {});
        RTKRender(<ManagerReviewForm />);
        await screen.findByText('Edit Review for Team Member');
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
        expect(await screen.findByText('Manager review submitted successfully!')).toBeInTheDocument();
    });

    it('should redirect to home when not autherized', async () => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { action: '' }
        });
        RTKRender(<ManagerReviewForm />);
        expect(await screen.findByText('Navigate component')).toBeInTheDocument();
    });
});
