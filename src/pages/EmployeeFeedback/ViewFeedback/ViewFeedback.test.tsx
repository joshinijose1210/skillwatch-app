import { RTKRender, cleanup, screen } from '@utils/test-utils';
import ViewFeedback from './ViewFeedback';
import * as reactRouterDom from 'react-router-dom';

import { apiInstance } from '@utils';
import MockAdapter from 'axios-mock-adapter';
import { ViewFeedbackDataMockData } from '@mocks/viewFeedback';
const mock = new MockAdapter(apiInstance);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigation: mockNavigate
}));

const useLocationMock = jest.spyOn(reactRouterDom, 'useLocation');

afterEach(() => {
    cleanup();
    mock.reset();
});

describe('ViewFeedback component when external feedback is receieved', () => {
    useLocationMock.mockReturnValue({ ...ViewFeedbackDataMockData, state: { ...ViewFeedbackDataMockData.state[0] } });

    it('should render properly', () => {
        const { container } = RTKRender(<ViewFeedback />);
        expect(container).toMatchSnapshot();
    });

    it('show external email', () => {
        RTKRender(<ViewFeedback />);
        expect(screen.getByText('external@gmail.com')).toBeInTheDocument();
    });
});

describe('ViewFeedback component when internal feedback is receieved', () => {
    it("should show from employee's name and id", () => {
        useLocationMock.mockReturnValue({ ...ViewFeedbackDataMockData, state: { ...ViewFeedbackDataMockData.state[1] } });
        RTKRender(<ViewFeedback />);
        expect(screen.getByText('FromName (EmployeeId)')).toBeInTheDocument();
    });
});
