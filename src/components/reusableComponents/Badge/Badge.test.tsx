import { RTKRender } from '@utils/test-utils';
import { Badge } from './Badge';

describe('Badge', () => {
    it('should render properly', () => {
        const { container } = RTKRender(<Badge />);
        expect(container).toMatchSnapshot();
    });
});
