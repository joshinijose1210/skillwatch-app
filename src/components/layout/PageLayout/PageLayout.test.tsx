import { RTKRender } from '@utils/test-utils';
import PageLayout from './PageLayout';

describe('PageLayout component', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<PageLayout />);
        expect(container).toMatchSnapshot();
    });
});
