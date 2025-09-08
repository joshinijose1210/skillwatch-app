import { CheckInWithManagerForm } from './CheckInWithManagerForm';
import { RTKRender, cleanup, fireEvent, screen, waitFor } from '@utils/test-utils';
import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '@utils';
import { ManagerReviewMockData } from '@mocks/managerReview';
import * as reactRouterDom from 'react-router-dom';
import { checkInWithManagerFormMockData } from '@mocks/checkInWithManagerFormMockData';
import { routeConstants } from '@constants';
import { format } from 'date-fns';

const mock = new MockAdapter(apiInstance, { onNoMatch: 'throwException' });

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    useLocation: jest.fn(),
    Navigate: jest.fn(() => <div data-testid="mock-navigate">Navigate component</div>)
}));

beforeAll(() => {
    const { url, data } = checkInWithManagerFormMockData.kpi;
    mock.onGet(url).replyOnce(200, data);
});

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');
const CURRENT_DAY = new Date().setHours(0, 0, 0);
const ONE_DAY = 86400000;
const ReviewDate = `${format(new Date(CURRENT_DAY - ONE_DAY), 'do MMM yyyy')} - ${format(
    new Date(CURRENT_DAY + ONE_DAY * 30),
    'do MMM yyyy'
)}`;

afterEach(() => {
    mock.reset();
    cleanup();
    useLocationMock.mockReset();
});

jest.useFakeTimers();

describe('CheckInWithManagerForm component as Add self Review', () => {
    beforeEach(() => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...checkInWithManagerFormMockData.newReviewState, ...checkInWithManagerFormMockData.editMockState, action: 'Add' }
        });
    });

    it('should take snapshot', () => {
        const { url: selfReviewUrl, data: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        const { container } = RTKRender(<CheckInWithManagerForm />);
        expect(container).toMatchSnapshot();
    });

    it('should render properly', async () => {
        const { url, data } = checkInWithManagerFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        const { url: selfReviewUrl, data: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        RTKRender(<CheckInWithManagerForm />);
        await screen.findByText('Add Check-in with Manager');
        expect(screen.getByTestId('submitBtn')).toBeEnabled();
    });

    it('should show Warning Message', async () => {
        const { url, data } = checkInWithManagerFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        const { url: selfReviewUrl } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, []);
        RTKRender(<CheckInWithManagerForm />);
        await screen.findByText('Add Check-in with Manager');
        expect(screen.getByText('Self or First Manager review has not been submitted yet.')).toBeInTheDocument();
    });

    it("should properly navigate to View Team's Feedback", async () => {
        const { url, data } = checkInWithManagerFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        const { url: selfReviewUrl } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, []);
        RTKRender(<CheckInWithManagerForm />);
        await screen.findByText('Add Check-in with Manager');
        fireEvent.click(screen.getByText("View Team's Feedback"));
        expect(mockNavigate).toBeCalledTimes(1);
    });

    it('should manager check-in work properly', () => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            pathname: `${routeConstants.myCheckInWithManager}`,
            state: { ...checkInWithManagerFormMockData.newReviewState, ...checkInWithManagerFormMockData.editMockState2, action: 'Add' }
        });
        const { url: selfReviewUrl, data: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        const { container } = RTKRender(<CheckInWithManagerForm />);
        expect(container).toMatchSnapshot();
    });

    it('should work if check-in data not present', async () => {
        const { url: selfReviewUrl, someData2: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        const { url, data } = checkInWithManagerFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<CheckInWithManagerForm />);
        expect(await screen.findByText('Add Check-in with Manager')).toBeInTheDocument();
    });

    it('should not add Check in data if improper data is provided', async () => {
        const { url: selfReviewUrl, data: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        const { url, data } = checkInWithManagerFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<CheckInWithManagerForm />);
        await screen.findByText('Add Check-in with Manager');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });
        const sbtButton = screen.getByTestId('submitBtn');
        expect(sbtButton).toBeEnabled();
        fireEvent.click(sbtButton);
        await screen.findByText('Something went wrong.');
    });
});

