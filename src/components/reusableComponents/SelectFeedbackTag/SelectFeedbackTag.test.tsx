import { RTKRender } from '@utils/test-utils';
import { SelectFeedbackTag } from './SelectFeedbackTag';

describe('SelectFeedbackTag component', () => {
    it('should take snapshot', () => {
        const { container } = RTKRender(<SelectFeedbackTag feedbackTagValue={''} setFeedbackTagValue={jest.fn()} />);
        expect(container).toMatchSnapshot();
    });
});