describe('CheckInWithManagerForm component as Edit self Review', () => {
    beforeEach(() => {
        mock.reset();
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...checkInWithManagerFormMockData.newReviewState, ...checkInWithManagerFormMockData.editMockState, action: 'Edit' },
            pathname: routeConstants.checkInWithTeamMember
        });
    });

    it('should render properly', async () => {
        const { url: selfReviewUrl, someData: reviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, reviewData);
        const { url, data } = checkInWithManagerFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<CheckInWithManagerForm />);
        expect(await screen.findByText('Edit Check-in with Team Member')).toBeInTheDocument();
        expect(await screen.findByText(/Self or First Manager review has not been submitted yet/i)).toBeInTheDocument();
    });

    it('should show error when Api fails', async () => {
        const { url: selfReviewUrl, postUrl, data: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        mock.onPut(postUrl).replyOnce(400, {});
        RTKRender(<CheckInWithManagerForm />);
        await screen.findByText('Edit Check-in with Team Member');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });
        const draftBtn = screen.getByTestId('draftBtn');
        await waitFor(() => expect(draftBtn).toBeDisabled());
        fireEvent.click(draftBtn);
        await screen.findByText('Something went wrong.');
    });

    it('popup should work properly', async () => {
        const { url: selfReviewUrl, data: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        RTKRender(<CheckInWithManagerForm />);
        await screen.findByText('Edit Check-in with Team Member');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '4 - Exceeds Expectations' } });
        fireEvent.click(screen.getByText("View Team's Feedback"));
        await screen.findByText('Any unsaved changes will be lost.');
        fireEvent.click(screen.getByTitle('medly-modal-close-icon'));
        await waitFor(() => expect(document.body).toHaveStyle({ overflow: 'unset' }));
        fireEvent.click(screen.getByTestId('cancelBtn'));
        await screen.findByText('Are you sure you wish to cancel?');
        fireEvent.click(screen.getByTestId('modal-yes'));
        expect(mockNavigate).toBeCalledWith(-1);
        fireEvent.click(screen.getByText("View Team's Feedback"));
        await screen.findByText('Any unsaved changes will be lost.');
        fireEvent.click(screen.getByTestId('modal-no'));
        expect(mockNavigate).toBeCalledWith(-1);
    });

    it('should Add feedback as teammate when proper data is entered', async () => {
        const { url: selfReviewUrl, postUrl, data: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        mock.onPut(postUrl).replyOnce(201, {});
        const { container } = RTKRender(<CheckInWithManagerForm />);
        await screen.findByText('Edit Check-in with Team Member');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });
        const editor = screen.getAllByTestId('textquill')[0];
        const text = container.querySelectorAll('.ql-editor')[0]?.getElementsByTagName('p');
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        if (text !== undefined) {
            fireEvent.click(text[0]);
            fireEvent.change(text[0], { target: { textContent: 'Test review added to check dummy response if working or not' } });
        }
        await waitFor(() => expect(text && text[0]).toContainHTML('Test review added to check dummy response if working or not'));
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        const submitBtn = screen.getByTestId('submitBtn');
        await waitFor(() => expect(submitBtn).toBeEnabled());
        fireEvent.click(submitBtn);
        await waitFor(() =>
            expect(mockNavigate).toBeCalledWith(`/performance-review/team's-check-in/${ReviewDate}/add-goals`, {
                state: {
                    reviewTypeId: 3,
                    reviewCycleId: 1,
                    reviewToId: 72,
                    reviewToEmployeeId: undefined,
                    reviewFromId: 72,
                    firstManagerId: 5,
                    secondManagerId: 75,
                    draft: true,
                    organisationId: 1,
                    published: false,
                    reviewData: [
                        { id: 1, review: '<p>Test review added to check dummy response if working or not</p>', rating: 2 },
                        { id: 2, review: '', rating: 3 }
                    ],
                    reviewDetailsId: 353,
                    actionItem: []
                }
            })
        );
    });

    it('should Add feedback work properly with performance review route', async () => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...checkInWithManagerFormMockData.newReviewState, ...checkInWithManagerFormMockData.editMockState, action: 'Edit' },
            pathname: routeConstants.performanceReview
        });
        const { url: selfReviewUrl, postUrl, data: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        mock.onPut(postUrl).replyOnce(201, {});
        const { container } = RTKRender(<CheckInWithManagerForm />);
        await screen.findByText('Edit Check-in with Manager');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });
        const editor = screen.getAllByTestId('textquill')[0];
        const text = container.querySelectorAll('.ql-editor')[0]?.getElementsByTagName('p');
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        if (text !== undefined) {
            fireEvent.click(text[0]);
            fireEvent.change(text[0], { target: { textContent: 'Test review added to check dummy response if working or not' } });
        }
        await waitFor(() => expect(text && text[0]).toContainHTML('Test review added to check dummy response if working or not'));
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        const submitBtn = screen.getByTestId('submitBtn');
        await waitFor(() => expect(submitBtn).toBeEnabled());
        fireEvent.click(submitBtn);
        await waitFor(() =>
            expect(mockNavigate).toBeCalledWith(`/reports/performance-review/${ReviewDate}/add-goals`, {
                state: {
                    reviewTypeId: 3,
                    reviewCycleId: 1,
                    reviewToId: 72,
                    reviewToEmployeeId: undefined,
                    reviewFromId: 72,
                    firstManagerId: 5,
                    secondManagerId: 75,
                    draft: true,
                    organisationId: 1,
                    published: false,
                    reviewData: [
                        { id: 1, review: '<p>Test review added to check dummy response if working or not</p>', rating: 2 },
                        { id: 2, review: '', rating: 3 }
                    ],
                    reviewDetailsId: 353,
                    actionItem: []
                }
            })
        );
    });

    it('should save as draft work properly', async () => {
        const { url: selfReviewUrl, postUrl, data: selfReviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, selfReviewData);
        mock.onPut(postUrl).replyOnce(200, {});
        const { container } = RTKRender(<CheckInWithManagerForm />);
        await screen.findByText('Edit Check-in with Team Member');
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '3 - Meets Expectations' } });
        const editor = screen.getAllByTestId('textquill')[0];
        const text = container.querySelectorAll('.ql-editor')[0]?.getElementsByTagName('p');
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        if (text !== undefined) {
            fireEvent.click(text[0]);
            fireEvent.change(text[0], { target: { innerHTML: 'Test data' } });
        }
        await waitFor(() => expect(text && text[0]).toContainHTML('Test data'));
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        expect(screen.getByText('Please write more than 50 characters.')).toBeInTheDocument();
        if (text !== undefined) {
            fireEvent.click(text[0]);
            fireEvent.change(text[0], { target: { innerHTML: 'Test review added to check dummy response if working or not' } });
        }
        await waitFor(() => expect(text && text[0]).toContainHTML('Test review added to check dummy response if working or not'));
        fireEvent.focus(editor);
        fireEvent.blur(editor);
        fireEvent.change(screen.getByTestId('kpi-2'), { target: { value: '4 - Exceeds Expectations' } });
        await waitFor(() => expect(screen.getByTestId('draftBtn')).toBeEnabled());
        fireEvent.click(screen.getByTestId('draftBtn'));
        await screen.findByText('Check-in with manager saved successfully!');
    });

    it('should redirect to home when not autherized', async () => {
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...checkInWithManagerFormMockData.editMockState, action: '' }
        });
        RTKRender(<CheckInWithManagerForm />);
        expect(await screen.findByText('Navigate component')).toBeInTheDocument();
    });
});

describe('CheckInWithManagerForm component as View self Review', () => {
    beforeEach(() => {
        mock.reset();
        useLocationMock.mockReturnValue({
            ...ManagerReviewMockData.LocationMockData,
            state: { ...checkInWithManagerFormMockData.newReviewState, ...checkInWithManagerFormMockData.viewMockState, action: 'View' }
        });
    });

    it('should render properly', async () => {
        const { url: selfReviewUrl, data: reviewData } = checkInWithManagerFormMockData.selfReview;
        mock.onGet(selfReviewUrl).replyOnce(200, reviewData);
        const { url, data } = checkInWithManagerFormMockData.kpi;
        mock.onGet(url).replyOnce(200, data);
        RTKRender(<CheckInWithManagerForm />);
        expect(await screen.findByText('View Check-in with Manager')).toBeInTheDocument();
        expect(screen.getByText('Communicate when tasks are taking longer than usual')).toBeInTheDocument();
    });
});
